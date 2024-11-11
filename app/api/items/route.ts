import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { insertItemSchema } from "@/schemas/item";
import { ZodError } from "zod";
import { checkOrgExists } from "@/lib/helpers";

// GET ALL ITEMS FROM RESTAURANT
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("org_id");

  checkOrgExists(orgId!);

  const { data: all, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("org_id", orgId);

  if (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Error fetching menu items" },
      { status: 500 },
    );
  }

  return NextResponse.json(all);
}

// CREATE ITEM
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedData = insertItemSchema.parse(body);

    checkOrgExists(parsedData.org_id!);

    const { data: newItem, error } = await supabase
      .from("menu_items")
      .insert([parsedData])
      .select()
      .single();

    if (error) {
      console.error("Error inserting item:", error);
      return NextResponse.json(
        { error: "Error creating item" },
        { status: 500 },
      );
    }

    console.log(body, newItem);

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
