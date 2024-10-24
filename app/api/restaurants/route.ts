import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { restaurants } from "@/models/restaurant";
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import { ZodError } from "zod";
import { eq } from "drizzle-orm";
import { checkOrgExists } from "@/lib/helpers";

// GET ALL RESTAURANTS
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("org_id");

  checkOrgExists(orgId!);

  const all = await db
    .select()
    .from(restaurants)
    .where(eq(restaurants.org_id, orgId!));
  return NextResponse.json(all);
}

// CREATE RESTAURANT
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = insertRestaurantSchema.parse(body);

    checkOrgExists(parsedData.org_id);

    const [newRestaurant] = await db
      .insert(restaurants)
      .values(parsedData)
      .returning();

    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error: unknown) {
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
