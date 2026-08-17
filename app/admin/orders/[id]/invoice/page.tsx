import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { PrintButton } from "@/components/admin/print-button";
import { formatINR } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { COD_SURCHARGE } from "@/lib/pricing";

export default async function InvoicePage({ params }: PageProps<"/admin/orders/[id]/invoice">) {
  const { id } = await params;
  const admin = createAdminClient();

  const { data: order } = await admin.from("orders").select("*").eq("id", id).single();
  if (!order) notFound();

  const { data: items } = await admin.from("order_items").select("*").eq("order_id", id);
  const address = order.shipping_address as Record<string, string>;

  const codFee = order.payment_method === "cod" ? COD_SURCHARGE : 0;
  const shippingOnly = order.shipping_fee - codFee;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="font-serif text-2xl tracking-[0.15em] text-ink">{SITE.name.toUpperCase()}</p>
          <p className="text-xs text-ink-soft">{SITE.address}</p>
        </div>
        <PrintButton />
      </div>

      <div className="flex justify-between border-b border-ink/20 pb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-ink-soft">Invoice for</p>
          <p className="mt-1 text-sm text-ink">{address?.full_name}</p>
          <p className="text-sm text-ink-soft">
            {address?.line1}
            {address?.line2 ? `, ${address.line2}` : ""}
            <br />
            {address?.city}, {address?.state} {address?.postal_code}
            <br />
            {address?.country}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-ink-soft">Order Number</p>
          <p className="mt-1 text-sm text-ink">{order.order_number}</p>
          <p className="mt-3 text-xs uppercase tracking-widest text-ink-soft">Date</p>
          <p className="mt-1 text-sm text-ink">
            {new Date(order.created_at).toLocaleDateString("en-IN")}
          </p>
        </div>
      </div>

      <table className="mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink/20 text-left text-xs uppercase tracking-widest text-ink-soft">
            <th className="pb-2">Item</th>
            <th className="pb-2 text-right">Qty</th>
            <th className="pb-2 text-right">Unit</th>
            <th className="pb-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={item.id} className="border-b border-ink/10">
              <td className="py-2 text-ink">
                {item.product_name} ({item.variant_label})
              </td>
              <td className="py-2 text-right text-ink-soft">{item.quantity}</td>
              <td className="py-2 text-right text-ink-soft">{formatINR(item.unit_price)}</td>
              <td className="py-2 text-right text-ink">
                {formatINR(item.unit_price * item.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 ml-auto max-w-xs space-y-2 text-sm">
        <div className="flex justify-between text-ink-soft">
          <span>Subtotal</span>
          <span>{formatINR(order.subtotal)}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-ink-soft">
            <span>Discount</span>
            <span>-{formatINR(order.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-ink-soft">
          <span>Shipping</span>
          <span>{formatINR(shippingOnly)}</span>
        </div>
        {codFee > 0 && (
          <div className="flex justify-between text-ink-soft">
            <span>Cash on Delivery Fee</span>
            <span>{formatINR(codFee)}</span>
          </div>
        )}
        {order.tax > 0 && (
          <div className="flex justify-between text-ink-soft">
            <span>Tax</span>
            <span>{formatINR(order.tax)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-ink/20 pt-2 font-serif text-lg text-ink">
          <span>Total</span>
          <span>{formatINR(order.total)}</span>
        </div>
      </div>

      <p className="mt-16 text-center text-xs text-ink-soft">
        Thank you for choosing {SITE.name}. {SITE.email}
      </p>
    </div>
  );
}
