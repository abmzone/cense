import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatINR } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const admin = createAdminClient();

  const [{ data: orders }, { data: lowStock }] = await Promise.all([
    admin
      .from("orders")
      .select("id, order_number, email, status, total, created_at")
      .order("created_at", { ascending: false })
      .limit(200),
    admin
      .from("product_variants")
      .select("id, label, sku, stock, products(name)")
      .lte("stock", 10)
      .order("stock", { ascending: true }),
  ]);

  const revenue = (orders ?? [])
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const recentOrders = (orders ?? []).slice(0, 8);

  return (
    <div className="space-y-12">
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="border border-line p-6">
          <p className="text-xs uppercase tracking-widest text-ink-soft">Revenue</p>
          <p className="mt-2 font-serif text-3xl text-ink">{formatINR(revenue)}</p>
        </div>
        <div className="border border-line p-6">
          <p className="text-xs uppercase tracking-widest text-ink-soft">Orders</p>
          <p className="mt-2 font-serif text-3xl text-ink">{orders?.length ?? 0}</p>
        </div>
        <div className="border border-line p-6">
          <p className="text-xs uppercase tracking-widest text-ink-soft">Low Stock Variants</p>
          <p className="mt-2 font-serif text-3xl text-ink">{lowStock?.length ?? 0}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-ink">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs text-ink-soft underline underline-offset-4 hover:text-maroon">
            View all
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-widest text-ink-soft">
                <th className="pb-3">Order</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-line">
                  <td className="py-3">
                    <Link href={`/admin/orders/${order.id}`} className="text-ink hover:text-maroon">
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="py-3 text-ink-soft">{order.email}</td>
                  <td className="py-3 capitalize text-ink-soft">{order.status}</td>
                  <td className="py-3 text-right text-ink">{formatINR(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {lowStock && lowStock.length > 0 && (
        <div>
          <h2 className="font-serif text-xl text-ink">Low Inventory Alerts</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line text-sm">
            {lowStock.map((variant) => {
              const productName = Array.isArray(variant.products)
                ? variant.products[0]?.name
                : (variant.products as { name: string } | null)?.name;
              return (
                <li key={variant.id} className="flex items-center justify-between py-3">
                  <span className="text-ink">
                    {productName} — {variant.label} ({variant.sku})
                  </span>
                  <span className="text-maroon">{variant.stock} left</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
