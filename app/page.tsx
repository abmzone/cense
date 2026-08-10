import { Flower2, HeartHandshake, Leaf, Sparkles, Droplet, ShieldCheck, PackageCheck, MapPin } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { ProductCard } from "@/components/shop/product-card";
import { WhyCenseCard } from "@/components/home/why-cense-card";
import { getProducts } from "@/lib/data/products";
import { getJournalPosts } from "@/lib/data/journal";
import { getBanner } from "@/lib/data/banners";

export const dynamic = "force-dynamic";

const WHY_CENSE = [
  { icon: HeartHandshake, title: "Handmade", description: "Hand-finished by women artisans in Assam, batch by batch." },
  { icon: Flower2, title: "Temple Flowers", description: "Flowers offered at the Kamakhya Temple, carried into every stick." },
  { icon: Leaf, title: "Natural Ingredients", description: "No synthetic fragrance oils — only resins, botanicals and natural binders." },
  { icon: Droplet, title: "Essential Oils", description: "Scented with essential oils drawn from Assam and Meghalaya." },
  { icon: Sparkles, title: "Charcoal Free", description: "A joss powder base, for a lighter, cleaner burn." },
  { icon: ShieldCheck, title: "Phthalate Free", description: "No phthalates, in the incense or the fragrance." },
  { icon: PackageCheck, title: "Small Batch", description: "Made in limited quantities, never mass-produced." },
  { icon: MapPin, title: "Made in Assam", description: "Sourced and crafted entirely within Northeast India." },
];

const INGREDIENT_HIGHLIGHTS = [
  { title: "Karbi Anglong Dhuna", description: "A resin harvested in the hills of Karbi Anglong, prized for its deep, smoky warmth." },
  { title: "Assam Agarwood", description: "Native agarwood, aged and ground for a fragrance that is quiet rather than loud." },
  { title: "Kamakhya Temple Flowers", description: "Rose, marigold and jasmine offered at Kamakhya, dried and carried into every stick." },
];

export default async function HomePage() {
  const [products, posts, heroBanner] = await Promise.all([
    getProducts(),
    getJournalPosts(),
    getBanner("home-hero"),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <PlaceholderImage
          src="/hero-temple-sunset.jpg"
          alt="A single incense stick burning beside temple flowers and a lit brass diya, with the Kamakhya Temple at sunset in the background"
          tone="woody"
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <Container className="relative z-10 pb-20 pt-40 text-warm-white">
          <Reveal margin="0px">
            <p className="text-xs uppercase tracking-[0.3em] text-warm-white/80">
              From Kamakhya, Assam
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-[clamp(1.875rem,1.1rem+3.2vw,3.25rem)] leading-[1.2] tracking-tight">
              {heroBanner.heading}
            </h1>
            {heroBanner.subheading && (
              <p className="mt-4 max-w-lg text-sm text-warm-white/80">{heroBanner.subheading}</p>
            )}
          </Reveal>
          <Reveal delay={0.1} margin="0px">
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink
                href={heroBanner.cta_href || "/shop"}
                variant="primary"
                className="border-warm-white bg-warm-white text-ink hover:bg-off-white"
              >
                {heroBanner.cta_label || "Shop Now"}
              </ButtonLink>
              <ButtonLink href="/story" variant="secondary" className="border-warm-white/60 text-warm-white hover:border-warm-white">
                Our Story
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Hero story */}
      <section className="py-28">
        <Container className="grid gap-12 md:grid-cols-2 md:gap-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Our Story</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-ink md:text-5xl">
              A fragrance born in Assam. A ritual brought home.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-ink-soft">
              Cense brings together the devotion of Kamakhya, the landscapes of Assam and the
              craft of its people — shaped into incense for everyday rituals at home.
            </p>
            <ButtonLink href="/story" variant="ghost" className="mt-6 px-0">
              Read the full story
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* Featured products */}
      <section className="py-28">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-4xl text-ink md:text-5xl">The Collection</h2>
              <ButtonLink href="/shop" variant="ghost" className="hidden px-0 md:inline-flex">
                View all
              </ButtonLink>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Cense */}
      <section className="bg-off-white py-28">
        <Container>
          <Reveal>
            <h2 className="max-w-lg font-serif text-4xl text-ink md:text-5xl">Why Cense</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
            {WHY_CENSE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <WhyCenseCard {...item} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Ingredients */}
      <section className="bg-maroon py-28 text-warm-white">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-warm-white/70">
              Essential Oils from Assam &amp; Meghalaya
            </p>
            <h2 className="mt-6 max-w-xl font-serif text-4xl md:text-5xl">
              Sourced entirely from Northeast India.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {INGREDIENT_HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06} className="border-t border-warm-white/25 pt-6">
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-white/75">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <ButtonLink
              href="/ingredients"
              variant="secondary"
              className="mt-14 border-warm-white/60 text-warm-white hover:border-warm-white"
            >
              Explore Ingredients
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* Journal teaser */}
      {posts.length > 0 && (
        <section className="py-28">
          <Container>
            <Reveal>
              <h2 className="font-serif text-4xl text-ink md:text-5xl">From the Journal</h2>
            </Reveal>
            <div className="mt-14 grid gap-10 md:grid-cols-2">
              {posts.slice(0, 2).map((post, i) => (
                <Reveal key={post.id} delay={i * 0.08}>
                  <Link href={`/journal/${post.slug}`} className="group block">
                    <div className="aspect-[16/10] w-full">
                      <PlaceholderImage
                        src={post.cover_image}
                        alt={post.title}
                        tone="neutral"
                        className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl text-ink">{post.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
