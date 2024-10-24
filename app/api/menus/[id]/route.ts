import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { restaurants } from "@/models/restaurant";
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import { and, eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; org_id: string } },
) {
  const restaurant = await db
    .select()
    .from(restaurants)
    .where(
      and(eq(restaurants.org_id, params.org_id), eq(restaurants.id, params.id)),
    );
  if (!restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 },
    );
  }
  return NextResponse.json(restaurant);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; org_id: string } },
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
          eq(restaurants.id, params.id),
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
  { params }: { params: { id: string } },
) {
  try {
    await db.delete(restaurants).where(eq(restaurants.id, params.id));
    return NextResponse.json({ message: "Restaurant deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
