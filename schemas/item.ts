import { items } from "@/models/item";
import { createInsertSchema } from "drizzle-zod";

export const insertItemSchema = createInsertSchema(items);
