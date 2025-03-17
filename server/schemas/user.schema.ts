import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
