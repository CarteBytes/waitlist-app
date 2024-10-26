import {
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { organizations } from "./organization";
import { restaurants } from "./restaurant";

export const foodItems = pgTable("food_items", {
  id: uuid("id").primaryKey().default("gen_random_uuid()"),
  org_id: uuid("org_id").references(() => organizations.id, {
    onDelete: "cascade",
  }),
  restaurant_id: uuid("restaurant_id").references(() => restaurants.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 255 }),
  description: varchar("description", { length: 1000 }),
  price: varchar("price", { length: 10 }),
  min_calories: varchar("calories", { length: 50 }),
  max_calories: varchar("calories", { length: 50 }),
  category: varchar("category", { length: 100 }),
  allergens: json("allergen"), // Array of allergens
  image_url: varchar("image_url", { length: 500 }),
  dietary_labels: json("dietary_label"), // Array of dietary labels
  availability: varchar("availability", { length: 100 }),
  status: varchar("status", { length: 50 }).default("active"), // Status of the food item
  created_at: timestamp("created_at").defaultNow(),
  last_updated: timestamp("last_updated").defaultNow(),
});
