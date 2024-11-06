import { menu_sections, menus } from "@/models/menu";
import { createInsertSchema } from "drizzle-zod";

export const insertMenuSchema = createInsertSchema(menus);
export const insertMenuContentSchema = createInsertSchema(menu_sections);
