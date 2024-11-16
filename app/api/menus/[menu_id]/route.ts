import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db"; // Ensure this is set up
import { ZodError } from "zod";
import {
  checkMenuExists,
  checkOrgExists,
  checkRestaurantExists,
  uploadImageAndRetreiveUrl,
} from "@/lib/helpers";
import { MenuSectionT } from "@/app/menu/playground/types/menu";
import { insertCategorySchema } from "@/schemas/category";
import { v4 } from "uuid";

// this gets a particular menu
export async function GET(
  req: NextRequest,
  { params }: { params: { menu_id: string } },
) {
  const { data: menu, error: menuError } = await supabase
    .from("menus")
    .select("*")
    .eq("id", params.menu_id)
    .single(); // Fetch a single menu

  if (menuError || !menu) {
    return NextResponse.json({ error: "Menu not found" }, { status: 404 });
  }

  const { data: content, error: contentError } = await supabase
    .from("menu_sections")
    .select("*")
    .eq("menu_id", params.menu_id);

  if (contentError) {
    return NextResponse.json(
      { error: "Error fetching menu content" },
      { status: 500 },
    );
  }

  // const itemIdsArray = [...new Set(content.flatMap((c) => c.items || []))];
  // const { data: itemObjects, error: itemError } = await supabase
  //   .from("menu_items")
  //   .select("*")
  //   .in("id", itemIdsArray);

  // if (itemError) {
  //   return NextResponse.json(
  //     { error: "Error fetching menu items" },
  //     { status: 500 },
  //   );
  // }

  // const itemIdsMap: Record<string, any> = {};
  // itemObjects?.forEach((itemObj) => (itemIdsMap[itemObj.id] = itemObj));

  // content.forEach((c) => {
  //   c.items = c.items?.map((itemId: any) => itemIdsMap[itemId]) || [];
  // });

  return NextResponse.json({ ...menu, content });
}

// UPDATE MENU
export async function PUT(
  req: NextRequest,
  { params }: { params: { menu_id: string } },
) {
  try {
    const body = await req.json();
    const menu_id = params.menu_id;

    if (!menu_id) {
      return NextResponse.json(
        { error: "menu_id is required" },
        { status: 400 },
      );
    }

    // Ensure organization and restaurant exist
    await checkOrgExists(body.org_id);
    await checkRestaurantExists(body.restaurant_id);
    await checkMenuExists(menu_id);

    // Update the menu details
    const { data: updatedMenu, error: updateError } = await supabase
      .from("menus")
      .update({
        name: body.name, // or other fields as per your schema
        description: body.description,
        theme: body.theme,
      })
      .eq("id", menu_id)
      .select()
      .single();

    if (updateError) {
      throw new Error(updateError.message);
    }

    // Delete existing content items for this menu
    const { error: deleteContentError } = await supabase
      .from("menu_sections")
      .delete()
      .eq("menu_id", menu_id);

    if (deleteContentError) {
      throw new Error(deleteContentError.message);
    }

    // handle new images
    const newBodyContent: MenuSectionT[] = await Promise.all(
      body.content.map(async (section: MenuSectionT) => {
        if (!!(section.category as any)?.file) {
          const newId = v4();

          const image_url = await uploadImageAndRetreiveUrl({
            file: (section.category as any).file,
            keyType: "category",
            orgId: body.org_id,
            id: newId,
          });

          const parsedData = insertCategorySchema.parse({
            ...section.category,
            org_id: body.org_id,
            name: "",
            id: newId,
            type: "image",
            image_url,
          });

          const { data: newCategory, error } = await supabase
            .from("item_categories")
            .insert([parsedData])
            .select()
            .single();

          if (error) {
            console.error("Error inserting new category:", error);
            return section; // Return unchanged section in case of an error
          }

          section.category = newCategory;
        }
        return section; // Always return the updated or unchanged section
      }),
    );

    // Map new content items to include the menu's ID and insert into menu_sections
    const contentSections = newBodyContent.map((section: MenuSectionT) => ({
      org_id: body.org_id,
      restaurant_id: body.restaurant_id,
      menu_id: menu_id,
      ...section,
      category: section.category?.id ?? null,
      items: null, // todo: fix to include dyanmic items (resortable)
      created_at: section.created_at ?? new Date().toISOString(),
      last_updated: new Date().toISOString(),
    }));

    // Insert all new content items
    const { data: updatedMenuContents, error: insertError } = await supabase
      .from("menu_sections")
      .insert(contentSections);

    if (insertError) {
      throw new Error(insertError.message);
    }

    // Return the updated menu along with its new content
    return NextResponse.json(
      { ...updatedMenu, content: updatedMenuContents },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error updating menu:", error);
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

// DELETE a menu
export async function DELETE(
  req: NextRequest,
  { params }: { params: { menu_id: string } },
) {
  try {
    // Delete the menu contents
    const { error: deleteContentError } = await supabase
      .from("menu_sections")
      .delete()
      .eq("menu_id", params.menu_id);

    if (deleteContentError) {
      throw new Error(deleteContentError.message);
    }

    // Delete the menu itself
    const { error: deleteMenuError } = await supabase
      .from("menus")
      .delete()
      .eq("id", params.menu_id);

    if (deleteMenuError) {
      throw new Error(deleteMenuError.message);
    }

    return NextResponse.json({ message: "Menu and content deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
