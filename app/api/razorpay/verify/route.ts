import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/admin";
import { confirmRazorpayOrder } from "@/lib/data/orders";

export async function POST(request: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

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

  // Idempotent: no-ops if the webhook already confirmed this order first.
  await confirmRazorpayOrder(razorpay_order_id, razorpay_payment_id);

  const admin = createAdminClient();
  const { data: order } = await admin
    .from("orders")
    .select("order_number")
    .eq("razorpay_order_id", razorpay_order_id)
    .maybeSingle();

  if (!order) {
    return NextResponse.json({ error: "Could not find your order." }, { status: 404 });
  }

  return NextResponse.json({ orderNumber: order.order_number });
}
