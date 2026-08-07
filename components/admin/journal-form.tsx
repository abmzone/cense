"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { JournalPost } from "@/lib/types";

export function JournalForm({ post }: { post?: JournalPost }) {
  const router = useRouter();
  const isEdit = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImage, setCoverImage] = useState(post?.cover_image ?? "");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(post?.seo_description ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      title,
      slug,
      excerpt,
      content,
      cover_image: coverImage || null,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
    };

    const res = await fetch(isEdit ? `/api/admin/journal/${post!.id}` : "/api/admin/journal", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error ?? "Could not save post.");
      return;
    }
    router.push("/admin/journal");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
        />
        <input
          required
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
        />
      </div>
      <textarea
        placeholder="Excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        rows={2}
        className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      <textarea
        placeholder="Content (paragraphs separated by a blank line)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      <input
        placeholder="Cover image URL (optional)"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      <input
        placeholder="SEO title"
        value={seoTitle}
        onChange={(e) => setSeoTitle(e.target.value)}
        className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      <textarea
        placeholder="SEO description"
        value={seoDescription}
        onChange={(e) => setSeoDescription(e.target.value)}
        rows={2}
        className="w-full border border-ink/20 bg-transparent px-3 py-2 text-sm focus:border-maroon focus:outline-none"
      />
      {error && <p className="text-sm text-maroon">{error}</p>}
      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : isEdit ? "Save Post" : "Publish Post"}
      </Button>
    </form>
  );
}
