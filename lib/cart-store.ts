"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "./types";

interface CartState {
  lines: CartLine[];
  couponCode: string | null;
  isOpen: boolean;
  addLine: (line: CartLine) => void;
  removeLine: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  applyCoupon: (code: string | null) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      couponCode: null,
      isOpen: false,
      addLine: (line) => {
        const existing = get().lines.find(
          (l) => l.variantId === line.variantId
        );
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.variantId === line.variantId
                ? { ...l, quantity: l.quantity + line.quantity }
                : l
            ),
            isOpen: true,
          });
        } else {
          set({ lines: [...get().lines, line], isOpen: true });
        }
      },
      removeLine: (variantId) =>
        set({ lines: get().lines.filter((l) => l.variantId !== variantId) }),
      updateQuantity: (variantId, quantity) =>
        set({
          lines:
            quantity <= 0
              ? get().lines.filter((l) => l.variantId !== variantId)
              : get().lines.map((l) =>
                  l.variantId === variantId ? { ...l, quantity } : l
                ),
        }),
      applyCoupon: (code) => set({ couponCode: code }),
      clear: () => set({ lines: [], couponCode: null }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    { name: "cense-cart" }
  )
);

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
}
