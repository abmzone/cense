"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Overview", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Wishlist", href: "/account/wishlist" },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 border-b border-line pb-4 md:flex-col md:gap-2 md:border-b-0 md:border-r md:pb-0 md:pr-8">
      {LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm",
              isActive ? "text-maroon" : "text-ink-soft hover:text-maroon"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
