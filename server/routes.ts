import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { schools, reviews } from "@db/schema";
import { eq, like, and, or, desc, sql, inArray } from "drizzle-orm";
import path from "path";
import express from 'express';
import type { RequestHandler } from 'express';

export function registerRoutes(app: Express): Server {
  // Serve static files from the public directory
  app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));

  // Get schools for comparison
  const getCompareSchools: RequestHandler = async (req, res) => {
    try {
      const schoolIds = req.query.ids?.toString().split(',').map(Number);

      if (!schoolIds?.length) {
        return res.status(400).json({ error: "No school IDs provided" });
      }

      const results = await db
        .select()
        .from(schools)
        .where(inArray(schools.id, schoolIds));

      const transformedResults = results.map(school => ({
        ...school,
        imageUrl: school.imageUrl ? `/assets/schools/${school.imageUrl}` : null
      }));

      res.json(transformedResults);
    } catch (error) {
      console.error('Compare schools error:', error);
      res.status(500).json({ error: "Failed to fetch schools for comparison" });
    }
  };

  // Get all schools with optional filters
  const getAllSchools: RequestHandler = async (req, res) => {
    try {
      const { search, type, city, minRating } = req.query;
      const conditions = [];

      if (search) {
        conditions.push(
          or(
            like(schools.name, `%${search}%`),
            like(schools.city, `%${search}%`)
          )
        );
      }

      if (type) {
        conditions.push(eq(schools.type, type as string));
      }

      if (city) {
        conditions.push(eq(schools.city, city as string));
      }

      if (minRating) {
        conditions.push(sql`${schools.rating} >= ${minRating}`);
      }

      const query = db.select().from(schools);
      if (conditions.length > 0) {
        query.where(and(...conditions));
      }

      const results = await query;
      const transformedResults = results.map(school => ({
        ...school,
        imageUrl: school.imageUrl ? `/assets/schools/${school.imageUrl}` : null
      }));

      res.json(transformedResults);
    } catch (error) {
      console.error('Get all schools error:', error);
      res.status(500).json({ error: "Failed to fetch schools" });
    }
  };

  // Register routes
  app.get("/api/schools/compare", getCompareSchools);
  app.get("/api/schools", getAllSchools);
  app.get("/api/schools/:id", async (req, res) => {
    try {
      const [school] = await db
        .select()
        .from(schools)
        .where(eq(schools.id, parseInt(req.params.id)))
        .limit(1);

      if (!school) {
        return res.status(404).json({ error: "School not found" });
      }

      const schoolReviews = await db
        .select()
        .from(reviews)
        .where(eq(reviews.schoolId, school.id))
        .orderBy(desc(reviews.createdAt));

      const transformedSchool = {
        ...school,
        imageUrl: school.imageUrl ? `/assets/schools/${school.imageUrl}` : null,
        reviews: schoolReviews
      };

      res.json(transformedSchool);
    } catch (error) {
      console.error('Get school error:', error);
      res.status(500).json({ error: "Failed to fetch school" });
    }
  });

  // Match schools based on preferences
  app.get("/api/schools/match", async (req, res) => {
    try {
      const {
        studentAge,
        preferredType,
        maxDistance,
        focusAreas,
        academicPriority,
        facilitiesPriority,
        maxAnnualFee,
      } = req.query;

      let query = db.select().from(schools);

      // Filter by age range
      query = query.where(
        and(
          sql`${schools.admissionAge}->>'min' <= ${studentAge}`,
          sql`${schools.admissionAge}->>'max' >= ${studentAge}`
        )
      );

      // Filter by school type if specified
      if (preferredType && preferredType !== 'any') {
        query = query.where(eq(schools.type, preferredType as string));
      }

      // Filter by maximum annual fee if specified
      if (maxAnnualFee) {
        query = query.where(
          sql`${schools.fees}->>'annual' <= ${maxAnnualFee}`
        );
      }

      // Calculate relevance score based on priorities
      const results = await query;

      const scoredResults = results.map(school => {
        let score = 0;

        // Academic score (based on exam results)
        if (school.examResults) {
          const academicScore = (
            school.examResults.gcse.passRate +
            school.examResults.aLevel.passRate
          ) / 2;
          score += (academicScore / 100) * Number(academicPriority);
        }

        // Facilities score
        const facilitiesScore = (school.facilities?.length || 0) / 10; // Normalize to 0-1
        score += facilitiesScore * Number(facilitiesPriority);

        // Focus areas match
        if (focusAreas && Array.isArray(focusAreas)) {
          const matchingSpecialties = school.specialties.filter(s =>
            focusAreas.includes(s)
          ).length;
          score += matchingSpecialties / focusAreas.length;
        }

        return {
          ...school,
          matchScore: score,
        };
      });

      // Sort by match score and return top matches
      const matches = scoredResults
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 10);

      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: "Failed to match schools" });
    }
  });

  // Add a review
  app.post("/api/schools/:id/reviews", async (req, res) => {
    try {
      const { rating, comment, author } = req.body;
      const schoolId = parseInt(req.params.id);

      const [newReview] = await db
        .insert(reviews)
        .values({
          schoolId,
          rating,
          comment,
          author,
        })
        .returning();

      res.json(newReview);
    } catch (error) {
      res.status(500).json({ error: "Failed to add review" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}