"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function onSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
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
