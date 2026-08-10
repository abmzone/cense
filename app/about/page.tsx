import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Cense brings the spirit of Kamakhya home — the devotion, the flowers, the fragrance, and the women artisans of Assam behind every stick.",
};

const PROCESS_STEPS = [
  {
    title: "Collected",
    image: "/process/collected-kamakhya-flowers.jpg",
    tone: "floral" as const,
    description:
      "Flowers offered at the Kamakhya Temple are carefully collected after their ritual journey, then dried by hand and blended with dhuna resin, agarwood and essential oils from Assam and Meghalaya.",
  },
  {
    title: "Handcrafted",
    image: "/process/shg-morigaon-handcraft.jpg",
    tone: "woody" as const,
    description:
      "A Self Help Group of women artisans in Morigaon, Assam hand-rolls and finishes every stick, in small batches.",
  },
  {
    title: "Packed",
    image: "/process/packed-warehouse-guwahati.jpg",
    tone: "neutral" as const,
    description:
      "Finished sticks are air-cured and packed at our warehouse in Guwahati, ready to bring the spirit of Kamakhya home.",
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
              Cense began with a simple idea: what if the spirit of a place could be experienced
              through fragrance?
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-base leading-relaxed text-ink-soft">
              At the heart of Cense is Kamakhya — one of Assam&rsquo;s most powerful places of
              devotion. Flowers offered at the temple form the beginning of our story. We
              carefully transform them into handcrafted incense, combining them with natural
              materials and fragrances inspired by the landscapes of Assam and the Northeast.
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Every fragrance we make is built on the same idea: devotion at the start, Assam
              throughout, and a scent that carries both into the everyday rituals of a home.
            </p>
            <ButtonLink href="/story" variant="ghost" className="mt-6 px-0">
              Read our full story
            </ButtonLink>
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
                alt="Women artisans hand-rolling incense sticks in a workshop in Assam"
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
        <Container className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
              Giving offerings another life.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Rather than letting flowers offered at Kamakhya go to waste, Cense repurposes a
              portion of them into fragrance — a small, factual by-product of a process built
              around devotion and craft, not a marketing claim.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Natural, by Design</h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Every stick is charcoal-free, built on a natural joss powder binder, with no
              synthetic fragrance oils or phthalates. Packaging favours paper and glass over
              plastic wherever possible.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
