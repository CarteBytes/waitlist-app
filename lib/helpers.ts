import { organizations } from "@/models/organization";
import { db } from "./db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { restaurants } from "@/models/restaurant";

export const checkOrgExists = async (orgId: string) => {
  const organizationExists = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, orgId))
    .limit(1);
  if (!organizationExists.length) {
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 },
    );
  }
};

export const checkRestaurantExists = async (restaurantId: string) => {
  const restaurantExists = await db
    .select()
    .from(restaurants)
    .where(eq(restaurants.id, restaurantId))
    .limit(1);
  if (!restaurantExists.length) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 },
    );
  }
};
