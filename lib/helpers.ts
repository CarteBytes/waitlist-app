import { NextResponse } from "next/server";
import { supabase } from "./db";

type FileKeyTypes = "category" | "item" | "restaurant";

export interface UploadImageAndRetrieveUrlInterface {
  file: string;
  keyType: FileKeyTypes;
  id: string;
  orgId: string;
}

export const uploadImageAndRetreiveUrl = async ({
  file,
  keyType,
  id,
  orgId,
}: UploadImageAndRetrieveUrlInterface) => {
  const FILE_NAME_KEY = {
    category: `${id}-category-img`,
    item: `${id}-item-img`,
    restaurant: `${id}-logo`,
  };

  const FOLDER_PATH_KEY = {
    category: `${orgId}/categories/${FILE_NAME_KEY[keyType]}`,
    item: `${orgId}/items/${FILE_NAME_KEY[keyType]}`,
    restaurant: `${orgId}/restaurants/${id}/logo/${FILE_NAME_KEY[keyType]}`,
  };

  // Decode the base64 file (sent from the client-side)
  const buffer = Buffer.from(file, "base64");
  const folderPath = FOLDER_PATH_KEY[keyType];

  const { data, error } = await supabase.storage
    .from("asset_bucket")
    .upload(folderPath, buffer, {
      upsert: true,
      contentType: "image/png",
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { data: publicUrlData } = supabase.storage
    .from("asset_bucket")
    .getPublicUrl(folderPath);

  const imageUrl = publicUrlData?.publicUrl;

  return imageUrl;
};

// Check if organization exists
export const checkOrgExists = async (orgId: string) => {
  const { data: organization, error } = await supabase
    .from("organizations")
    .select("id")
    .eq("id", orgId)
    .single(); // Fetch a single organization by id

  if (error || !organization) {
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 },
    );
  }
};

// Check if restaurant exists
export const checkRestaurantExists = async (restaurantId: string) => {
  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select("id")
    .eq("id", restaurantId)
    .single(); // Fetch a single restaurant by id

  if (error || !restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 },
    );
  }
};

// Check if CATEGORY exists
export const checkCategoryExists = async (id: string) => {
  const tableName = "item_categories";
  const { data: el, error } = await supabase
    .from(tableName)
    .select("id")
    .eq("id", id)
    .single(); // Fetch a single category element by id

  if (error || !el) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
};

// Check if Item exists
export const checkItemExists = async (id: string) => {
  const tableName = "menu_items";
  const { data: el, error } = await supabase
    .from(tableName)
    .select("id")
    .eq("id", id)
    .single(); // Fetch a single Item element by id

  if (error || !el) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
};
