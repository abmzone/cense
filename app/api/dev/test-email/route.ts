import { NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/lib/email/order-confirmation";

export async function POST(request: Request) {
  const secret = request.headers.get("x-test-secret");
  if (!secret || secret !== process.env.RAZORPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await sendOrderConfirmationEmail({
    order: {
      order_number: "CSTEST01",
      email: "hello@cense.in",
      payment_method: "razorpay",
      subtotal: 8500,
      discount: 0,
      shipping_fee: 0,
      tax: 0,
      total: 8500,
      coupon_code: null,
      shipping_address: {
        full_name: "Test Order",
        line1: "Test Address",
        city: "Guwahati",
        state: "Assam",
        postal_code: "781001",
        country: "India",
      },
    },
    items: [
      {
        product_name: "Where the Flowers Rested",
        variant_label: "40g · 20 sticks",
        unit_price: 8500,
        quantity: 1,
      },
    ],
  });

  return NextResponse.json({ ok: true });
}
