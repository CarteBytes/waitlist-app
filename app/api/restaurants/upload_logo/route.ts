import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { file, restaurantId } = await req.json();

  if (!file || !restaurantId) {
    return NextResponse.json(
      { error: "Missing file or restaurant ID" },
      { status: 400 },
    );
  }

  // Decode the base64 file (sent from the client-side)
  const buffer = Buffer.from(file, "base64");
  const filename = `logo-${restaurantId}`;
  const folderPath = `${restaurantId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("asset_bucket")
    .upload(folderPath, buffer, {
      upsert: true,
      contentType: "image/png",
    });

  if (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
