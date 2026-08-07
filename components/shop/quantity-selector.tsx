"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 10,
}: {
  quantity: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center border border-ink/30">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= min}
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className="flex h-11 w-11 items-center justify-center text-ink-soft transition-colors hover:text-maroon disabled:opacity-30"
      >
        <Minus size={16} strokeWidth={1.5} />
      </button>
      <span className="w-8 text-center text-sm text-ink" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className="flex h-11 w-11 items-center justify-center text-ink-soft transition-colors hover:text-maroon disabled:opacity-30"
      >
        <Plus size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}
