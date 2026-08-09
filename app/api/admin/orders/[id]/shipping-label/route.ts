import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createShipment, getShippingLabel } from "@/lib/delhivery";

export async function POST(
  _request: Request,
  { params }: RouteContext<"/api/admin/orders/[id]/shipping-label">
) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();

  const { data: order } = await supabase.from("orders").select("*").eq("id", id).single();
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  let waybill = order.tracking_number as string | null;

  if (!waybill) {
    const { data: items } = await supabase
      .from("order_items")
      .select("quantity, variant_id, product_variants(weight_grams)")
      .eq("order_id", id);

    const totalWeight = (items ?? []).reduce((sum, item) => {
      const variant = Array.isArray(item.product_variants)
        ? item.product_variants[0]
        : (item.product_variants as { weight_grams: number } | null);
      return sum + (variant?.weight_grams ?? 40) * item.quantity;
    }, 0);
    const totalQuantity = (items ?? []).reduce((sum, item) => sum + item.quantity, 0);

    const address = order.shipping_address as Record<string, string>;

    const result = await createShipment({
      orderNumber: order.order_number,
      consignee: {
        name: address.full_name,
        phone: order.phone,
        address: [address.line1, address.line2].filter(Boolean).join(", "),
        city: address.city,
        state: address.state,
        pincode: address.postal_code,
      },
      paymentMode: order.payment_method === "cod" ? "COD" : "Prepaid",
      codAmount: order.total / 100,
      totalAmount: order.total / 100,
      weightGrams: totalWeight || 40,
      quantity: totalQuantity || 1,
    });

    if (!result.ok || !result.waybill) {
      return NextResponse.json(
        { error: result.error ?? "Could not create Delhivery shipment", raw: result.raw },
        { status: 502 }
      );
    }

    waybill = result.waybill;
    await supabase.from("orders").update({ tracking_number: waybill }).eq("id", id);
  }

  const label = await getShippingLabel(waybill);
  if (!label.ok) {
    return NextResponse.json(
      { error: "Shipment created but could not fetch the label", waybill, raw: label.raw },
      { status: 502 }
    );
  }

  return NextResponse.json({ waybill, label: label.raw });
}
