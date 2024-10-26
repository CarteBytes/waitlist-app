import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ZodError } from "zod";
import { eq, and } from "drizzle-orm";
import { checkOrgExists, checkRestaurantExists } from "@/lib/helpers";
import { menus } from "@/models/menu";
import { insertMenuSchema } from "@/schemas/menuSchema";

// GET ALL RESTAURANT MENUS
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("org_id");
  const restaurantId = searchParams.get("restaurant_id");

  checkOrgExists(orgId!);
  checkRestaurantExists(restaurantId!);

  const all = await db
    .select()
    .from(menus)
    .where(
      and(eq(menus.org_id, orgId!), eq(menus.restaurant_id, restaurantId!)),
    );

  return NextResponse.json(all);
}

// CREATE MENU
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = insertMenuSchema.parse(body);

    checkOrgExists(parsedData.org_id);

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
