import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { ZodError } from "zod";
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import { checkOrgExists } from "@/lib/helpers";

// GET ALL RESTAURANTS
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("org_id");

  checkOrgExists(orgId!);

  const { data: all, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("org_id", orgId!);

  if (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { error: "Error fetching restaurants" },
      { status: 500 },
    );
  }

  return NextResponse.json(all);
}

// CREATE RESTAURANT
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = insertRestaurantSchema.parse(body);

    checkOrgExists(parsedData.org_id);

    const { data: newRestaurant, error } = await supabase
      .from("restaurants")
      .insert(parsedData)
      .select()
      .single();

    if (error) {
      console.error("Error creating restaurant:", error);
      return NextResponse.json(
        { error: "Error creating restaurant" },
        { status: 500 },
      );
    }

    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating restaurant:", error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
