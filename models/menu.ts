import {
  pgTable,
  text,
  timestamp,
  jsonb,
  uuid,
  varchar,
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

type TMenu = typeof menus.$inferInsert;
