import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { ButtonLink } from "@/components/ui/button";
import { PROCESS_STEPS } from "@/lib/process-steps";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Cense brings the spirit of Kamakhya home — the devotion, the flowers, the fragrance, the process, and the women artisans of Assam behind every stick.",
};

export default function StoryPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <PlaceholderImage
          src="/story/early-experiments.jpg"
          alt="An early Cense experiment — hand-rolled incense sticks standing in a wooden holder on a home dining table"
          tone="floral"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <Container className="relative z-10 pb-20 pt-32 text-warm-white">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-warm-white/80">Our Story</p>
            <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-tight md:text-6xl">
              From an offering to a fragrance.
            </h1>
          </Reveal>
        </Container>
      </section>

      <section className="py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="font-serif text-2xl leading-relaxed text-ink md:text-3xl">
              Cense began with a simple idea: what if the spirit of a place could be experienced
              through fragrance? Every day, flowers are offered at the Kamakhya Temple as acts of
              devotion. After their ritual journey, these flowers are carefully collected and
              transformed into incense — allowing a part of their story to travel beyond the
              temple.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 space-y-6 text-base leading-relaxed text-ink-soft">
              <p>
                It started small — spare flowers collected from Kamakhya, and a lot of
                evenings spent experimenting at a home dining table. Long before there was a
                collective or a proper process, there was trial and error: drying petals,
                grinding them by hand, rolling sticks that did not always hold together, and
                lighting one after another to see what actually worked. Cense grew out of that
                experimenting, not the other way around.
              </p>
              <p>
                Working with a small collective of women artisans across Assam, we gather a
                portion of the hibiscus, marigold, rose and jasmine offered each day at
                Kamakhya, dry them by hand over several days, and grind them into a fine base.
                That base is blended with dhuna resin from the hills of Karbi Anglong, agarwood
                native to Assam, and essential oils drawn from across Assam and Meghalaya.
              </p>
              <p>
                Cense is not a religious product, and we are careful to keep it that way. It is
                a fragrance house that begins with devotion and ends at home — treating what was
                offered at the temple with the same attention it was given the first time, and
                letting the fragrance carry that spirit rather than any doctrine.
              </p>
              <p>
                By giving these flowers a second life, Cense also keeps valuable organic material
                from becoming waste — a quiet, secondary benefit of a process built around
                fragrance first.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-off-white py-28">
        <Container className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Rooted in Assam.</h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Kamakhya gives Cense its starting point, but Assam gives it its character — dhuna
              resin from Karbi Anglong, native agarwood, and essential oils drawn from the
              landscapes of the Northeast. Every fragrance carries a sense of place alongside a
              sense of devotion.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Continuity, not ceremony.</h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              We think of Cense as continuity rather than ceremony — the same flower, further
              along in its life, carrying its story into a home instead of ending at the temple.
              No verses, no rituals attached to the product itself. Just a fragrance shaped by
              where it came from.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-28">
        <Container>
          <Reveal>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Our Process</h2>
          </Reveal>
          <ol className="mt-14 grid gap-12 md:grid-cols-3">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06} as="li">
                <div className="aspect-[4/5] w-full">
                  <PlaceholderImage
                    src={step.image}
                    alt={step.title}
                    tone={step.tone}
                    label={step.image ? undefined : step.title}
                    className="h-full w-full"
                  />
                </div>
                <span className="mt-5 block font-serif text-2xl text-terracotta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-maroon py-28 text-warm-white">
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/3]">
              <PlaceholderImage
                src="/story/hand-rolled-drying.jpg"
                alt="Freshly hand-rolled Cense incense sticks laid out to dry on a rack"
                tone="woody"
                className="h-full w-full"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs uppercase tracking-[0.3em] text-warm-white/70">
              Made By Hand
            </p>
            <h2 className="mt-6 font-serif text-3xl md:text-4xl">
              Made by hand. Made to matter.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-warm-white/80">
              Each Cense stick is hand-finished by women artisans in Assam. By working with
              Self Help Groups, we support skilled hands, create meaningful local livelihoods
              and keep traditional making at the heart of every box.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-off-white py-24">
        <Container className="max-w-2xl">
          <Reveal>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Natural, by Design</h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Every stick is charcoal-free, built on a natural joss powder binder, with no
              synthetic fragrance oils or phthalates. Packaging favours paper and glass over
              plastic wherever possible.
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
