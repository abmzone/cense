import { NextResponse } from "next/server";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay";
import { confirmRazorpayOrder } from "@/lib/data/orders";

/**
 * Reconciliation endpoint for Razorpay server-to-server webhooks
 * (configure at Razorpay Dashboard → Settings → Webhooks, event:
 * payment.captured). The primary order-confirmation path is
 * /api/razorpay/verify, called directly from the checkout page after a
 * successful payment — this webhook exists as a fallback in case that
 * client-side call never completes (e.g. the tab closes right after
 * payment). Both call the same idempotent confirmRazorpayOrder(), so
 * whichever fires first wins and the other is a safe no-op.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature || !verifyRazorpayWebhookSignature({ body: rawBody, signature })) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "payment.captured") {
    const payment = event.payload?.payment?.entity;
    const razorpayOrderId = payment?.order_id;
    const razorpayPaymentId = payment?.id;
    if (razorpayOrderId && razorpayPaymentId) {
      await confirmRazorpayOrder(razorpayOrderId, razorpayPaymentId);
    }
  }

  return NextResponse.json({ received: true });
}
