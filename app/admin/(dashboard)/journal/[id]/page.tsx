import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { JournalForm } from "@/components/admin/journal-form";

export const metadata: Metadata = { title: "Edit Journal Post", robots: { index: false } };

export default async function EditJournalPostPage({
  params,
}: PageProps<"/admin/journal/[id]">) {
  const { id } = await params;
  const admin = createAdminClient();
  const { data: post } = await admin.from("journal_posts").select("*").eq("id", id).single();

  if (!post) notFound();

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Edit Journal Post</h2>
      <div className="mt-6">
        <JournalForm post={post} />
      </div>
    </div>
  );
}
