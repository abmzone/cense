"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { formatINR } from "@/lib/utils";

interface WishlistProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  collection: "floral" | "fresh" | "woody";
  product_images: { url: string; alt: string }[];
  product_variants: { price: number }[];
}

interface WishlistRow {
  id: string;
  product_id: string;
  products: WishlistProduct | WishlistProduct[] | null;
}

export function WishlistList() {
  const supabase = createClient();
  const [rows, setRows] = useState<WishlistRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const { data } = await supabase
      .from("wishlists")
      .select("id, product_id, products(id, slug, name, tagline, collection, product_images(url, alt), product_variants(price))");
    setRows((data as unknown as WishlistRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onRemove(id: string) {
    await supabase.from("wishlists").delete().eq("id", id);
    refresh();
  }

  if (loading) return null;
  if (rows.length === 0) {
    return <p className="text-sm text-ink-soft">Your wishlist is empty.</p>;
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) => {
        const product = Array.isArray(row.products) ? row.products[0] : row.products;
        if (!product) return null;
        const price = product.product_variants[0]?.price ?? 0;
        return (
          <li key={row.id}>
            <Link href={`/shop/${product.slug}`} className="block">
              <div className="aspect-square w-full">
                <PlaceholderImage
                  src={product.product_images[0]?.url}
                  alt={product.product_images[0]?.alt ?? product.name}
                  tone={product.collection}
                  label={product.name}
                  className="h-full w-full"
                />
              </div>
              <p className="mt-3 font-serif text-lg text-ink">{product.name}</p>
              <p className="text-sm text-ink-soft">from {formatINR(price)}</p>
            </Link>
            <button
              onClick={() => onRemove(row.id)}
              className="mt-2 text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
            >
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
}
