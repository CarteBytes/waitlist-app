import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ZodError } from "zod";
import { and, eq, inArray } from "drizzle-orm";
import { menu_contents, menus } from "@/models/menu";
import { items } from "@/models/item";
import { checkOrgExists, checkRestaurantExists } from "@/lib/helpers";
import { MenuSectionT } from "@/app/menus/playground/types/menu";

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

// UPDATE MENU
export async function PUT(
  req: NextRequest,
  { params }: { params: { menu_id: string } },
) {
  try {
    const body = await req.json();
    const menu_id = params.menu_id;

    if (!menu_id) {
      return NextResponse.json(
        { error: "menu_id is required" },
        { status: 400 },
      );
    }

    // Ensure organization and restaurant exist
    await checkOrgExists(body.org_id);
    await checkRestaurantExists(body.restaurant_id);

    // Update the menu details
    const [updatedMenu] = await db
      .update(menus)
      .set({
        // org_id: body.org_id,
        // restaurant_id: body.restaurant_id,
        name: body.name, // or other fields as per your schema
        description: body.description,
        theme: body.theme,
      })
      .where(eq(menus.id, menu_id))
      .returning();

    // Delete existing content items for this menu
    await db.delete(menu_contents).where(eq(menu_contents.menu_id, menu_id));

    // Map new content items to include the menu's ID and insert into menu_contents
    const contentItems = body.content.map((item: MenuSectionT) => ({
      menu_id: menu_id,
      org_id: body.org_id,
      restaurant_id: body.restaurant_id,
      ...item,
      // other fields as per menu_contents schema
    }));

    // Insert all new content items
    const updatedMenuContents = await db
      .insert(menu_contents)
      .values(contentItems)
      .returning();

    // Return the updated menu along with its new content
    return NextResponse.json(
      { ...updatedMenu, content: updatedMenuContents },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error updating menu:", error);
    if (error instanceof ZodError) {
      // Handle validation errors
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { menu_id: string } },
) {
  try {
    await db
      .delete(menu_contents)
      .where(eq(menu_contents.menu_id, params.menu_id));
    await db.delete(menus).where(eq(menus.id, params.menu_id));
    return NextResponse.json({ message: "Menu and content deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
