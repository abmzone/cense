import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { computeOrderTotals } from "@/lib/pricing";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    email,
    phone,
    shippingAddress,
    lines,
    couponCode,
  } = body;

  if (
    typeof razorpay_order_id !== "string" ||
    typeof razorpay_payment_id !== "string" ||
    typeof razorpay_signature !== "string"
  ) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
  }

  const validSignature = verifyRazorpaySignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!validSignature) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  let totals;
  try {
    totals = await computeOrderTotals(lines, couponCode, {
      destinationPincode: shippingAddress?.postal_code,
      paymentMode: "Prepaid",
    });
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
      status: "confirmed",
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping_fee: totals.shippingFee,
      tax: totals.tax,
      total: totals.total,
      coupon_code: totals.couponCode,
      payment_method: "razorpay",
      razorpay_order_id,
      razorpay_payment_id,
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
