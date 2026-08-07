import type { Metadata } from "next";
import { JournalForm } from "@/components/admin/journal-form";

export const metadata: Metadata = { title: "New Journal Post", robots: { index: false } };

export default function NewJournalPostPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">New Journal Post</h2>
      <div className="mt-6">
        <JournalForm />
      </div>
    </div>
  );
}
