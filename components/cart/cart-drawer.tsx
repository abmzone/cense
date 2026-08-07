"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart, cartSubtotal } from "@/lib/cart-store";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { QuantitySelector } from "@/components/shop/quantity-selector";
import { ButtonLink } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const subtotal = cartSubtotal(lines);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-ink/40"
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-serif text-xl text-ink">
                Your Bag ({lines.reduce((n, l) => n + l.quantity, 0)})
              </h2>
              <button
                aria-label="Close cart"
                onClick={close}
                className="text-ink-soft hover:text-maroon"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {lines.length === 0 ? (
                <p className="text-sm text-ink-soft">Your bag is empty.</p>
              ) : (
                <ul className="space-y-6">
                  {lines.map((line) => (
                    <li key={line.variantId} className="flex gap-4">
                      <div className="h-24 w-20 shrink-0">
                        <PlaceholderImage
                          src={line.image}
                          alt={line.name}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-serif text-base text-ink">{line.name}</p>
                            <p className="text-xs text-ink-soft">{line.variantLabel}</p>
                          </div>
                          <p className="whitespace-nowrap text-sm text-ink">
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
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-line px-6 py-6">
                <div className="mb-4 flex items-center justify-between text-sm text-ink-soft">
                  <span>Subtotal</span>
                  <span className="text-ink">{formatINR(subtotal)}</span>
                </div>
                <p className="mb-4 text-xs text-ink-soft">
                  Shipping and taxes calculated at checkout.
                </p>
                <ButtonLink href="/checkout" className="w-full" onClick={close}>
                  Checkout
                </ButtonLink>
                <Link
                  href="/cart"
                  onClick={close}
                  className="mt-3 block text-center text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
