import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

interface VariantPayload {
  id?: string;
  label: string;
  weight_grams: number;
  burn_time_minutes: number;
  price: number;
  compare_at_price: number | null;
  stock: number;
  sku: string;
}

export async function PATCH(
  request: Request,
  { params }: RouteContext<"/api/admin/products/[id]">
) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { images, variants, ...product } = body;

  const supabase = createAdminClient();

  const { error } = await supabase.from("products").update(product).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (Array.isArray(images)) {
    await supabase.from("product_images").delete().eq("product_id", id);
    if (images.length > 0) {
      await supabase
        .from("product_images")
        .insert(images.map((img: { url: string; alt: string; position: number }) => ({ ...img, product_id: id })));
    }
  }

  if (Array.isArray(variants)) {
    const incoming = variants as VariantPayload[];
    const { data: existing } = await supabase
      .from("product_variants")
      .select("id")
      .eq("product_id", id);

    const incomingIds = new Set(incoming.filter((v) => v.id).map((v) => v.id));
    const toRemove = (existing ?? []).filter((v) => !incomingIds.has(v.id));

    for (const variant of toRemove) {
      // Ignore failures: variants referenced by past orders can't be deleted
      // (order_items.variant_id has no cascading delete), so they're kept.
      await supabase.from("product_variants").delete().eq("id", variant.id);
    }

    for (const variant of incoming) {
      const { id: variantId, ...rest } = variant;
      if (variantId) {
        await supabase.from("product_variants").update(rest).eq("id", variantId);
      } else {
        await supabase.from("product_variants").insert({ ...rest, product_id: id });
      }
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext<"/api/admin/products/[id]">
) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "Could not delete — this product may have existing orders." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
