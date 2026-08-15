import { createAdminClient } from "@/lib/supabase/admin";
import { sendOrderConfirmationEmail } from "@/lib/email/order-confirmation";

/**
 * Attaches any guest orders placed under this email (user_id still null,
 * e.g. checked out without an account) to the now-signed-in user, so they
 * show up in the account order history. Safe to call on every dashboard
 * load — becomes a no-op once there's nothing left to claim.
 */
export async function claimGuestOrders(userId: string, email: string) {
  const admin = createAdminClient();
  await admin
    .from("orders")
    .update({ user_id: userId })
    .is("user_id", null)
    .ilike("email", email);
}

/**
 * Flips a Razorpay order from "pending" to "confirmed" and runs the
 * one-time side effects (stock decrement, coupon usage, confirmation
 * email). Called from both /api/razorpay/verify (the client-side path,
 * right after Checkout succeeds) and /api/razorpay/webhook (the
 * server-to-server fallback) — whichever fires first wins, since the
 * update is filtered on status="pending" and returns null if there's
 * nothing left to do, making both callers safely idempotent.
 */
export async function confirmRazorpayOrder(razorpayOrderId: string, razorpayPaymentId: string) {
  const admin = createAdminClient();

  const { data: order, error } = await admin
    .from("orders")
    .update({ status: "confirmed", razorpay_payment_id: razorpayPaymentId })
    .eq("razorpay_order_id", razorpayOrderId)
    .eq("status", "pending")
    .select("*, order_items(*)")
    .maybeSingle();

  if (error || !order) return null;

  const items = order.order_items as {
    variant_id: string;
    quantity: number;
    product_name: string;
    variant_label: string;
    unit_price: number;
  }[];

  await Promise.all(
    items.map((item) =>
      admin.rpc("decrement_variant_stock", {
        p_variant_id: item.variant_id,
        p_qty: item.quantity,
      })
    )
  );

  if (order.coupon_code) {
    await admin.rpc("increment_coupon_usage", { p_code: order.coupon_code });
  }

  await sendOrderConfirmationEmail({
    order: {
      order_number: order.order_number,
      email: order.email,
      payment_method: "razorpay",
      subtotal: order.subtotal,
      discount: order.discount,
      shipping_fee: order.shipping_fee,
      tax: order.tax,
      total: order.total,
      coupon_code: order.coupon_code,
      shipping_address: order.shipping_address,
    },
    items: items.map((item) => ({
      product_name: item.product_name,
      variant_label: item.variant_label,
      unit_price: item.unit_price,
      quantity: item.quantity,
    })),
  });

  return order;
}
