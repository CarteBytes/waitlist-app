import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db"; // Ensure this is set up
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import { checkOrgExists } from "@/lib/helpers";

// GET a restaurant by slug
export async function GET(
  req: NextRequest,
  { params }: { params: { slug?: string } },
) {
  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", params.slug)
    .single(); // Fetch a single restaurant

  if (error || !restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(restaurant);
}

// Update a restaurant by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    checkOrgExists(body.org_id);

    const updatedRestaurant = insertRestaurantSchema.parse(body);

    const { data, error } = await supabase
      .from("restaurants")
      .update(updatedRestaurant)
      .eq("org_id", body.org_id)
      .eq("id", params.id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

// Delete a restaurant by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { error } = await supabase
      .from("restaurants")
      .delete()
      .eq("id", params.id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: "Restaurant deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
