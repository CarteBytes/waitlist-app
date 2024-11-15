import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { organizations } from "./organization";
import { restaurants } from "./restaurant";
import { categories } from "./categories";

export const menus = pgTable("menus", {
  id: uuid("id").defaultRandom().primaryKey(),
  org_id: varchar("org_id")
    .references(() => organizations.id)
    .notNull(), // Foreign key
  is_default: boolean("is_default").default(false),
  restaurant_id: varchar("restaurant_id")
    .references(() => restaurants.id)
    .notNull(), // Foreign key
  theme: text("theme").notNull(),
  name: text("name").notNull(),
  language: text("language").notNull().default("en"),
  description: text("description").default(""), // Optional description
  created_at: timestamp("created_at").defaultNow(),
  last_updated: timestamp("last_updated").defaultNow(),
});

export const menu_sections = pgTable("menu_sections", {
  id: uuid("id").primaryKey().defaultRandom(), // Automatically generates a UUID
  org_id: uuid("org_id")
    .notNull()
    .references(() => organizations.id),
  restaurant_id: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id),
  menu_id: uuid("menu_id")
    .notNull()
    .references(() => menus.id),
  page_index: integer("page_index").notNull().default(0),
  section_index: integer("section_index").notNull().default(0),
  hero_image: text("hero_image").default(""),
  category: uuid("category").references(() => categories.id),
  items: uuid("menu_items").array(), // Array of UUIDs for food items
});

type TMenu = typeof menus.$inferInsert;
