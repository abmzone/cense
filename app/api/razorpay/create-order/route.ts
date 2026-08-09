import { NextResponse } from "next/server";
import { getRazorpayClient } from "@/lib/razorpay";
import { computeOrderTotals } from "@/lib/pricing";

export async function POST(request: Request) {
  const { lines, couponCode, destinationPincode } = await request.json();

  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  try {
    const totals = await computeOrderTotals(lines, couponCode, {
      destinationPincode,
      paymentMode: "Prepaid",
    });

    if (totals.total <= 0) {
      return NextResponse.json({ error: "Order total must be greater than zero." }, { status: 400 });
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: totals.total,
      currency: "INR",
      receipt: `cense_${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      totals,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Could not create payment order. Check Razorpay API keys.",
      },
      { status: 500 }
    );
  }
}
