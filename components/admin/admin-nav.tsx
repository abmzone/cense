"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Products", href: "/admin/products" },
  { label: "Inventory", href: "/admin/inventory" },
  { label: "Coupons", href: "/admin/coupons" },
  { label: "Banners", href: "/admin/banners" },
  { label: "Journal", href: "/admin/journal" },
  { label: "Customers", href: "/admin/customers" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 overflow-x-auto border-b border-line pb-4 md:flex-col md:gap-2 md:overflow-visible md:border-b-0 md:border-r md:pb-0 md:pr-8">
      {LINKS.map((link) => {
        const isActive = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "whitespace-nowrap text-sm",
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
