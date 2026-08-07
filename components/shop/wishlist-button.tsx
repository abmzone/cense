"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function WishlistButton({ productId }: { productId: string }) {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null | undefined>(undefined);
  const [wishlistId, setWishlistId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("wishlists")
      .select("id")
      .eq("product_id", productId)
      .maybeSingle()
      .then(({ data }) => setWishlistId(data?.id ?? null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (userId === undefined) return null;

  if (userId === null) {
    return (
      <Link
        href="/account/login"
        className="mt-4 inline-flex items-center gap-2 text-xs text-ink-soft underline underline-offset-4 hover:text-maroon"
      >
        <Heart size={16} strokeWidth={1.5} />
        Sign in to save to wishlist
      </Link>
    );
  }

  async function toggle() {
    if (wishlistId) {
      await supabase.from("wishlists").delete().eq("id", wishlistId);
      setWishlistId(null);
    } else {
      const { data } = await supabase
        .from("wishlists")
        .insert({ product_id: productId, user_id: userId })
        .select("id")
        .single();
      setWishlistId(data?.id ?? null);
    }
  }

  return (
    <button
      onClick={toggle}
      className="mt-4 inline-flex items-center gap-2 text-xs text-ink-soft hover:text-maroon"
    >
      <Heart
        size={16}
        strokeWidth={1.5}
        className={cn(wishlistId && "fill-maroon text-maroon")}
      />
      {wishlistId ? "Saved to wishlist" : "Save to wishlist"}
    </button>
  );
}
