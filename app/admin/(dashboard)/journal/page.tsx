import Link from "next/link";
import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { DeleteJournalButton } from "@/components/admin/delete-journal-button";

export const metadata: Metadata = { title: "Journal", robots: { index: false } };

export default async function AdminJournalPage() {
  const admin = createAdminClient();
  const { data: posts } = await admin
    .from("journal_posts")
    .select("id, title, slug, published_at")
    .order("published_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">Journal</h2>
        <Link
          href="/admin/journal/new"
          className="border border-ink/30 px-4 py-2 text-xs uppercase tracking-widest text-ink hover:border-maroon hover:text-maroon"
        >
          New Post
        </Link>
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
        {posts?.map((post) => (
          <li key={post.id} className="flex items-center justify-between py-3">
            <span className="text-ink">{post.title}</span>
            <div className="flex items-center gap-4">
              <span className="text-ink-soft">
                {new Date(post.published_at).toLocaleDateString("en-IN")}
              </span>
              <Link
                href={`/admin/journal/${post.id}`}
                className="text-ink-soft underline underline-offset-4 hover:text-maroon"
              >
                Edit
              </Link>
              <DeleteJournalButton postId={post.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
