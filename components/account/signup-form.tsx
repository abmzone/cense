"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      router.push("/account");
      router.refresh();
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <p className="text-sm text-ink-soft">
        Check your email to confirm your account, then{" "}
        <Link href="/account/login" className="text-maroon underline underline-offset-4">
          sign in
        </Link>
        .
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h1 className="font-serif text-2xl text-ink">Create Account</h1>
      <input
        required
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none"
      />
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
        minLength={6}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none"
      />
      {error && <p className="text-sm text-maroon">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating account..." : "Create Account"}
      </Button>
      <p className="text-center text-xs text-ink-soft">
        Already have an account?{" "}
        <Link href="/account/login" className="underline underline-offset-4 hover:text-maroon">
          Sign in
        </Link>
      </p>
    </form>
  );
}
