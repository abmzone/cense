"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-store";
import { QuantitySelector } from "@/components/shop/quantity-selector";
import { Button } from "@/components/ui/button";
import { formatINR, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const addLine = useCart((s) => s.addLine);
  const open = useCart((s) => s.open);
  const router = useRouter();

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  if (!variant) return null;

  function lineForCart() {
    return {
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      name: product.name,
      variantLabel: variant.label,
      unitPrice: variant.price,
      quantity,
      image: product.images[0]?.url ?? null,
    };
  }

  function handleAddToCart() {
    addLine(lineForCart());
    open();
  }

  function handleBuyNow() {
    addLine(lineForCart());
    router.push("/checkout");
  }

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <p className="font-serif text-3xl text-ink">{formatINR(variant.price)}</p>
        {variant.compare_at_price && (
          <p className="text-sm text-ink-soft line-through">
            {formatINR(variant.compare_at_price)}
          </p>
        )}
      </div>

      <div className="mt-8">
        <p className="text-xs uppercase tracking-widest text-ink-soft">Size</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariantId(v.id)}
              className={cn(
                "border px-4 py-2 text-sm transition-colors",
                v.id === variant.id
                  ? "border-maroon text-maroon"
                  : "border-ink/20 text-ink-soft hover:border-ink/50"
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-line py-6 text-sm">
        <div>
          <dt className="text-ink-soft">Sticks</dt>
          <dd className="mt-1 text-ink">{variant.label}</dd>
        </div>
        <div>
          <dt className="text-ink-soft">Burn Time</dt>
          <dd className="mt-1 text-ink">~{variant.burn_time_minutes} min / stick</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <QuantitySelector quantity={quantity} onChange={setQuantity} />
        <Button variant="secondary" onClick={handleAddToCart} className="flex-1">
          Add to Cart
        </Button>
      </div>
      <Button onClick={handleBuyNow} className="mt-4 w-full">
        Buy Now
      </Button>

      {variant.stock <= 5 && variant.stock > 0 && (
        <p className="mt-4 text-xs text-terracotta">Only {variant.stock} left in stock.</p>
      )}
      {variant.stock === 0 && (
        <p className="mt-4 text-xs text-maroon">Currently out of stock.</p>
      )}
    </div>
  );
}
