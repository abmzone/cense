"use client";

import { useRouter } from "next/navigation";

export function DeleteJournalButton({ postId }: { postId: string }) {
  const router = useRouter();

  async function onDelete() {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/journal/${postId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={onDelete} className="text-xs text-ink-soft underline underline-offset-4 hover:text-maroon">
      Delete
    </button>
  );
}
