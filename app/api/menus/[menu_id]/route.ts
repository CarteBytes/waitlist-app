import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { restaurants } from "@/models/restaurant";
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import { and, eq, inArray } from "drizzle-orm";
import { menu_contents, menus } from "@/models/menu";
import { items } from "@/models/item";

// this gets a particular menu
export async function GET(
  req: NextRequest,
  { params }: { params: { menu_id: string } },
) {
  const menu = await db
    .select()
    .from(menus)
    .where(eq(menus.id, params.menu_id));
  if (!menu) {
    return NextResponse.json({ error: "Menu not found" }, { status: 404 });
  }

  const content = await db
    .select()
    .from(menu_contents)
    .where(eq(menu_contents.menu_id, params.menu_id));

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

  return NextResponse.json({ ...menu[0], content });
}

// TODO: not done
export async function PUT(
  req: NextRequest,
  { params }: { params: { menu_id: string; org_id: string } },
) {
  try {
    const body = await req.json();
    const updatedRestaurant = insertRestaurantSchema.parse(body);

    const result = await db
      .update(restaurants)
      .set(updatedRestaurant)
      .where(
        and(
          eq(restaurants.org_id, params.org_id),
          eq(restaurants.id, params.menu_id),
        ),
      );

    return NextResponse.json(result);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { menu_id: string } },
) {
  try {
    await db.delete(restaurants).where(eq(restaurants.id, params.menu_id));
    return NextResponse.json({ message: "Restaurant deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
