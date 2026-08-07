import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("journal_posts").insert(body).select().single();

  if (error || !data) return NextResponse.json({ error: error?.message ?? "Could not create post" }, { status: 500 });
  return NextResponse.json({ id: data.id });
}
