"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface InventoryRow {
  id: string;
  label: string;
  sku: string;
  stock: number;
  productName: string;
}

export function InventoryManager({ rows }: { rows: InventoryRow[] }) {
  const router = useRouter();
  const [deltas, setDeltas] = useState<Record<string, string>>({});
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  async function onAdjust(variantId: string) {
    const delta = Number(deltas[variantId]);
    if (!delta) return;
    setSavingId(variantId);
    await fetch("/api/admin/inventory/adjust", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantId, delta, reason: reasons[variantId] ?? "" }),
    });
    setSavingId(null);
    setDeltas((d) => ({ ...d, [variantId]: "" }));
    router.refresh();
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-widest text-ink-soft">
            <th className="pb-3">Product</th>
            <th className="pb-3">Variant</th>
            <th className="pb-3">SKU</th>
            <th className="pb-3">Stock</th>
            <th className="pb-3">Adjust</th>
            <th className="pb-3">Reason</th>
            <th className="pb-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line">
              <td className="py-3 text-ink">{row.productName}</td>
              <td className="py-3 text-ink-soft">{row.label}</td>
              <td className="py-3 text-ink-soft">{row.sku}</td>
              <td className={`py-3 ${row.stock <= 10 ? "text-maroon" : "text-ink-soft"}`}>
                {row.stock}
              </td>
              <td className="py-3">
                <input
                  type="number"
                  placeholder="+/-"
                  value={deltas[row.id] ?? ""}
                  onChange={(e) => setDeltas((d) => ({ ...d, [row.id]: e.target.value }))}
                  className="w-20 border border-ink/20 bg-transparent px-2 py-1 text-sm focus:border-maroon focus:outline-none"
                />
              </td>
              <td className="py-3">
                <input
                  placeholder="Reason"
                  value={reasons[row.id] ?? ""}
                  onChange={(e) => setReasons((r) => ({ ...r, [row.id]: e.target.value }))}
                  className="w-32 border border-ink/20 bg-transparent px-2 py-1 text-sm focus:border-maroon focus:outline-none"
                />
              </td>
              <td className="py-3">
                <button
                  onClick={() => onAdjust(row.id)}
                  disabled={savingId === row.id}
                  className="text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
                >
                  Apply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
