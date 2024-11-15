import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";

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
