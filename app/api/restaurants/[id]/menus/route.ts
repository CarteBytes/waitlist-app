import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { checkRestaurantExists } from "@/lib/helpers";
import { ItemCategoryT } from "@/app/ui/types/category";
import { ItemT } from "@/app/ui/types/item";

// This route gets all the restaurant's menus
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id?: string } },
// ) {
//   const { searchParams } = new URL(req.url);
//   const defaultOnly = searchParams.has("default");
//   const restaurantId = params.id;

//   checkRestaurantExists(restaurantId!);

//   const { data: menuArr, error: menuError } = await supabase
//     .from("menus")
//     .select("*")
//     .eq("restaurant_id", restaurantId!)
//     .eq("is_default", defaultOnly);

//   if (menuError) {
//     console.error("Error fetching menus:", menuError);
//     return NextResponse.json(
//       { error: "Error fetching menus" },
//       { status: 500 },
//     );
//   }

//   if (!menuArr || menuArr.length === 0) {
//     return NextResponse.json(
//       { error: "Restaurant not found" },
//       { status: 404 },
//     );
//   }

//   const defaultMenu = defaultOnly ? menuArr[0] : menuArr;

//   const { data: content, error: contentError } = await supabase
//     .from("menu_sections")
//     .select("*")
//     .eq("menu_id", defaultMenu.id);

//   if (contentError) {
//     console.error("Error fetching menu contents:", contentError);
//     return NextResponse.json(
//       { error: "Error fetching menu contents" },
//       { status: 500 },
//     );
//   }

//   const itemIdsArray = content.flatMap((c) => c.items || []);
//   const { data: itemObjects, error: itemError } = await supabase
//     .from("menu_items")
//     .select("*")
//     .in("id", itemIdsArray);

//   if (itemError) {
//     console.error("Error fetching items:", itemError);
//     return NextResponse.json(
//       { error: "Error fetching menu items" },
//       { status: 500 },
//     );
//   }

//   const itemIdsMap: Record<string, any> = {};
//   itemObjects.forEach((itemObj) => (itemIdsMap[itemObj.id] = itemObj));

//   content.forEach((c) => {
//     c.items = c.items?.map((itemId: any) => itemIdsMap[itemId]) || [];
//   });

//   return NextResponse.json({ ...defaultMenu, content });
// }

export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } },
) {
  const { searchParams } = new URL(req.url);
  const defaultOnly = searchParams.has("default");
  const restaurantId = params.id;

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

  // Extract category IDs directly from each content row
  const filteredContent = content.filter((c) => !!c.category); // no nulls
  const categoryIdsArray = filteredContent.map((c) => c.category);

  // Fetch category objects based on category IDs
  const { data: categoryObjects, error: categoryError } = await supabase
    .from("item_categories")
    .select("*")
    .in("id", categoryIdsArray);

  if (categoryError) {
    console.error("Error fetching categories:", categoryError);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 },
    );
  }

  // Fetch item objects based on category IDs
  const { data: itemObjects, error: itemError } = await supabase
    .from("menu_items")
    .select("*")
    .in("category_id", categoryIdsArray);

  if (itemError) {
    console.error("Error fetching items:", itemError);
    return NextResponse.json(
      { error: "Error fetching items" },
      { status: 500 },
    );
  }

  // Map category objects by their IDs for easier lookup
  const categoryIdsMap: Record<string, ItemCategoryT> = {};
  categoryObjects.forEach((categoryObj) => {
    categoryIdsMap[categoryObj.id] = categoryObj;
  });

  // Map category objects by their IDs for easier lookup
  const itemIdsMap: Record<string, ItemT[]> = {};
  itemObjects.forEach((itemObj) => {
    itemIdsMap[itemObj.category_id] = [
      ...(itemIdsMap[itemObj.category_id] ?? []),
      itemObj,
    ];
  });

  // Map each content row to include its category object
  content.forEach((c) => {
    c.items = itemIdsMap[c.category] || null;
    c.category = categoryIdsMap[c.category] || null;
  });

  return NextResponse.json({ ...defaultMenu, content });
}
