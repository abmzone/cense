import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cense's mission, process, and the women's collective across Assam behind every batch.",
};

const PROCESS_STEPS = [
  {
    title: "Recovery",
    description:
      "Flowers offered at the Kamakhya Temple are collected before they are discarded as waste.",
  },
  {
    title: "Drying",
    description:
      "Petals are hand-sorted and sun-dried over several days, then ground into a fine base powder.",
  },
  {
    title: "Blending",
    description:
      "The flower base is blended with dhuna resin, agarwood and essential oils from Assam and Meghalaya.",
  },
  {
    title: "Rolling",
    description:
      "Each stick is hand-rolled onto a bamboo core by our collective of women artisans in small batches.",
  },
  {
    title: "Curing & Packing",
    description:
      "Sticks are air-cured to stabilise the fragrance, then packed with plastic-conscious materials.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">About Cense</p>
            <h1 className="mt-6 font-serif text-5xl leading-tight text-ink md:text-6xl">
              A fragrance house rooted in Assam.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-base leading-relaxed text-ink-soft">
              Cense makes premium handcrafted incense from flowers offered at the Kamakhya
              Temple, blended with natural ingredients sourced across Northeast India. We
              exist to prove that devotion, craft and design can share the same shelf.
            </p>
            <ButtonLink href="/story" variant="ghost" className="mt-6 px-0">
              Read our full story
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <section className="bg-off-white py-24">
        <Container className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Our Mission</h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              To divert temple flower waste into a genuinely premium product, made by rural
              women in Assam, using only natural ingredients — proving that sustainable and
              luxurious are not opposites.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Sustainability</h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Every stick is charcoal-free, built on a natural joss powder binder. Packaging
              favours paper and glass over plastic wherever possible, and our supply chain
              stays within Assam and Meghalaya to keep transport emissions low.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-28">
        <Container>
          <Reveal>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Our Process</h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-5">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05} as="li">
                <span className="font-serif text-3xl text-terracotta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-lg text-ink">{step.title}</h3>
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
                alt="Women artisans hand-rolling incense sticks in a workshop in Assam"
                tone="woody"
                className="h-full w-full"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs uppercase tracking-[0.3em] text-warm-white/70">
              Meet the Women
            </p>
            <h2 className="mt-6 font-serif text-3xl md:text-4xl">
              Every batch is hand-rolled by a collective of women across Assam.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-warm-white/80">
              Cense works with a growing collective of rural women who dry, grind and roll
              every stick by hand. Fair, consistent work close to home — building a livelihood
              around a craft rather than a factory line.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
