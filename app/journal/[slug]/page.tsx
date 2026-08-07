import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { getJournalPost } from "@/lib/data/journal";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) return {};

  return {
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt,
    alternates: { canonical: `${SITE.url}/journal/${post.slug}` },
    openGraph: {
      title: post.seo_title ?? post.title,
      description: post.seo_description ?? post.excerpt,
      type: "article",
      publishedTime: post.published_at,
    },
  };
}

export default async function JournalPostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    author: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article className="py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-ink-soft">
            {new Date(post.published_at).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 aspect-[16/9] w-full">
            <PlaceholderImage src={post.cover_image} alt={post.title} tone="neutral" className="h-full w-full" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 space-y-6 text-base leading-relaxed text-ink-soft">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
