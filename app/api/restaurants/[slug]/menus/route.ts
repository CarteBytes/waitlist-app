import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { restaurants } from "@/models/restaurant";
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import { and, eq, inArray, or } from "drizzle-orm";
import { menu_contents, menus } from "@/models/menu";
import { checkRestaurantExists } from "@/lib/helpers";
import { items } from "@/models/item";

// this route gets all the restaurant's menus
export async function GET(
  req: NextRequest,
  { params }: { params: { slug?: string } },
) {
  const { searchParams } = new URL(req.url);
  const defaultOnly = !!searchParams.has("default");
  const restaurantId = params.slug; // needs to be restaurant_id, NOT slug;

  const getFilter = () => {
    if (defaultOnly) {
      return and(
        eq(menus.restaurant_id, restaurantId!),
        eq(menus.is_default, true),
      );
    }
    return eq(menus.restaurant_id, restaurantId!);
  };

  checkRestaurantExists(restaurantId!);

  const menuArr = await db.select().from(menus).where(getFilter());

  if (!menuArr) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 },
    );
  }

  if (!defaultOnly || menuArr.length === 0) return NextResponse.json(menuArr);

  const defaultMenu = menuArr[0];

  const content = await db
    .select()
    .from(menu_contents)
    .where(eq(menu_contents.menu_id, defaultMenu.id));

  const itemIdsMap: Record<string, any> = {};
  content.forEach((c) =>
    c.items?.forEach((itemId) => (itemIdsMap[itemId] = itemId)),
  );

  const itemIdsArray = Object.keys(itemIdsMap);
  const itemObjects = await db
    .select()
    .from(items)
    .where(inArray(items.id, itemIdsArray));

  itemObjects.forEach((itemObj) => (itemIdsMap[itemObj.id] = itemObj));

  content.forEach((c, index) => {
    const itemObjectsArr = c.items?.map((itemId) => itemIdsMap[itemId]);

    c.items = itemObjectsArr as any[];
  });

  return NextResponse.json({ ...defaultMenu, content });
}

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } },
//   // would get org_id from token or body
// ) {
//   try {
//     const body = await req.json();

//     checkOrgExists(body.org_id);

//     const updatedRestaurant = insertRestaurantSchema.parse(body);

//     const result = await db
//       .update(restaurants)
//       .set(updatedRestaurant)
//       .where(
//         and(eq(restaurants.org_id, body.org_id), eq(restaurants.id, params.id)),
//       );

//     return NextResponse.json(result);
//   } catch (error: unknown) {
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 400 },
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   try {
//     await db.delete(restaurants).where(eq(restaurants.id, params.id));
//     return NextResponse.json({ message: "Restaurant deleted" });
//   } catch (error: unknown) {
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 400 },
//     );
//   }
// }
