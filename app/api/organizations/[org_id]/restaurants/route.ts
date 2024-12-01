import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { checkOrgExists } from "@/lib/helpers";

// This route gets all the org's restaurants
export async function GET(
  req: NextRequest,
  { params }: { params: { org_id?: string } },
) {
  const orgId = params.org_id;

  checkOrgExists(orgId!);

  const { data: restaurantsArr, error: restaurantsError } = await supabase
    .from("restaurants")
    .select("*")
    .eq("org_id", orgId!);

  if (restaurantsError) {
    console.error("Error fetching restaurants:", restaurantsError);
    return NextResponse.json(
      { error: "Error fetching restaurants" },
      { status: 500 },
    );
  }

  if (!restaurantsArr) {
    return NextResponse.json(
      { error: "Restaurants not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(restaurantsArr);
}
