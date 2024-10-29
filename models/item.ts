import {
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  numeric,
} from "drizzle-orm/pg-core";
import { organizations } from "./organization";

export const items = pgTable("items", {
  id: uuid("id").primaryKey().default("gen_random_uuid()"),
  org_id: uuid("org_id").references(() => organizations.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }).default(""),
  price: numeric({ precision: 10, scale: 2 }).default(""),
  calories: text("calories").default(""),
  allergens: json("allergens").default([]), // Array of allergens
  image_url: varchar("image_url", { length: 500 }).default(""),
  dietary_labels: json("dietary_labels").default([]), // Array of dietary labels
  availability: varchar("availability", { length: 100 }).default("AVAILABLE"),
  status: varchar("status", { length: 50 }).default("ACTIVE"), // Status of the food item
  created_at: timestamp("created_at").defaultNow(),
  last_updated: timestamp("last_updated").defaultNow(),
});
