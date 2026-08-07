import { NextResponse } from "next/server";
import { computeOrderTotals } from "@/lib/pricing";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getSettings } from "@/lib/data/settings";

export async function POST(request: Request) {
  const settings = await getSettings();
  if (!settings.cod_enabled) {
    return NextResponse.json({ error: "Cash on delivery is not available." }, { status: 403 });
  }

  const { email, phone, shippingAddress, lines, couponCode } = await request.json();

  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  let totals;
  try {
    totals = await computeOrderTotals(lines, couponCode);
  } catch {
    return NextResponse.json({ error: "Could not verify order contents." }, { status: 400 });
  }

  const supabaseServer = await createClient();
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  const admin = createAdminClient();
  const orderNumber = `CS${Date.now().toString(36).toUpperCase()}`;

  const { data: order, error } = await admin
    .from("orders")
    .insert({
      order_number: orderNumber,
      user_id: user?.id ?? null,
      email,
      phone,
      status: "pending",
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping_fee: totals.shippingFee,
      tax: totals.tax,
      total: totals.total,
      coupon_code: totals.couponCode,
      payment_method: "cod",
      shipping_address: shippingAddress,
    })
    .select()
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Could not save your order." }, { status: 500 });
  }

  await admin.from("order_items").insert(
    totals.resolvedLines.map((line) => ({
      order_id: order.id,
      product_id: line.productId,
      variant_id: line.variantId,
      product_name: line.productName,
      variant_label: line.variantLabel,
      unit_price: line.unitPrice,
      quantity: line.quantity,
    }))
  );

  await Promise.all(
    totals.resolvedLines.map((line) =>
      admin.rpc("decrement_variant_stock", {
        p_variant_id: line.variantId,
        p_qty: line.quantity,
      })
    )
  );

  if (totals.couponCode) {
    await admin.rpc("increment_coupon_usage", { p_code: totals.couponCode });
  }

  return NextResponse.json({ orderNumber: order.order_number });
}
