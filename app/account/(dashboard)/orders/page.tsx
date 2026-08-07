import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = { title: "Order History", robots: { index: false } };

export default async function AccountOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, status, total, created_at, order_items(product_name, variant_label, quantity)")
    .order("created_at", { ascending: false });

  if (!orders || orders.length === 0) {
    return <p className="text-sm text-ink-soft">You haven&apos;t placed any orders yet.</p>;
  }

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order.id} className="border border-line p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-serif text-lg text-ink">{order.order_number}</p>
              <p className="text-xs text-ink-soft">
                {new Date(order.created_at).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm capitalize text-ink">{order.status}</p>
              <p className="text-sm text-ink-soft">{formatINR(order.total)}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-1 border-t border-line pt-4 text-sm text-ink-soft">
            {order.order_items?.map((item, i) => (
              <li key={i}>
                {item.product_name} ({item.variant_label}) &times; {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
