"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const variant = product.variants[0];
  const cover = product.images[0];
  const addLine = useCart((s) => s.addLine);
  const open = useCart((s) => s.open);

  function handleAddToCart() {
    if (!variant) return;
    addLine({
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      name: product.name,
      variantLabel: variant.label,
      unitPrice: variant.price,
      quantity: 1,
      image: cover?.url ?? null,
    });
    open();
  }

  return (
    <div className="group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="aspect-[4/5] w-full">
          <PlaceholderImage
            src={cover?.url}
            alt={cover?.alt ?? product.name}
            tone={product.collection}
            label={product.name}
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl text-ink">{product.name}</h3>
            <p className="mt-1 text-sm text-ink-soft">{product.tagline}</p>
            {variant && <p className="mt-1 text-xs text-ink-soft/70">{variant.label}</p>}
          </div>
          {variant && (
            <p className="whitespace-nowrap text-sm text-ink">{formatINR(variant.price)}</p>
          )}
        </div>
      </Link>
      {variant && (
        <Button
          variant="secondary"
          onClick={handleAddToCart}
          className="mt-4 w-full py-2.5 text-xs"
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
}
