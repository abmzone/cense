import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { code, subtotal } = await request.json();

  if (typeof code !== "string" || !code.trim() || typeof subtotal !== "number") {
    return NextResponse.json({ valid: false, message: "Enter a coupon code." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: coupon } = await admin
    .from("coupons")
    .select("*")
    .eq("code", code.trim().toUpperCase())
    .eq("is_active", true)
    .maybeSingle();

  if (!coupon) {
    return NextResponse.json({ valid: false, message: "Invalid coupon code." });
  }
  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, message: "This coupon has expired." });
  }
  if (coupon.usage_limit !== null && coupon.used_count >= coupon.usage_limit) {
    return NextResponse.json({ valid: false, message: "This coupon has reached its usage limit." });
  }
  if (subtotal < coupon.min_order_value) {
    return NextResponse.json({
      valid: false,
      message: "This coupon requires a higher order value.",
    });
  }

  const discount =
    coupon.type === "percentage"
      ? Math.round((subtotal * coupon.value) / 100)
      : Math.min(coupon.value, subtotal);

  return NextResponse.json({
    valid: true,
    discount,
    code: coupon.code,
    message: "Coupon applied.",
  });
}
