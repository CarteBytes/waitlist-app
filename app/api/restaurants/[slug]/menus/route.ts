import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import { checkRestaurantExists } from "@/lib/helpers";

// This route gets all the restaurant's menus
export async function GET(
  req: NextRequest,
  { params }: { params: { slug?: string } },
) {
  const { searchParams } = new URL(req.url);
  const defaultOnly = searchParams.has("default");
  const restaurantId = params.slug; // needs to be restaurant_id, NOT slug;

  checkRestaurantExists(restaurantId!);

  const { data: menuArr, error: menuError } = await supabase
    .from("menus")
    .select("*")
    .eq("restaurant_id", restaurantId!)
    .eq("is_default", defaultOnly);

  if (menuError) {
    console.error("Error fetching menus:", menuError);
    return NextResponse.json(
      { error: "Error fetching menus" },
      { status: 500 },
    );
  }

  if (!menuArr || menuArr.length === 0) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 },
    );
  }

  const defaultMenu = defaultOnly ? menuArr[0] : menuArr;

  const { data: content, error: contentError } = await supabase
    .from("menu_sections")
    .select("*")
    .eq("menu_id", defaultMenu.id);

  if (contentError) {
    console.error("Error fetching menu contents:", contentError);
    return NextResponse.json(
      { error: "Error fetching menu contents" },
      { status: 500 },
    );
  }

  const itemIdsArray = content.flatMap((c) => c.items || []);
  const { data: itemObjects, error: itemError } = await supabase
    .from("menu_items")
    .select("*")
    .in("id", itemIdsArray);

  if (itemError) {
    console.error("Error fetching items:", itemError);
    return NextResponse.json(
      { error: "Error fetching menu items" },
      { status: 500 },
    );
  }

  const itemIdsMap: Record<string, any> = {};
  itemObjects.forEach((itemObj) => (itemIdsMap[itemObj.id] = itemObj));

  content.forEach((c) => {
    c.items = c.items?.map((itemId: any) => itemIdsMap[itemId]) || [];
  });

  return NextResponse.json({ ...defaultMenu, content });
}
