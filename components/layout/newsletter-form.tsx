"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="mt-4 text-sm text-maroon">You&apos;re on the list.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex border-b border-ink/30">
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-transparent py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap py-2 text-xs uppercase tracking-widest text-maroon disabled:opacity-50"
      >
        Subscribe
      </button>
      {status === "error" && (
        <p className="sr-only">Something went wrong, please try again.</p>
      )}
    </form>
  );
}
