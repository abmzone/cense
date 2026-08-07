import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { CouponsManager } from "@/components/admin/coupons-manager";

export const metadata: Metadata = { title: "Coupons", robots: { index: false } };

export default async function AdminCouponsPage() {
  const admin = createAdminClient();
  const { data: coupons } = await admin.from("coupons").select("*").order("code");

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Coupons</h2>
      <div className="mt-6">
        <CouponsManager coupons={coupons ?? []} />
      </div>
    </div>
  );
}
