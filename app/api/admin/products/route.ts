import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { images, variants, ...product } = body;

  const supabase = createAdminClient();
  const { data: created, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error || !created) {
    return NextResponse.json({ error: error?.message ?? "Could not create product" }, { status: 500 });
  }

  if (Array.isArray(images) && images.length > 0) {
    await supabase
      .from("product_images")
      .insert(images.map((img: { url: string; alt: string; position: number }) => ({ ...img, product_id: created.id })));
  }

  if (Array.isArray(variants) && variants.length > 0) {
    await supabase.from("product_variants").insert(
      variants.map((v: Record<string, unknown>) => {
        const { id: _id, ...rest } = v;
        return { ...rest, product_id: created.id };
      })
    );
  }

  return NextResponse.json({ id: created.id });
}
