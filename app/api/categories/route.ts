import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { ZodError } from "zod";
import {
  checkOrgExists,
  uploadImageAndRetreiveUrl,
  UploadImageAndRetrieveUrlInterface,
} from "@/lib/helpers";
import { insertCategorySchema } from "@/schemas/category";
import { v4 } from "uuid";

// GET ALL CATEGORIES FROM ORG
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("org_id");

  checkOrgExists(orgId!);

  const { data: all, error } = await supabase
    .from("item_categories")
    .select("*")
    .eq("org_id", orgId);

  if (error) {
    console.error("Error fetching menu categories:", error);
    return NextResponse.json(
      { error: "Error fetching menu categories" },
      { status: 500 },
    );
  }

  return NextResponse.json(all);
}

// CREATE CATEGORY
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    checkOrgExists(body.org_id!);
    const newId = v4();

    let imageUrl = null;
    if (body.file) {
      imageUrl = await uploadImageAndRetreiveUrl({
        id: newId,
        keyType: "category",
        file: body.file,
        orgId: body.org_id,
      } as UploadImageAndRetrieveUrlInterface);
    }

    const parsedData = insertCategorySchema.parse(body);

    const { data: newCategory, error } = await supabase
      .from("item_categories")
      .insert([
        {
          ...parsedData,
          id: newId,
          image_url: imageUrl,
          price: body.price ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting category:", error);
      return NextResponse.json(
        { error: "Error creating category" },
        { status: 500 },
      );
    }

    return NextResponse.json(newCategory, { status: 201 });
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
