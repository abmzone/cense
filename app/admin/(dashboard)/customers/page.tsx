import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Customers", robots: { index: false } };

export default async function AdminCustomersPage() {
  const admin = createAdminClient();
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, full_name, email, role, created_at")
    .order("created_at", { ascending: false });

  const { data: orders } = await admin.from("orders").select("user_id, total");
  const orderStats = new Map<string, { count: number; total: number }>();
  for (const order of orders ?? []) {
    if (!order.user_id) continue;
    const existing = orderStats.get(order.user_id) ?? { count: 0, total: 0 };
    orderStats.set(order.user_id, { count: existing.count + 1, total: existing.total + order.total });
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Customers</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-widest text-ink-soft">
              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Orders</th>
              <th className="pb-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((profile) => {
              const stats = orderStats.get(profile.id);
              return (
                <tr key={profile.id} className="border-b border-line">
                  <td className="py-3 text-ink">{profile.full_name || "—"}</td>
                  <td className="py-3 text-ink-soft">{profile.email}</td>
                  <td className="py-3 capitalize text-ink-soft">{profile.role}</td>
                  <td className="py-3 text-ink-soft">{stats?.count ?? 0}</td>
                  <td className="py-3 text-ink-soft">
                    {new Date(profile.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
