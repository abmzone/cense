import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { BannersManager } from "@/components/admin/banners-manager";

export const metadata: Metadata = { title: "Banners", robots: { index: false } };

export default async function AdminBannersPage() {
  const admin = createAdminClient();
  const { data: banners } = await admin.from("banners").select("*").order("key");

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Homepage Banners</h2>
      <p className="mt-2 text-sm text-ink-soft">
        The <code>home-hero</code> banner controls the homepage hero heading, subheading and CTA.
      </p>
      <div className="mt-6">
        <BannersManager banners={banners ?? []} />
      </div>
    </div>
  );
}
