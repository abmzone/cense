"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";

export interface AdminOrderRow {
  id: string;
  order_number: string;
  email: string;
  shipping_address: { full_name?: string } | null;
  status: OrderStatus;
  total: number;
  created_at: string;
  payment_method: "razorpay" | "cod";
}

const STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

// Razorpay orders are written as "pending" the moment checkout starts and
// should flip to "confirmed" within seconds of payment. One still sitting
// at "pending" past this age means the payment either never completed or
// the confirmation (client callback + webhook) never landed — worth a
// manual look rather than assuming it's just an abandoned cart.
const STUCK_THRESHOLD_MS = 20 * 60 * 1000;

function isStuck(order: AdminOrderRow) {
  return (
    order.payment_method === "razorpay" &&
    order.status === "pending" &&
    Date.now() - new Date(order.created_at).getTime() > STUCK_THRESHOLD_MS
  );
}

export function OrdersTable({ orders }: { orders: AdminOrderRow[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const stuckCount = useMemo(() => orders.filter(isStuck).length, [orders]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return orders.filter((order) => {
      const matchesSearch =
        !search ||
        order.order_number.toLowerCase().includes(term) ||
        order.email.toLowerCase().includes(term) ||
        (order.shipping_address?.full_name ?? "").toLowerCase().includes(term);
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  function exportCsv() {
    const header = ["Order Number", "Email", "Status", "Total", "Date"];
    const rows = filtered.map((o) => [
      o.order_number,
      o.email,
      o.status,
      (o.total / 100).toFixed(2),
      new Date(o.created_at).toISOString(),
    ]);
    const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cense-orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {stuckCount > 0 && (
        <div className="mb-4 border border-maroon/40 bg-maroon/5 px-4 py-3 text-sm text-maroon">
          ⚠ {stuckCount} Razorpay {stuckCount === 1 ? "order has" : "orders have"} been stuck on
          &ldquo;pending&rdquo; for over 20 minutes — check whether payment actually went through
          before assuming it&apos;s an abandoned cart.
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <input
          placeholder="Search order number, name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "all")}
          className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={exportCsv}
          className="ml-auto border border-ink/30 px-4 py-2 text-xs uppercase tracking-widest text-ink hover:border-maroon hover:text-maroon"
        >
          Export CSV
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-widest text-ink-soft">
              <th className="pb-3">Order</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Total</th>
              <th className="pb-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr
                key={order.id}
                className={`border-b border-line ${isStuck(order) ? "bg-maroon/5" : ""}`}
              >
                <td className="py-3">
                  <Link href={`/admin/orders/${order.id}`} className="text-ink hover:text-maroon">
                    {order.order_number}
                  </Link>
                </td>
                <td className="py-3 text-ink-soft">
                  {order.shipping_address?.full_name || order.email}
                </td>
                <td className="py-3 capitalize text-ink-soft">
                  {order.status}
                  {isStuck(order) && <span className="ml-2 text-maroon">⚠ stuck</span>}
                </td>
                <td className="py-3 text-right text-ink">{formatINR(order.total)}</td>
                <td className="py-3 text-right text-ink-soft">
                  {new Date(order.created_at).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-ink-soft">
                  No orders match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
