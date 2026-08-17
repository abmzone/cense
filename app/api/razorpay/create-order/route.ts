import { NextResponse } from "next/server";
import { getRazorpayClient } from "@/lib/razorpay";
import { computeOrderTotals } from "@/lib/pricing";
import { checkPincodeServiceability } from "@/lib/delhivery";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { lines, couponCode, destinationPincode, email, phone, shippingAddress } =
    await request.json();

  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  if (typeof destinationPincode !== "string" || !/^\d{6}$/.test(destinationPincode)) {
    return NextResponse.json({ error: "A valid 6-digit postal code is required." }, { status: 400 });
  }

  if (typeof email !== "string" || typeof phone !== "string" || !shippingAddress) {
    return NextResponse.json({ error: "Contact and shipping details are required." }, { status: 400 });
  }

  try {
    const { serviceable } = await checkPincodeServiceability(destinationPincode, "Prepaid");
    if (!serviceable) {
      return NextResponse.json(
        { error: "Sorry, we can't deliver to this pincode yet." },
        { status: 400 }
      );
    }

    const totals = await computeOrderTotals(lines, couponCode, "razorpay", destinationPincode);

    if (totals.belowMinimumOrder) {
      return NextResponse.json(
        { error: `Minimum order value is ₹${(totals.minimumOrderValue / 100).toFixed(2)}.` },
        { status: 400 }
      );
    }

    if (totals.total <= 0) {
      return NextResponse.json({ error: "Order total must be greater than zero." }, { status: 400 });
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: totals.total,
      currency: "INR",
      receipt: `cense_${Date.now()}`,
    });

    // Persist the order as "pending" now, before the customer ever reaches
    // Razorpay Checkout — /verify or the webhook (whichever fires first)
    // just flips this row to "confirmed". This is what lets the webhook
    // recover an order if the browser never makes it back to /verify.
    const supabaseServer = await createClient();
    const {
      data: { user },
    } = await supabaseServer.auth.getUser();

    const admin = createAdminClient();
    const orderNumber = `CS${Date.now().toString(36).toUpperCase()}`;

    const { data: dbOrder, error } = await admin
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
        payment_method: "razorpay",
        razorpay_order_id: order.id,
        shipping_address: shippingAddress,
      })
      .select()
      .single();

    if (error || !dbOrder) {
      return NextResponse.json({ error: "Could not save your order." }, { status: 500 });
    }

    await admin.from("order_items").insert(
      totals.resolvedLines.map((line) => ({
        order_id: dbOrder.id,
        product_id: line.productId,
        variant_id: line.variantId,
        product_name: line.productName,
        variant_label: line.variantLabel,
        unit_price: line.unitPrice,
        quantity: line.quantity,
      }))
    );

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
