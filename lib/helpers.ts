import { NextResponse } from "next/server";
import { supabase } from "./db";

// Check if organization exists
export const checkOrgExists = async (orgId: string) => {
  const { data: organization, error } = await supabase
    .from("organizations")
    .select("id")
    .eq("id", orgId)
    .single(); // Fetch a single organization by id

  if (error || !organization) {
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 },
    );
  }
};

// Check if restaurant exists
export const checkRestaurantExists = async (restaurantId: string) => {
  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select("id")
    .eq("id", restaurantId)
    .single(); // Fetch a single restaurant by id

  if (error || !restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 },
    );
  }
};
