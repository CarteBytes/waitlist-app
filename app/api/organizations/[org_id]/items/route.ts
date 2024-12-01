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

  const { data: menuItemsArr, error: menuItemsError } = await supabase
    .from("menu_items")
    .select(`*, category:item_categories(*)`)
    .eq("org_id", orgId!);

  if (menuItemsError) {
    console.error("Error fetching menu items:", menuItemsError);
    return NextResponse.json(
      { error: "Error fetching menu items" },
      { status: 500 },
    );
  }

  if (!menuItemsArr) {
    return NextResponse.json(
      { error: "Menu items not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(menuItemsArr);
}
