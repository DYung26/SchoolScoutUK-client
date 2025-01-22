import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { schools, reviews } from "@db/schema";
import { eq, like, and, or, desc, sql } from "drizzle-orm";
import path from "path";
import express from 'express';

export function registerRoutes(app: Express): Server {
  // Serve static files from the public directory
  app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));

  // Get all schools with optional filters
  app.get("/api/schools", async (req, res) => {
    try {
      const { search, type, city, minRating } = req.query;
      let query = db.select().from(schools);

      if (search) {
        query = query.where(
          or(
            like(schools.name, `%${search}%`),
            like(schools.city, `%${search}%`)
          )
        );
      }

      if (type) {
        query = query.where(eq(schools.type, type as string));
      }

      if (city) {
        query = query.where(eq(schools.city, city as string));
      }

      if (minRating) {
        query = query.where(
          sql`${schools.rating} >= ${minRating}`
        );
      }

      const results = await query;
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch schools" });
    }
  });

  // Get single school by ID
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
        .where(eq(reviews.schoolId, school.id));

      res.json({ ...school, reviews: schoolReviews });
    } catch (error) {
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

      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ error: "Failed to add review" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}