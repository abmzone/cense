import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-maroon text-warm-white hover:bg-maroon-deep border border-maroon",
  secondary:
    "bg-transparent text-ink border border-ink/30 hover:border-ink",
  ghost: "bg-transparent text-ink underline underline-offset-4 hover:text-maroon",
};

const BASE =
  "inline-flex items-center justify-center gap-2 px-7 py-3 text-sm tracking-wide uppercase transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  className?: string;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(BASE, VARIANT_CLASSES[variant], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  onClick,
}: CommonProps & {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(BASE, VARIANT_CLASSES[variant], className)}
    >
      {children}
    </Link>
  );
}
