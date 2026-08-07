"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function onDelete() {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Could not delete product.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="inline-block">
      <button onClick={onDelete} className="text-xs text-ink-soft underline underline-offset-4 hover:text-maroon">
        Delete
      </button>
      {error && <p className="mt-1 text-xs text-maroon">{error}</p>}
    </div>
  );
}
