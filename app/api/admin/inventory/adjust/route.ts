import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { variantId, delta, reason } = await request.json();

  if (typeof variantId !== "string" || typeof delta !== "number" || delta === 0) {
    return NextResponse.json({ error: "Invalid adjustment" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error: rpcError } = await supabase.rpc("adjust_variant_stock", {
    p_variant_id: variantId,
    p_delta: delta,
  });
  if (rpcError) return NextResponse.json({ error: rpcError.message }, { status: 500 });

  await supabase.from("inventory_adjustments").insert({
    variant_id: variantId,
    delta,
    reason: reason ?? "",
    created_by: admin.id,
  });

  return NextResponse.json({ ok: true });
}
