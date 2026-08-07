import { createClient } from "@/lib/supabase/server";
import { FALLBACK_JOURNAL_POSTS } from "./fallback-content";
import type { JournalPost } from "@/lib/types";

export async function getJournalPosts(): Promise<JournalPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("journal_posts")
      .select("*")
      .order("published_at", { ascending: false })
      .returns<JournalPost[]>();

    if (error || !data || data.length === 0) {
      throw error ?? new Error("No journal posts returned");
    }
    return data;
  } catch {
    return FALLBACK_JOURNAL_POSTS;
  }
}

export async function getJournalPost(slug: string): Promise<JournalPost | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("journal_posts")
      .select("*")
      .eq("slug", slug)
      .single<JournalPost>();

    if (error || !data) throw error ?? new Error("Post not found");
    return data;
  } catch {
    return FALLBACK_JOURNAL_POSTS.find((p) => p.slug === slug) ?? null;
  }
}
