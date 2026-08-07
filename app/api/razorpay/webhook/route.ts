import { NextResponse } from "next/server";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Reconciliation endpoint for Razorpay server-to-server webhooks
 * (configure at Razorpay Dashboard → Settings → Webhooks). The primary
 * order-confirmation path is /api/razorpay/verify, called directly from the
 * checkout page after a successful payment — this webhook exists as a
 * fallback in case that client-side call never completes (e.g. the tab
 * closes right after payment).
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature || !verifyRazorpayWebhookSignature({ body: rawBody, signature })) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "payment.captured") {
    const razorpayOrderId = event.payload?.payment?.entity?.order_id;
    if (razorpayOrderId) {
      const admin = createAdminClient();
      await admin
        .from("orders")
        .update({ status: "confirmed" })
        .eq("razorpay_order_id", razorpayOrderId)
        .eq("status", "pending");
    }
  }

  return NextResponse.json({ received: true });
}
