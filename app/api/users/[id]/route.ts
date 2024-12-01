import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";

// API handler
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing user ID." }, { status: 400 });
  }

  // Query Supabase for the user by ID
  const { data: user, error } = await supabase
    .from("users") // Replace with your table name
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message || "An error occurred." },
      { status: 500 },
    );
  }

  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  return NextResponse.json({ user });
}
