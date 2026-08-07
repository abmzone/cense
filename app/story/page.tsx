import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Cense recovers flowers offered at the Kamakhya Temple and transforms them into premium handcrafted incense.",
};

export default function StoryPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <PlaceholderImage
          alt="Dried temple flowers being sorted by hand"
          tone="floral"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <Container className="relative z-10 pb-20 pt-32 text-warm-white">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-warm-white/80">Our Story</p>
            <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-tight md:text-6xl">
              Where devotion becomes fragrance.
            </h1>
          </Reveal>
        </Container>
      </section>

      <section className="py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="font-serif text-2xl leading-relaxed text-ink md:text-3xl">
              Every morning at the Kamakhya Temple in Guwahati, thousands of flowers are
              offered in devotion — marigold, rose, jasmine. By evening, almost all of them
              are cleared away as waste.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 space-y-6 text-base leading-relaxed text-ink-soft">
              <p>
                It is an old pattern, repeated at temples across India: flowers offered with
                care, discarded within hours, left to decompose in landfills or rivers where
                they do more environmental harm than the devotion that produced them ever
                intended.
              </p>
              <p>
                Cense began with a question rather than a plan — what if those flowers had a
                second life? Working with a small collective of women across Assam, we now
                recover a portion of the flowers offered at Kamakhya, dry them by hand over
                several days, and grind them into a fine base. That base is blended with dhuna
                resin from the hills of Karbi Anglong, agarwood native to Assam, and essential
                oils drawn from across Assam and Meghalaya.
              </p>
              <p>
                The result is not a religious product, and we are careful to keep it that way.
                Cense is a fragrance house that happens to begin where devotion ends — treating
                what was offered with the same attention it was given the first time, and
                letting the story speak for itself rather than for any doctrine.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-off-white py-28">
        <Container className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
              An environmental problem, quietly solved.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Flower waste from temples is a significant, largely invisible environmental
              burden — decomposing organic matter that pollutes water bodies and adds to
              landfill volume across India. Recovering even a fraction of it for a genuinely
              useful, biodegradable product is a small but concrete act of diversion.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Continuity, not ceremony.</h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              We think of Cense as continuity rather than ceremony — the same flower, further
              along in its life, doing something useful instead of nothing at all. No verses,
              no rituals attached to the product itself. Just a fragrance shaped by where it
              came from.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 text-center">
        <Container>
          <Reveal>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Meet the collection.</h2>
            <ButtonLink href="/shop" className="mt-8">
              Shop Now
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
