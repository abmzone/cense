import { createClient } from "@/lib/supabase/server";
import { FALLBACK_FAQS } from "./fallback-content";
import type { Faq } from "@/lib/types";

export async function getFaqs(): Promise<Faq[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("category", { ascending: true })
      .order("position", { ascending: true })
      .returns<Faq[]>();

    if (error || !data || data.length === 0) {
      throw error ?? new Error("No FAQs returned");
    }
    return data;
  } catch {
    return FALLBACK_FAQS;
  }
}
