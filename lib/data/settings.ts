import { createClient } from "@/lib/supabase/server";
import { FALLBACK_SETTINGS } from "./fallback-content";
import type { Settings } from "@/lib/types";

export async function getSettings(): Promise<Settings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("id", 1)
      .single<Settings>();

    if (error || !data) throw error ?? new Error("Settings not found");
    return data;
  } catch {
    return FALLBACK_SETTINGS;
  }
}
