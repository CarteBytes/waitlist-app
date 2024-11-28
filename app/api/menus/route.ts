import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db"; // Use Supabase client instead of db
import { ZodError } from "zod";
import { checkOrgExists, checkRestaurantExists } from "@/lib/helpers";
import { MenuSectionT } from "@/app/ui/types/menu";

// GET ALL RESTAURANT MENUS
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("org_id");
  const restaurantId = searchParams.get("restaurant_id");

  // Check if organization and restaurant exist
  checkOrgExists(orgId!);
  checkRestaurantExists(restaurantId!);

  // Get menus with corresponding menu_section items
  const { data: menusData, error: menuError } = await supabase
    .from("menus")
    .select("*")
    .match({ org_id: orgId, restaurant_id: restaurantId });

  if (menuError) {
    console.error("Error fetching menus:", menuError);
    return NextResponse.json(
      { error: "Error fetching menus" },
      { status: 500 },
    );
  }

  // Fetch menu_section for each menu and include it in the response
  const menusWithContent = await Promise.all(
    menusData!.map(async (menu) => {
      const { data: contentItems, error: contentError } = await supabase
        .from("menu_sections")
        .select("*")
        .eq("menu_id", menu.id);

      if (contentError) {
        console.error("Error fetching menu content:", contentError);
        return NextResponse.json(
          { error: "Error fetching menu content" },
          { status: 500 },
        );
      }

      return {
        ...menu,
        content: contentItems,
      };
    }),
  );

  return NextResponse.json(menusWithContent);
}

// CREATE MENU
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Ensure organization and restaurant exist
    await checkOrgExists(body.org_id);
    await checkRestaurantExists(body.restaurant_id);

    // Insert new menu and return its details
    const { data: newMenu, error: menuInsertError } = await supabase
      .from("menus")
      .insert({
        org_id: body.org_id,
        restaurant_id: body.restaurant_id,
        name: body.name, // Other fields as per your schema
        description: body.description,
        theme: body.theme,
      })
      .select()
      .single();

    if (menuInsertError) {
      console.error("Error inserting menu:", menuInsertError);
      return NextResponse.json(
        { error: "Error creating menu" },
        { status: 500 },
      );
    }

    // Map content items to include the new menu's ID and insert into menu_sections
    const contentItems = body.content.map((item: MenuSectionT) => ({
      menu_id: newMenu.id,
      org_id: body.org_id,
      restaurant_id: body.restaurant_id,
      ...item,
      // other fields as per menu_sections schema
    }));

    // Insert all content items
    const { data: newMenuContents, error: contentInsertError } = await supabase
      .from("menu_sections")
      .insert(contentItems)
      .select();

    if (contentInsertError) {
      console.error("Error inserting menu content:", contentInsertError);
      return NextResponse.json(
        { error: "Error creating menu content" },
        { status: 500 },
      );
    }

    // Return the new menu along with its content
    return NextResponse.json(
      { ...newMenu, content: newMenuContents },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Error creating menu:", error);
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
