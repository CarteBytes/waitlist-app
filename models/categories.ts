import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  numeric,
} from "drizzle-orm/pg-core";
import { organizations } from "./organization";

export const categories = pgTable("item_categories", {
  id: uuid("id").primaryKey().default("gen_random_uuid()"),
  org_id: uuid("org_id").references(() => organizations.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }).default(""),
  price: numeric({ precision: 10, scale: 2 }).default(""),
  image_url: varchar("image_url", { length: 500 }).default(""),
  // status: varchar("status", { length: 50 }).default("unpublished"), // Status of the food item
  created_at: timestamp("created_at").defaultNow(),
  last_updated: timestamp("last_updated").defaultNow(),
});
