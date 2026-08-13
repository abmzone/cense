import { NextResponse } from "next/server";
import { computeOrderTotals } from "@/lib/pricing";
import { checkPincodeServiceability } from "@/lib/delhivery";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getSettings } from "@/lib/data/settings";
import { sendOrderConfirmationEmail } from "@/lib/email/order-confirmation";

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
    totals = await computeOrderTotals(lines, couponCode, "cod");
  } catch {
    return NextResponse.json({ error: "Could not verify order contents." }, { status: 400 });
  }

  if (totals.belowMinimumOrder) {
    return NextResponse.json(
      { error: `Minimum order value is ₹${(totals.minimumOrderValue / 100).toFixed(2)}.` },
      { status: 400 }
    );
  }

  if (typeof shippingAddress?.postal_code !== "string") {
    return NextResponse.json({ error: "A valid postal code is required." }, { status: 400 });
  }

  const { serviceable } = await checkPincodeServiceability(shippingAddress.postal_code, "COD");
  if (!serviceable) {
    return NextResponse.json(
      { error: "Sorry, we can't deliver (or offer COD) to this pincode yet." },
      { status: 400 }
    );
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
      shipping_fee: totals.shippingFee + totals.codFee,
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

  await sendOrderConfirmationEmail({
    order: {
      order_number: order.order_number,
      email: order.email,
      payment_method: "cod",
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping_fee: totals.shippingFee,
      cod_fee: totals.codFee,
      tax: totals.tax,
      total: totals.total,
      coupon_code: totals.couponCode,
      shipping_address: shippingAddress,
    },
    items: totals.resolvedLines.map((line) => ({
      product_name: line.productName,
      variant_label: line.variantLabel,
      unit_price: line.unitPrice,
      quantity: line.quantity,
    })),
  });

  return NextResponse.json({ orderNumber: order.order_number });
}
