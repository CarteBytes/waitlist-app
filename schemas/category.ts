import { categories } from "@/models/categories";
import { createInsertSchema } from "drizzle-zod";

export const insertCategorySchema = createInsertSchema(categories);
