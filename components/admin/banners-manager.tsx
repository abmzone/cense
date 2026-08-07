"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Banner } from "@/lib/types";

function BannerForm({ banner, onSaved }: { banner: Banner; onSaved: () => void }) {
  const [form, setForm] = useState(banner);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: form.key,
        heading: form.heading,
        subheading: form.subheading,
        cta_label: form.cta_label,
        cta_href: form.cta_href,
        is_active: form.is_active,
      }),
    });
    setSaving(false);
    onSaved();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 border border-line p-6 md:grid-cols-2">
      <p className="text-xs uppercase tracking-widest text-ink-soft md:col-span-2">
        Key: {form.key}
      </p>
      <input
        placeholder="Heading"
        value={form.heading}
        onChange={(e) => setForm((f) => ({ ...f, heading: e.target.value }))}
        className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none md:col-span-2"
      />
      <input
        placeholder="Subheading"
        value={form.subheading}
        onChange={(e) => setForm((f) => ({ ...f, subheading: e.target.value }))}
        className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none md:col-span-2"
      />
      <input
        placeholder="CTA label"
        value={form.cta_label}
        onChange={(e) => setForm((f) => ({ ...f, cta_label: e.target.value }))}
        className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      <input
        placeholder="CTA link"
        value={form.cta_href}
        onChange={(e) => setForm((f) => ({ ...f, cta_href: e.target.value }))}
        className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      <label className="flex items-center gap-2 text-sm text-ink-soft md:col-span-2">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
        />
        Active
      </label>
      <Button type="submit" disabled={saving} className="md:col-span-2">
        {saving ? "Saving..." : "Save Banner"}
      </Button>
    </form>
  );
}

export function BannersManager({ banners }: { banners: Banner[] }) {
  const router = useRouter();
  const [addingNew, setAddingNew] = useState(false);
  const [newKey, setNewKey] = useState("");

  function refresh() {
    router.refresh();
  }

  return (
    <div className="space-y-8">
      {banners.map((banner) => (
        <BannerForm key={banner.key} banner={banner} onSaved={refresh} />
      ))}

      {addingNew ? (
        <BannerForm
          banner={{
            id: "",
            key: newKey,
            heading: "",
            subheading: "",
            cta_label: "",
            cta_href: "",
            is_active: true,
          }}
          onSaved={() => {
            setAddingNew(false);
            refresh();
          }}
        />
      ) : (
        <div className="flex items-center gap-3">
          <input
            placeholder="New banner key (e.g. shop-banner)"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
          <Button
            type="button"
            variant="secondary"
            disabled={!newKey.trim()}
            onClick={() => setAddingNew(true)}
          >
            Add Banner Slot
          </Button>
        </div>
      )}
    </div>
  );
}
