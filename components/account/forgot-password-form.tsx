"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-sm text-ink-soft">
        If an account exists for {email}, a password reset link has been sent.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h1 className="font-serif text-2xl text-ink">Reset Password</h1>
      <p className="text-sm text-ink-soft">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none"
      />
      {error && <p className="text-sm text-maroon">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>
      <p className="text-center text-xs text-ink-soft">
        <Link href="/account/login" className="underline underline-offset-4 hover:text-maroon">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
