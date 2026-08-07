import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

const VALID_STATUSES = ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled"];

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/orders/[id]/status">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status, trackingNumber } = await request.json();

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const update: Record<string, string> = {};
  if (status) update.status = status;
  if (trackingNumber !== undefined) update.tracking_number = trackingNumber;

  const { error } = await supabase.from("orders").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: "Could not update order" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
