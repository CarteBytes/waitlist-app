import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ZodError } from "zod";
import { eq, and } from "drizzle-orm";
import { checkOrgExists, checkRestaurantExists } from "@/lib/helpers";
import { menu_contents, menus } from "@/models/menu";
import { MenuSectionT } from "@/app/menus/playground/types/menu";

// GET ALL RESTAURANT MENUS
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("org_id");
  const restaurantId = searchParams.get("restaurant_id");

  // Check if organization and restaurant exist
  checkOrgExists(orgId!);
  checkRestaurantExists(restaurantId!);

  // Get menus with corresponding menu_content items
  const menusData = await db
    .select()
    .from(menus)
    .where(
      and(eq(menus.org_id, orgId!), eq(menus.restaurant_id, restaurantId!)),
    );

  // Fetch menu_content for each menu and include it in the response
  const menusWithContent = await Promise.all(
    menusData.map(async (menu) => {
      const contentItems = await db
        .select()
        .from(menu_contents)
        .where(eq(menu_contents.menu_id, menu.id)); // Assuming `menu.id` corresponds to the menu ID

      return {
        ...menu,
        content: contentItems, // Include the content items for this menu
      };
    }),
  );

  return NextResponse.json(menusWithContent);
}

// CREATE MENU
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Ensure organization and restaurant exist
    await checkOrgExists(body.org_id);
    await checkRestaurantExists(body.restaurant_id);

    // Insert new menu and return its details
    const [newMenu] = await db
      .insert(menus)
      .values({
        org_id: body.org_id,
        restaurant_id: body.restaurant_id,
        name: body.name, // or other fields as per your schema
        description: body.description,
        theme: body.theme,
      })
      .returning();

    // Map content items to include the new menu's ID and insert into menu_contents
    const contentItems = body.content.map((item: MenuSectionT) => ({
      menu_id: newMenu.id,
      org_id: body.org_id,
      restaurant_id: body.restaurant_id,
      ...item,
      // other fields as per menu_contents schema
    }));

    // Insert all content items
    const newMenuContents = await db
      .insert(menu_contents)
      .values(contentItems)
      .returning();

    // Return the new menu along with its content
    return NextResponse.json(
      { ...newMenu, content: newMenuContents },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Error creating menu:", error);
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
