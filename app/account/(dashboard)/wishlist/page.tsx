import type { Metadata } from "next";
import { WishlistList } from "@/components/account/wishlist-list";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return <WishlistList />;
}
