import { pgTable, text, timestamp, serial, uuid } from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

type TOrganization = typeof organizations.$inferInsert;
