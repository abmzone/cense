"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { OrderStatus } from "@/lib/types";
import { orderStatusLabel } from "@/lib/utils";

const STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

export function OrderStatusForm({
  orderId,
  currentStatus,
  currentTracking,
  paymentMethod,
}: {
  orderId: string;
  currentStatus: OrderStatus;
  currentTracking: string | null;
  paymentMethod: "razorpay" | "cod";
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [tracking, setTracking] = useState(currentTracking ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function onSave() {
    setSaving(true);
    setSaved(false);
    await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, trackingNumber: tracking }),
    });
    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="space-y-4 border border-line p-6">
      <div>
        <label className="text-xs uppercase tracking-widest text-ink-soft">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
          className="mt-2 w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {orderStatusLabel(s, paymentMethod)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs uppercase tracking-widest text-ink-soft">Tracking Number</label>
        <input
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
          placeholder="e.g. AWB1234567890"
          className="mt-2 w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
        />
      </div>
      <Button type="button" onClick={onSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
      {saved && <p className="text-xs text-maroon">Saved.</p>}
    </div>
  );
}
