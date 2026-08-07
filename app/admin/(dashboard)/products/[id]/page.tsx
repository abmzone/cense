import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProductForm } from "@/components/admin/product-form";
import type { Product } from "@/lib/types";

export const metadata: Metadata = { title: "Edit Product", robots: { index: false } };

export default async function EditProductPage({
  params,
}: PageProps<"/admin/products/[id]">) {
  const { id } = await params;
  const admin = createAdminClient();

  const { data } = await admin
    .from("products")
    .select("*, images:product_images(*), variants:product_variants(*)")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const product = {
    ...data,
    images: [...(data.images ?? [])].sort((a, b) => a.position - b.position),
    variants: data.variants ?? [],
  } as Product;

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Edit Product</h2>
      <div className="mt-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
