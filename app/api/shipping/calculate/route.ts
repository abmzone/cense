import { NextResponse } from "next/server";
import { computeOrderTotals } from "@/lib/pricing";
import { getSettings } from "@/lib/data/settings";

export async function POST(request: Request) {
  const { lines, couponCode, postalCode, paymentMode } = await request.json();

  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  try {
    const [totals, settings] = await Promise.all([
      computeOrderTotals(lines, couponCode, {
        destinationPincode: postalCode,
        paymentMode: paymentMode === "COD" ? "COD" : "Prepaid",
      }),
      getSettings(),
    ]);

    return NextResponse.json({
      fee: totals.shippingFee,
      tax: totals.tax,
      discount: totals.discount,
      total: totals.total,
      freeShippingThreshold: settings.free_shipping_threshold,
      taxRatePercent: settings.tax_rate_percent,
      codEnabled: settings.cod_enabled,
    });
  } catch {
    return NextResponse.json({ error: "Could not calculate shipping" }, { status: 400 });
  }
}
