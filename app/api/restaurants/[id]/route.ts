import { supabase } from "@/lib/db";
import {
  UploadImageAndRetrieveUrlInterface,
  checkOrgExists,
  checkRestaurantExists,
  uploadImageAndRetreiveUrl,
} from "@/lib/helpers";
import { insertRestaurantSchema } from "@/schemas/restaurantSchema";
import { NextRequest, NextResponse } from "next/server";

// Update a restaurant by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    checkOrgExists(body.org_id);
    checkRestaurantExists(params.id);

    let imageUrl = null;
    if (body.file) {
      imageUrl = await uploadImageAndRetreiveUrl({
        id: params.id,
        keyType: "restaurant",
        file: body.file,
        orgId: body.org_id,
      } as UploadImageAndRetrieveUrlInterface);
    }

    const updatedRestaurant = insertRestaurantSchema.parse(body);

    const { data, error } = await supabase
      .from("restaurants")
      .update({ ...updatedRestaurant, logo_url: imageUrl })
      .eq("org_id", body.org_id)
      .eq("id", params.id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

// Delete a restaurant by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { error } = await supabase
      .from("restaurants")
      .delete()
      .eq("id", params.id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: "Restaurant deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
