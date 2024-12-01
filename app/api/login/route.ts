import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  // Authenticate the user with Supabase Auth
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    console.error(authError);
    return NextResponse.json({ error: authError.message }, { status: 401 });
  }

  const { user: authUser, session } = authData;

  // Fetch the corresponding user from the custom `users` table
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("auth_user_id", authUser.id) // Match `auth_id` with the user's ID from Supabase Auth
    .single();

  if (userError) {
    console.error(userError);
    return NextResponse.json(
      { error: "User not found in users table." },
      { status: 404 },
    );
  }

  // Optionally combine both authUser and userData if needed
  const combinedUserData = {
    ...authUser,
    CARTEBYTES_USER_DATA: userData,
  };

  // Set cookies for session if needed or return the combined user data
  return NextResponse.json(
    { session, user: combinedUserData },
    { status: 200 },
  );
}
