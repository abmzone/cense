import { NextResponse } from "next/server";
import { computeOrderTotals } from "@/lib/pricing";
import { checkPincodeServiceability } from "@/lib/delhivery";
import { getSettings } from "@/lib/data/settings";

export async function POST(request: Request) {
  const { lines, couponCode, postalCode, paymentMode } = await request.json();

  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  try {
    const [totals, settings] = await Promise.all([
      computeOrderTotals(lines, couponCode),
      getSettings(),
    ]);

    let serviceable: boolean | null = null;
    if (typeof postalCode === "string" && /^\d{6}$/.test(postalCode)) {
      const result = await checkPincodeServiceability(
        postalCode,
        paymentMode === "COD" ? "COD" : "Prepaid"
      );
      serviceable = result.serviceable;
    }

    return NextResponse.json({
      fee: totals.shippingFee,
      tax: totals.tax,
      discount: totals.discount,
      total: totals.total,
      freeShippingThreshold: settings.free_shipping_threshold,
      taxRatePercent: settings.tax_rate_percent,
      codEnabled: settings.cod_enabled,
      minimumOrderValue: totals.minimumOrderValue,
      belowMinimumOrder: totals.belowMinimumOrder,
      serviceable,
    });
  } catch {
    return NextResponse.json({ error: "Could not calculate shipping" }, { status: 400 });
  }
}
