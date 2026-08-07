import Link from "next/link";
import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = { title: "Products", robots: { index: false } };

export default async function AdminProductsPage() {
  const admin = createAdminClient();
  const { data: products } = await admin
    .from("products")
    .select("id, name, slug, collection, is_active, product_variants(price, stock)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">Products</h2>
        <Link
          href="/admin/products/new"
          className="border border-ink/30 px-4 py-2 text-xs uppercase tracking-widest text-ink hover:border-maroon hover:text-maroon"
        >
          New Product
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-widest text-ink-soft">
              <th className="pb-3">Name</th>
              <th className="pb-3">Collection</th>
              <th className="pb-3">From</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              const minPrice = Math.min(...(product.product_variants?.map((v) => v.price) ?? [0]));
              return (
                <tr key={product.id} className="border-b border-line">
                  <td className="py-3 text-ink">{product.name}</td>
                  <td className="py-3 capitalize text-ink-soft">{product.collection}</td>
                  <td className="py-3 text-ink-soft">{formatINR(minPrice)}</td>
                  <td className="py-3 text-ink-soft">{product.is_active ? "Active" : "Hidden"}</td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="mr-4 text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton productId={product.id} />
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
