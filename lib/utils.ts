import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { OrderStatus } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * "pending" on a COD order just means cash hasn't been collected yet, not
 * that anything failed or needs checking (unlike a pending Razorpay order)
 * — shown as "COD" instead so the two aren't mistaken for each other.
 */
export function orderStatusLabel(status: OrderStatus, paymentMethod: "razorpay" | "cod") {
  if (paymentMethod === "cod" && status === "pending") return "COD";
  return status;
}

export function formatINR(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}
