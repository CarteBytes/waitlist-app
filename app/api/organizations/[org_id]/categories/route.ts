import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { checkOrgExists } from "@/lib/helpers";

// This route gets all the restaurant's menus
export async function GET(
  req: NextRequest,
  { params }: { params: { org_id?: string } },
) {
  const orgId = params.org_id; // needs to be restaurant_id, NOT slug;

  checkOrgExists(orgId!);

  const { data: menuCategoriesArr, error: menuCategoriesError } = await supabase
    .from("item_categories")
    .select("*")
    .eq("org_id", orgId!);

  if (menuCategoriesError) {
    console.error("Error fetching menu categories:", menuCategoriesError);
    return NextResponse.json(
      { error: "Error fetching menu categories" },
      { status: 500 },
    );
  }

  if (!menuCategoriesArr) {
    return NextResponse.json(
      { error: "Menu categories not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(menuCategoriesArr);
}
