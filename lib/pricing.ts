import { createAdminClient } from "./supabase/admin";
import { getSettings } from "./data/settings";
import { getShippingRate } from "./delhivery";

export interface PricedLine {
  productId: string;
  variantId: string;
  productName: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  weightGrams: number;
}

export interface OrderTotals {
  resolvedLines: PricedLine[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  couponCode: string | null;
}

/**
 * Recomputes cart pricing entirely from trusted server-side data (current
 * variant price, active coupon, settings) — never from client-submitted
 * totals — so a tampered client request can't change what gets charged.
 */
export async function computeOrderTotals(
  lines: { variantId: string; quantity: number }[],
  couponCode?: string | null,
  shipping?: { destinationPincode?: string; paymentMode?: "Prepaid" | "COD" }
): Promise<OrderTotals> {
  const admin = createAdminClient();

  const variantIds = [...new Set(lines.map((l) => l.variantId))];
  const { data: variants, error } = await admin
    .from("product_variants")
    .select("id, price, label, weight_grams, product_id, products(name)")
    .in("id", variantIds);

  if (error || !variants || variants.length === 0) {
    throw new Error("Could not resolve cart items");
  }

  const resolvedLines: PricedLine[] = lines.map((line) => {
    const variant = variants.find((v) => v.id === line.variantId);
    if (!variant) throw new Error(`Unknown product variant: ${line.variantId}`);

    const productName = Array.isArray(variant.products)
      ? variant.products[0]?.name
      : (variant.products as { name: string } | null)?.name;

    return {
      productId: variant.product_id,
      variantId: variant.id,
      productName: productName ?? "Product",
      variantLabel: variant.label,
      unitPrice: variant.price,
      weightGrams: variant.weight_grams,
      quantity: Math.max(1, Math.min(10, line.quantity)),
    };
  });

  const subtotal = resolvedLines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);

  let discount = 0;
  let appliedCouponCode: string | null = null;

  if (couponCode) {
    const { data: coupon } = await admin
      .from("coupons")
      .select("*")
      .eq("code", couponCode.trim().toUpperCase())
      .eq("is_active", true)
      .maybeSingle();

    if (
      coupon &&
      (!coupon.expires_at || new Date(coupon.expires_at) > new Date()) &&
      (coupon.usage_limit === null || coupon.used_count < coupon.usage_limit) &&
      subtotal >= coupon.min_order_value
    ) {
      discount =
        coupon.type === "percentage"
          ? Math.round((subtotal * coupon.value) / 100)
          : Math.min(coupon.value, subtotal);
      appliedCouponCode = coupon.code;
    }
  }

  const COURIER_BOX_FEE_PAISE = 1500; // ₹15, added to whatever rate is used, to cover packaging

  const settings = await getSettings();
  const taxableAmount = subtotal - discount;

  let shippingFee = 0;

  if (taxableAmount < settings.free_shipping_threshold) {
    shippingFee = settings.standard_shipping_fee;

    if (shipping?.destinationPincode) {
      const totalWeightGrams = resolvedLines.reduce(
        (sum, l) => sum + l.weightGrams * l.quantity,
        0
      );
      const rate = await getShippingRate({
        destinationPincode: shipping.destinationPincode,
        weightGrams: totalWeightGrams,
        paymentMode: shipping.paymentMode ?? "Prepaid",
      });
      // Falls back to the flat rate if Delhivery's rate lookup fails or the
      // pincode isn't recognised — checkout should never block on this.
      if (rate.ok && rate.amountPaise != null) {
        shippingFee = rate.amountPaise;
      }
    }

    // Courier box cost on top, then floor at the configured minimum —
    // shipping should never come out cheaper than what it actually costs.
    shippingFee = Math.max(
      settings.minimum_shipping_fee,
      shippingFee + COURIER_BOX_FEE_PAISE
    );
  }

  const tax = Math.round((taxableAmount * settings.tax_rate_percent) / 100);
  const total = taxableAmount + shippingFee + tax;

  return {
    resolvedLines,
    subtotal,
    discount,
    shippingFee,
    tax,
    total,
    couponCode: appliedCouponCode,
  };
}
