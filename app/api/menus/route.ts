import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ZodError } from "zod";
import { eq, and } from "drizzle-orm";
import { checkOrgExists, checkRestaurantExists } from "@/lib/helpers";
import { menu_contents, menus } from "@/models/menu";
import { insertMenuSchema } from "@/schemas/menuSchema";

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
    const parsedData = insertMenuSchema.parse(body);

    checkOrgExists(parsedData.org_id);
    checkRestaurantExists(parsedData.restaurant_id);

    const [newMenu] = await db.insert(menus).values(parsedData).returning();

    return NextResponse.json(newMenu, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating organization:", error);
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
