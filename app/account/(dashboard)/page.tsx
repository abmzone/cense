import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { orderStatusLabel } from "@/lib/utils";

export default async function AccountOverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user?.id ?? "")
    .maybeSingle();

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("id, order_number, status, total, created_at, payment_method")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs uppercase tracking-widest text-ink-soft">Signed in as</p>
        <p className="mt-1 text-lg text-ink">{profile?.full_name || profile?.email}</p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-ink">Recent Orders</h2>
          <Link href="/account/orders" className="text-xs text-ink-soft underline underline-offset-4 hover:text-maroon">
            View all
          </Link>
        </div>
        {!recentOrders || recentOrders.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">You haven&apos;t placed any orders yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex items-center justify-between py-4 text-sm">
                <span className="text-ink">{order.order_number}</span>
                <span className="capitalize text-ink-soft">
                  {orderStatusLabel(order.status, order.payment_method)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
