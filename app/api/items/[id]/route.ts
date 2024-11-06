import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db"; // Make sure to import your Supabase client
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import { checkOrgExists } from "@/lib/helpers";

// TODO: change to items!

// Get a restaurant by slug
export async function GET(
  req: NextRequest,
  { params }: { params: { slug?: string } },
) {
  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", params.slug!)
    .single(); // Fetch a single restaurant by slug

  if (error || !restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(restaurant);
}

// Update a restaurant
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    checkOrgExists(body.org_id); // Ensure organization exists

    const updatedRestaurant = insertRestaurantSchema.parse(body);

    const { data, error } = await supabase
      .from("restaurants")
      .update(updatedRestaurant)
      .eq("org_id", body.org_id)
      .eq("id", params.id); // Update the restaurant with the given id

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

// Delete a restaurant
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { error } = await supabase
      .from("restaurants")
      .delete()
      .eq("id", params.id); // Delete the restaurant with the given id

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Restaurant deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
