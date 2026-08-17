import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { ShippingLabelButton } from "@/components/admin/shipping-label-button";
import { formatINR } from "@/lib/utils";
import { COD_SURCHARGE } from "@/lib/pricing";

export default async function AdminOrderDetailPage({
  params,
}: PageProps<"/admin/orders/[id]">) {
  const { id } = await params;
  const admin = createAdminClient();

  const { data: order } = await admin.from("orders").select("*").eq("id", id).single();
  if (!order) notFound();

  const { data: items } = await admin
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  const address = order.shipping_address as Record<string, string>;

  // shipping_fee is stored as a single combined column, with the COD
  // surcharge folded in for COD orders at write time — split it back out
  // here so the breakdown doesn't look like an unexplained shipping cost.
  const codFee = order.payment_method === "cod" ? COD_SURCHARGE : 0;
  const shippingOnly = order.shipping_fee - codFee;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">{order.order_number}</h2>
        <Link
          href={`/admin/orders/${order.id}/invoice`}
          target="_blank"
          className="text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
        >
          View / Print Invoice
        </Link>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-ink-soft">Items</h3>
            <ul className="mt-3 divide-y divide-line border-y border-line text-sm">
              {items?.map((item) => (
                <li key={item.id} className="flex justify-between py-3">
                  <span className="text-ink">
                    {item.product_name} ({item.variant_label}) &times; {item.quantity}
                  </span>
                  <span className="text-ink-soft">{formatINR(item.unit_price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-1 text-sm text-ink-soft">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between">
                <span>Discount {order.coupon_code ? `(${order.coupon_code})` : ""}</span>
                <span>-{formatINR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatINR(shippingOnly)}</span>
            </div>
            {codFee > 0 && (
              <div className="flex justify-between">
                <span>Cash on Delivery Fee</span>
                <span>{formatINR(codFee)}</span>
              </div>
            )}
            {order.tax > 0 && (
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatINR(order.tax)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-line pt-2 font-serif text-base text-ink">
              <span>Total</span>
              <span>{formatINR(order.total)}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-ink-soft">Shipping Address</h3>
            <p className="mt-3 text-sm text-ink-soft">
              {address?.full_name}
              <br />
              {address?.line1}
              {address?.line2 ? `, ${address.line2}` : ""}
              <br />
              {address?.city}, {address?.state} {address?.postal_code}
              <br />
              {address?.country}
              <br />
              {order.phone}
              <br />
              {order.email}
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-ink-soft">Payment</h3>
            <p className="mt-3 text-sm text-ink-soft">
              {order.payment_method === "razorpay" ? "Razorpay" : "Cash on Delivery"}
              {order.razorpay_payment_id && <> &middot; {order.razorpay_payment_id}</>}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <OrderStatusForm
            orderId={order.id}
            currentStatus={order.status}
            currentTracking={order.tracking_number}
            paymentMethod={order.payment_method}
          />
          <ShippingLabelButton
            orderId={order.id}
            hasTrackingNumber={Boolean(order.tracking_number)}
          />
        </div>
      </div>
    </div>
  );
}
