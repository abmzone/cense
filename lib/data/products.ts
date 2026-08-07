import { createClient } from "@/lib/supabase/server";
import { FALLBACK_PRODUCTS } from "./fallback-products";
import type { Product, ProductImage, ProductVariant } from "@/lib/types";

type ProductRow = Omit<Product, "images" | "variants"> & {
  images: ProductImage[] | null;
  variants: ProductVariant[] | null;
};

function normalizeProduct(row: ProductRow): Product {
  return {
    ...row,
    images: [...(row.images ?? [])].sort((a, b) => a.position - b.position),
    variants: row.variants ?? [],
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, images:product_images(*), variants:product_variants(*)")
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .returns<ProductRow[]>();

    if (error || !data || data.length === 0) {
      throw error ?? new Error("No products returned");
    }

    return data.map(normalizeProduct);
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, images:product_images(*), variants:product_variants(*)")
      .eq("slug", slug)
      .eq("is_active", true)
      .single<ProductRow>();

    if (error || !data) throw error ?? new Error("Product not found");
    return normalizeProduct(data);
  } catch {
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}
