import { pgTable, uuid, varchar, text, json } from "drizzle-orm/pg-core";
import { organizations } from "./organization";

export const restaurants = pgTable("restaurants", {
  id: uuid("id").defaultRandom().primaryKey(),
  org_id: varchar("org_id")
    .references(() => organizations.id)
    .notNull(), // Foreign key
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  address: text("address").notNull(),
  address2: text("address2"),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  zip_code: varchar("zip_code", { length: 15 }).notNull(),
  country: varchar("country", { length: 255 }),
  currency_prefix: varchar("currency_prefix", { length: 10 }).default("$"),
  logo: text("logo"),
  // Colors breakdown into individual columns
  primary_color: varchar("primary_color", { length: 10 }).notNull(),
  secondary_color: varchar("secondary_color", { length: 10 }).notNull(),
  primary_text_color: varchar("primary_text_color", { length: 10 }).notNull(),
  secondary_text_color: varchar("secondary_text_color", {
    length: 10,
  }).notNull(),
  accent_color: varchar("accent_color", { length: 10 }).notNull(),

  // Social media links breakdown into individual columns
  facebook_url: text("facebook_url"),
  instagram_url: text("instagram_url"),
  tiktok_url: text("tiktok_url"),
  whatsapp_url: text("whatsapp_url"),
  twitter_url: text("twitter_url"),
  youtube_url: text("youtube_url"),
  // Added slug to restaurants table
  slug: varchar("slug", { length: 255 }).notNull().unique(), // New column for slug
});
