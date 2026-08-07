import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client for server-only admin operations (bypasses RLS).
 * Never import this into client components or expose the key to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
