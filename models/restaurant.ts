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
  address2: text("address").notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  zipCode: varchar("zipCode", { length: 15 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),
  currencyPrefix: varchar("currencyPrefix", { length: 10 }).default("$"),
  logo: text("logo"),
  colors: json("colors").notNull(), // Storing colors as JSON
  socials: json("socials").notNull(), // Storing socials as JSON
});
