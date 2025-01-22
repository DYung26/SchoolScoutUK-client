import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { schools, reviews } from "@db/schema";
import { eq, like, and, or } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
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
          and(
            eq(schools.rating, Number(minRating))
          )
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
