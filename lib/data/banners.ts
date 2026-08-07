import { createClient } from "@/lib/supabase/server";
import type { Banner } from "@/lib/types";

const FALLBACK_HOME_HERO: Banner = {
  id: "fallback-home-hero",
  key: "home-hero",
  heading: "Where devotion becomes fragrance.",
  subheading: "Handcrafted incense from Assam, made from flowers offered at the Kamakhya Temple.",
  cta_label: "Shop Now",
  cta_href: "/shop",
  is_active: true,
};

export async function getBanner(key: string): Promise<Banner> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .eq("key", key)
      .eq("is_active", true)
      .single<Banner>();

    if (error || !data) throw error ?? new Error("Banner not found");
    return data;
  } catch {
    return key === "home-hero" ? FALLBACK_HOME_HERO : { ...FALLBACK_HOME_HERO, key };
  }
}
