import { menu_contents, menus } from "@/models/menu";
import { createInsertSchema } from "drizzle-zod";

export const insertMenuSchema = createInsertSchema(menus);
export const insertMenuContentSchema = createInsertSchema(menu_contents);
