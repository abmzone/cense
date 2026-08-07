import { createClient } from "./supabase/server";

/**
 * Verifies the current request's session belongs to an admin profile.
 * Called at the top of every admin API route handler — proxy.ts gates
 * /admin/* pages, but API routes aren't covered by that matcher, so each
 * one re-checks authorization itself.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") return null;
  return user;
}
