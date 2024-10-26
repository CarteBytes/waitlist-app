import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { organizations } from "./organization";
import { restaurants } from "./restaurant";

export const menus = pgTable("menus", {
  id: uuid("id").defaultRandom().primaryKey(),
  org_id: varchar("org_id")
    .references(() => organizations.id)
    .notNull(), // Foreign key
  restaurant_id: varchar("restaurant_id")
    .references(() => restaurants.id)
    .notNull(), // Foreign key
  theme: text("theme").notNull(),
  name: text("name").notNull(),
  description: text("description").default(""), // Optional description
  created_at: timestamp("created_at").defaultNow().notNull(),
  last_updated: timestamp("created_at").defaultNow().notNull(),
});

export const menu_contents = pgTable("menu_contents", {
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
  page_index: integer("page_index").notNull(),
  section_index: integer("page_index").notNull(),
  hero_image: text("hero_image"),
  sub_image: text("sub_image"),
  group_title: text("group_title"),
  group_price: text("group_price"),
  food_items: uuid("food_items").array(), // Array of UUIDs for food items
});

type TMenu = typeof menus.$inferInsert;
