"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="font-serif text-xl text-ink">
        Thank you — we&apos;ll be in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="text-xs uppercase tracking-widest text-ink-soft">
          Name
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-2 text-ink focus:border-maroon focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-xs uppercase tracking-widest text-ink-soft">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-2 text-ink focus:border-maroon focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-widest text-ink-soft">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-2 text-ink focus:border-maroon focus:outline-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-maroon">Something went wrong. Please try again.</p>
      )}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
