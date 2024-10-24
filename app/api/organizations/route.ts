import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ZodError } from "zod";
import { organizations } from "@/models/organization";
import { insertOrganizationSchema } from "@/schemas/organizationSchema";

// GET ALL ORGS
export async function GET() {
  const all = await db.select().from(organizations);
  return NextResponse.json(all);
}

// CREATE ORG
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    // Validate the request body using the schema
    const parsedData = insertOrganizationSchema.parse(body); // Will throw if validation fails
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
