import * as z from "zod";
import { userPreferenceSchema } from "./schemas";

export type UserPreference = z.infer<typeof userPreferenceSchema>;
