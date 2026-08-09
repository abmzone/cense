"use client";

import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  async function onSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <button
      onClick={onSignOut}
      className="text-xs uppercase tracking-widest text-ink-soft underline underline-offset-4 hover:text-maroon"
    >
      Sign Out
    </button>
  );
}
