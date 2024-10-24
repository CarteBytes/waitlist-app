import {
  pgTable,
  text,
  timestamp,
  jsonb,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { organizations } from "./organization";

export const menus = pgTable("menus", {
  id: uuid("id").defaultRandom().primaryKey(),
  org_id: varchar("org_id")
    .references(() => organizations.id)
    .notNull(), // Foreign key
  name: text("name").notNull(),
  description: text("description").default(""), // Optional description
  pages: jsonb("pages").notNull(), // Storing the pages structure as JSONB
  created_at: timestamp("created_at").defaultNow().notNull(),
});

type TMenu = typeof menus.$inferInsert;
