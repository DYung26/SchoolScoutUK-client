import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const schools = pgTable("schools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postcode: text("postcode").notNull(),
  type: text("type").notNull(), // 'public' | 'private' | 'grammar'
  admissionAge: jsonb("admission_age").$type<{min: number, max: number}>().notNull(),
  rating: integer("rating"), // 1-5 rating
  fees: jsonb("fees").$type<{annual: number, registration?: number}>(),
  facilities: text("facilities").array(),
  specialties: text("specialties").array(),
  examResults: jsonb("exam_results").$type<{
    gcse: {year: number, passRate: number},
    aLevel: {year: number, passRate: number},
  }>(),
  website: text("website"),
  phone: text("phone"),
  email: text("email"),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").references(() => schools.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSchoolSchema = createInsertSchema(schools);
export const selectSchoolSchema = createSelectSchema(schools);
export type School = typeof schools.$inferSelect;
export type NewSchool = typeof schools.$inferInsert;

export const insertReviewSchema = createInsertSchema(reviews);
export const selectReviewSchema = createSelectSchema(reviews);
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
