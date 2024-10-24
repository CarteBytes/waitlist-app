import { organizations } from "@/models/organization";
import { db } from "./db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

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
