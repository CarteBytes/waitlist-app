import { supabase } from "@/lib/db";

export async function loginUser(
  email: string,
  password: string,
): Promise<{ session: any; userData: any }> {
  const { data: session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`Login failed: ${error.message}`);
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id, auth_user_id, organization_id, organizations(name)")
    .eq("auth_user_id", session.user.id)
    .single();

  if (userError) {
    throw new Error(`Failed to fetch user data: ${userError.message}`);
  }

  return { session, userData };
}

export async function fetchUserData(authUserId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id, organization_id, organizations(name)")
    .eq("auth_user_id", authUserId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }

  return data;
}
