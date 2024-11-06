import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { ZodError } from "zod";
import { insertOrganizationSchema } from "@/schemas/organizationSchema";

// GET ALL ORGS
export async function GET() {
  const { data: all, error } = await supabase.from("organizations").select("*");

  if (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json(
      { error: "Error fetching organizations" },
      { status: 500 },
    );
  }

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
    const { data: newOrganization, error } = await supabase
      .from("organizations")
      .insert(parsedData)
      .select()
      .single();

    if (error) {
      console.error("Error creating organization:", error);
      return NextResponse.json(
        { error: "Error creating organization" },
        { status: 500 },
      );
    }

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
