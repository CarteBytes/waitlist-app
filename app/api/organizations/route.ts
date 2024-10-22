import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { ZodError } from "zod";

// Define the table
const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Define the types and schemas
type TOrganization = typeof organizations.$inferInsert;
const insertOrganizationSchema = createInsertSchema(organizations);

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    // Validate the request body using the schema
    const parsedData = insertOrganizationSchema.parse(body); // Will throw if validation fails

    const { name } = parsedData;

    // Validate the request
    if (!name) {
      return NextResponse.json(
        { error: "Organization name is required" },
        { status: 400 },
      );
    }

    // Insert organization into the database
    const [newOrganization] = await db
      .insert(organizations)
      .values(parsedData) // Insert the name into the table
      .returning(); // Get the inserted organization back

    // Return the newly created organization
    return NextResponse.json(newOrganization, { status: 201 });
  } catch (error) {
    console.error("Error creating organization:", error);
    if (error instanceof ZodError) {
      // Handle validation errors
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
