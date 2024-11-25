import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db"; // Make sure to import your Supabase client
import {
  UploadImageAndRetrieveUrlInterface,
  checkItemExists,
  checkOrgExists,
  uploadImageAndRetreiveUrl,
} from "@/lib/helpers";
import { insertItemSchema } from "@/schemas/item";

// // Get a restaurant by slug
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { slug?: string } },
// ) {
//   const { data: restaurant, error } = await supabase
//     .from("restaurants")
//     .select("*")
//     .eq("slug", params.slug!)
//     .single(); // Fetch a single restaurant by slug

//   if (error || !restaurant) {
//     return NextResponse.json(
//       { error: "Restaurant not found" },
//       { status: 404 },
//     );
//   }

//   return NextResponse.json(restaurant);
// }

// Update an item
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    checkOrgExists(body.org_id); // Ensure organization exists
    checkItemExists(params.id);

    let imageUrl = null;
    if (body.file) {
      imageUrl = await uploadImageAndRetreiveUrl({
        id: params.id,
        keyType: "item",
        file: body.file,
        orgId: body.org_id,
      } as UploadImageAndRetrieveUrlInterface);
    }

    const updatedItem = insertItemSchema.parse(body);

    const { data, error } = await supabase
      .from("menu_items")
      .update({
        ...updatedItem,
        image_url: imageUrl ?? updatedItem.image_url,
        price: body.price ?? null,
      })
      .eq("org_id", body.org_id)
      .eq("id", params.id); // Update the item with the given id

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

// Delete an item
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { error } = await supabase
      .from("menu_items")
      .delete()
      .eq("id", params.id); // Delete the item with the given id

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Restaurant deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
