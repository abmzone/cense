import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { OrdersTable } from "@/components/admin/orders-table";

export const metadata: Metadata = { title: "Orders", robots: { index: false } };

export default async function AdminOrdersPage() {
  const admin = createAdminClient();
  const { data: orders } = await admin
    .from("orders")
    .select("id, order_number, email, shipping_address, status, total, created_at, payment_method")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Orders</h2>
      <div className="mt-6">
        <OrdersTable orders={orders ?? []} />
      </div>
    </div>
  );
}
