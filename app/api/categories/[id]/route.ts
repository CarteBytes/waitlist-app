import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db"; // Make sure to import your Supabase client
import {
  UploadImageAndRetrieveUrlInterface,
  checkCategoryExists,
  checkOrgExists,
  uploadImageAndRetreiveUrl,
} from "@/lib/helpers";
import { insertCategorySchema } from "@/schemas/category";

// Get a restaurant by id
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id?: string } },
// ) {
//   const { data: restaurant, error } = await supabase
//     .from("restaurants")
//     .select("*")
//     .eq("id", params.id!)
//     .single(); // Fetch a single restaurant by id

//   if (error || !restaurant) {
//     return NextResponse.json(
//       { error: "Restaurant not found" },
//       { status: 404 },
//     );
//   }

//   return NextResponse.json(restaurant);
// }

// Update a category
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    checkOrgExists(body.org_id); // Ensure organization exists
    checkCategoryExists(params.id);

    let imageUrl = null;
    if (body.file) {
      imageUrl = await uploadImageAndRetreiveUrl({
        id: params.id,
        keyType: "category",
        file: body.file,
        orgId: body.org_id,
      } as UploadImageAndRetrieveUrlInterface);
    }

    const updatedCategory = insertCategorySchema.parse(body);

    const { data, error } = await supabase
      .from("item_categories")
      .update({ ...updatedCategory, image_url: imageUrl })
      .eq("org_id", body.org_id)
      .eq("id", params.id); // Update the restaurant with the given id

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

// Delete a restaurant
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { error } = await supabase
      .from("item_categories")
      .delete()
      .eq("id", params.id); // Delete the restaurant with the given id

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Category deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
