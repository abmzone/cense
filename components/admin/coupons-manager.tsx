"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Coupon } from "@/lib/types";

const EMPTY_FORM = {
  code: "",
  type: "percentage" as "percentage" | "flat",
  value: 10,
  min_order_value: 0,
  usage_limit: "" as number | "",
  expires_at: "",
  is_active: true,
};

export function CouponsManager({ coupons }: { coupons: Coupon[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        usage_limit: form.usage_limit === "" ? null : Number(form.usage_limit),
        expires_at: form.expires_at || null,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error ?? "Could not create coupon.");
      return;
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
    router.refresh();
  }

  async function toggleActive(coupon: Coupon) {
    await fetch(`/api/admin/coupons/${coupon.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !coupon.is_active }),
    });
    router.refresh();
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this coupon?")) return;
    await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-widest text-ink-soft">
              <th className="pb-3">Code</th>
              <th className="pb-3">Discount</th>
              <th className="pb-3">Used</th>
              <th className="pb-3">Expires</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b border-line">
                <td className="py-3 text-ink">{coupon.code}</td>
                <td className="py-3 text-ink-soft">
                  {coupon.type === "percentage" ? `${coupon.value}%` : `₹${coupon.value / 100}`}
                </td>
                <td className="py-3 text-ink-soft">
                  {coupon.used_count}
                  {coupon.usage_limit ? ` / ${coupon.usage_limit}` : ""}
                </td>
                <td className="py-3 text-ink-soft">
                  {coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString("en-IN") : "—"}
                </td>
                <td className="py-3 text-ink-soft">{coupon.is_active ? "Active" : "Disabled"}</td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => toggleActive(coupon)}
                    className="mr-4 text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
                  >
                    {coupon.is_active ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => onDelete(coupon.id)}
                    className="text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm ? (
        <form onSubmit={onSubmit} className="mt-8 grid gap-4 border border-line p-6 md:grid-cols-2">
          <input
            required
            placeholder="Code (e.g. WELCOME10)"
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as "percentage" | "flat" }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          >
            <option value="percentage">Percentage off</option>
            <option value="flat">Flat amount off (paise)</option>
          </select>
          <input
            type="number"
            required
            placeholder={form.type === "percentage" ? "Percent (e.g. 10)" : "Amount in paise"}
            value={form.value}
            onChange={(e) => setForm((f) => ({ ...f, value: Number(e.target.value) }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <input
            type="number"
            placeholder="Minimum order value (paise)"
            value={form.min_order_value}
            onChange={(e) => setForm((f) => ({ ...f, min_order_value: Number(e.target.value) }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <input
            type="number"
            placeholder="Usage limit (optional)"
            value={form.usage_limit}
            onChange={(e) => setForm((f) => ({ ...f, usage_limit: e.target.value === "" ? "" : Number(e.target.value) }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <input
            type="date"
            placeholder="Expiry date"
            value={form.expires_at}
            onChange={(e) => setForm((f) => ({ ...f, expires_at: e.target.value }))}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          {error && <p className="text-sm text-maroon md:col-span-2">{error}</p>}
          <div className="flex gap-3 md:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Create Coupon"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button type="button" variant="secondary" className="mt-6" onClick={() => setShowForm(true)}>
          New Coupon
        </Button>
      )}
    </div>
  );
}
