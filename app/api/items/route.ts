import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import { ZodError } from "zod";
import { eq } from "drizzle-orm";
import { checkOrgExists, checkRestaurantExists } from "@/lib/helpers";
import { items } from "@/models/item";
import { insertItemSchema } from "@/schemas/item";

// GET ALL ITEMS FROM RESTAURANT
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("org_id");

  checkOrgExists(orgId!);

  const all = await db.select().from(items).where(eq(items.org_id, orgId!));
  return NextResponse.json(all);
}

// CREATE ITEM
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    const parsedData = insertItemSchema.parse(body);

    checkOrgExists(parsedData.org_id!);

    const [newItem] = await db.insert(items).values(parsedData).returning();

    return NextResponse.json(newItem, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating item:", error);
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
