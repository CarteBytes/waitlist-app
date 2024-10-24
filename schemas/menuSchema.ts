import { menus } from "@/models/menu";
import { createInsertSchema } from "drizzle-zod";

export const insertMenuSchema = createInsertSchema(menus);
