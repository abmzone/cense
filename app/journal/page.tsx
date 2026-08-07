import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { getJournalPosts } from "@/lib/data/journal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on craft, sustainability and the story behind Cense.",
};

export default async function JournalPage() {
  const posts = await getJournalPosts();

  return (
    <section className="py-28">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Journal</p>
          <h1 className="mt-6 max-w-xl font-serif text-5xl leading-tight text-ink md:text-6xl">
            Notes on craft and continuity.
          </h1>
        </Reveal>

        <div className="mt-20 grid gap-14 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="aspect-[16/10] w-full">
                  <PlaceholderImage
                    src={post.cover_image}
                    alt={post.title}
                    tone="neutral"
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-5 text-xs uppercase tracking-widest text-ink-soft">
                  {new Date(post.published_at).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-ink">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
