"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/account");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h1 className="font-serif text-2xl text-ink">Sign In</h1>
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none"
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none"
      />
      {error && <p className="text-sm text-maroon">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing in..." : "Sign In"}
      </Button>
      <div className="flex items-center justify-between text-xs text-ink-soft">
        <Link href="/account/forgot-password" className="underline underline-offset-4 hover:text-maroon">
          Forgot password?
        </Link>
        <Link href="/account/signup" className="underline underline-offset-4 hover:text-maroon">
          Create an account
        </Link>
      </div>
    </form>
  );
}
