import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { InventoryManager, type InventoryRow } from "@/components/admin/inventory-manager";

export const metadata: Metadata = { title: "Inventory", robots: { index: false } };

export default async function AdminInventoryPage() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("product_variants")
    .select("id, label, sku, stock, products(name)")
    .order("stock", { ascending: true });

  const rows: InventoryRow[] = (data ?? []).map((v) => ({
    id: v.id,
    label: v.label,
    sku: v.sku,
    stock: v.stock,
    productName: Array.isArray(v.products) ? v.products[0]?.name : (v.products as { name: string } | null)?.name ?? "",
  }));

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Inventory</h2>
      <p className="mt-2 text-sm text-ink-soft">
        Variants with 10 or fewer units in stock are highlighted.
      </p>
      <div className="mt-6">
        <InventoryManager rows={rows} />
      </div>
    </div>
  );
}
