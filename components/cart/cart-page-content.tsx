"use client";

import { useState } from "react";
import { useCart, cartSubtotal } from "@/lib/cart-store";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { QuantitySelector } from "@/components/shop/quantity-selector";
import { ButtonLink } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

export function CartPageContent() {
  const lines = useCart((s) => s.lines);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const couponCode = useCart((s) => s.couponCode);
  const applyCoupon = useCart((s) => s.applyCoupon);

  const [couponInput, setCouponInput] = useState(couponCode ?? "");
  const [couponStatus, setCouponStatus] = useState<{ message: string; valid: boolean } | null>(
    null
  );
  const [discount, setDiscount] = useState(0);

  const subtotal = cartSubtotal(lines);

  async function onApplyCoupon() {
    if (!couponInput.trim()) return;
    const res = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponInput, subtotal }),
    });
    const data = await res.json();
    setCouponStatus({ message: data.message, valid: data.valid });
    if (data.valid) {
      applyCoupon(data.code);
      setDiscount(data.discount);
    } else {
      applyCoupon(null);
      setDiscount(0);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-ink-soft">Your bag is empty.</p>
        <ButtonLink href="/shop" className="mt-8 inline-flex">
          Continue Shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-16 md:grid-cols-[1.6fr_1fr]">
      <ul className="divide-y divide-line">
        {lines.map((line) => (
          <li key={line.variantId} className="flex gap-6 py-8 first:pt-0">
            <div className="h-32 w-28 shrink-0">
              <PlaceholderImage src={line.image} alt={line.name} className="h-full w-full" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-serif text-xl text-ink">{line.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{line.variantLabel}</p>
                </div>
                <p className="whitespace-nowrap text-ink">
                  {formatINR(line.unitPrice * line.quantity)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <QuantitySelector
                  quantity={line.quantity}
                  onChange={(q) => updateQuantity(line.variantId, q)}
                />
                <button
                  onClick={() => removeLine(line.variantId)}
                  className="text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="h-fit border border-line p-8">
        <h2 className="font-serif text-xl text-ink">Order Summary</h2>

        <div className="mt-6 flex gap-2">
          <input
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="Coupon code"
            className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <button
            onClick={onApplyCoupon}
            className="whitespace-nowrap border border-ink/30 px-4 text-xs uppercase tracking-widest text-ink hover:border-maroon hover:text-maroon"
          >
            Apply
          </button>
        </div>
        {couponStatus && (
          <p className={`mt-2 text-xs ${couponStatus.valid ? "text-maroon" : "text-ink-soft"}`}>
            {couponStatus.message}
          </p>
        )}

        <div className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span className="text-ink">{formatINR(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-ink-soft">
              <span>Discount</span>
              <span className="text-maroon">-{formatINR(discount)}</span>
            </div>
          )}
          <p className="text-xs text-ink-soft">Shipping and taxes calculated at checkout.</p>
        </div>

        <ButtonLink href="/checkout" className="mt-6 w-full">
          Proceed to Checkout
        </ButtonLink>
      </div>
    </div>
  );
}
