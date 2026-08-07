import { NextResponse } from "next/server";
import { getSettings } from "@/lib/data/settings";

export async function POST(request: Request) {
  const { subtotal } = await request.json();

  if (typeof subtotal !== "number" || subtotal < 0) {
    return NextResponse.json({ error: "Invalid subtotal" }, { status: 400 });
  }

  const settings = await getSettings();
  const fee = subtotal >= settings.free_shipping_threshold ? 0 : settings.standard_shipping_fee;

  return NextResponse.json({
    fee,
    freeShippingThreshold: settings.free_shipping_threshold,
    taxRatePercent: settings.tax_rate_percent,
    codEnabled: settings.cod_enabled,
  });
}
