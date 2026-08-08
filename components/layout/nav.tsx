"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { MAIN_NAV, SITE } from "@/lib/constants";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lines = useCart((s) => s.lines);
  const openCart = useCart((s) => s.open);
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-warm-white/90 backdrop-blur border-b border-line"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-editorial flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.15em] text-ink"
        >
          {SITE.name.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-ink-soft transition-colors hover:text-maroon"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            aria-label={`Open cart, ${itemCount} items`}
            onClick={openCart}
            className="relative text-ink-soft transition-colors hover:text-maroon"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon px-1 text-[10px] leading-none text-warm-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            aria-label="Toggle menu"
            className="text-ink-soft md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-line bg-warm-white px-6 pb-6 pt-2 md:hidden">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm tracking-wide text-ink-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
