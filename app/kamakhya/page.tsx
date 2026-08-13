import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Story of Kamakhya",
  description:
    "The legend, history and living tradition behind the Kamakhya Temple in Assam — the hill Cense's fragrance begins with.",
};

const SECTIONS = [
  {
    title: "Where the Goddess Fell",
    body: "According to legend, Sati — the goddess in her first form — took her own life after her father, Daksha, humiliated her husband Shiva in front of the assembled gods. Wrecked with grief, Shiva carried her body across the universe, performing the Tandava, his cosmic dance of destruction, threatening to take creation down with him. To stop it, Vishnu stepped in and cut Sati's body into 51 pieces with his Sudarshan Chakra. Each piece fell somewhere across the subcontinent, and each of those spots became a Shakti Peetha — a seat of the goddess's power. Kamakhya marks where her yoni fell, which is also why there's no carved idol here. The temple's central object of worship is the yoni-shaped stone itself.",
  },
  {
    title: "Where Kamarupa Gets Its Name",
    body: "Kamakhya didn't just name a temple — it shaped an entire region. Legend has it that Kamadeva, the god of desire, had been cursed by Brahma and stripped of his physical form. He came to this hill, worshipped the goddess here, and got his rupa — his form — back. That's said to be the origin of Kamarupa, the old name for this region, and of Kamakhya itself, often read as \"she who is worshipped by Kama.\"",
  },
  {
    title: "Built, Broken, Rebuilt",
    body: "The temple's origin story starts with the Koch king Viswa Singha, who met an old woman on Nilachala Hill who revealed the site of the goddess and asked him to build her a temple of gold. His first attempts, in brick, kept failing — until the goddess appeared to him in a dream and reminded him of his promise. He mixed a little gold into the brickwork, and the temple was finally completed. That original structure didn't survive: some accounts point to the invader Kalapahar, others to a natural disaster. What stands on the hill today was rebuilt over those same ruins by King Naranarayan and his brother Chilarai.",
  },
  {
    title: "A Living Tantric Tradition",
    body: "Kamakhya appears in text as early as the Kalika Purana (roughly the 9th century), which describes this hill as where Shiva and Shakti met. Centuries later, the Yogini Tantra (roughly the 16th century) reframes the yoni not just as myth, but as a symbol of creation itself — the literal source of life. That idea still sits at the center of Kamakhya's identity, as one of the most significant sites of Shakti and Tantric worship in India.",
  },
  {
    title: "The Goddess Who Bleeds",
    body: "Every June, the temple closes for three days for Ambubachi — the period when the goddess is believed to undergo her menstrual cycle. It's one of the only major festivals anywhere that treats menstruation as sacred rather than something to hide, marking it as a symbol of fertility and the earth coming back to life. When the temple reopens, it draws one of the largest pilgrimages in Northeast India.",
  },
  {
    title: "One Hill, Every Kind of Devotion",
    body: "What sets Kamakhya apart is who shows up. Devotees arrive from the hills, the forests, the villages and the cities alike — no single community owns this place. It remains one of the most unifying pilgrimage sites in the region, and a living tradition rather than a relic.",
  },
];

export default function KamakhyaPage() {
  return (
    <>
      <section className="pb-12 pt-28 md:pt-36">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">About Kamakhya</p>
            <h1 className="mt-6 font-serif text-4xl leading-tight text-ink md:text-6xl">
              The Story of Kamakhya
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              Long before Cense existed, this hill in Assam was already one of the most
              significant places of worship in India. Here&rsquo;s the story — myth, history and
              all — of the goddess who gives Kamakhya its name.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <Reveal>
            <Image
              src="/kamakhya/temple-collage.jpg"
              alt="Illustrated collage of the Kamakhya Temple on Nilachala Hill, with palm trees, temple domes and floral motifs"
              width={1600}
              height={1066}
              className="h-auto w-full"
              priority
            />
          </Reveal>
        </Container>
      </section>

      {SECTIONS.map((section, i) => (
        <section key={section.title} className={i % 2 === 1 ? "bg-off-white py-20" : "py-20"}>
          <Container className="max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-2xl text-ink md:text-3xl">{section.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-ink-soft">{section.body}</p>
            </Reveal>
          </Container>
        </section>
      ))}

      <section className="py-24 text-center">
        <Container className="max-w-2xl">
          <Reveal>
            <p className="text-sm leading-relaxed text-ink-soft">
              We&rsquo;ve told this story the way it&rsquo;s been passed down — as legend and
              lived tradition, not as a claim about what happens when you light a stick of
              Cense. For that story,
            </p>
            <h2 className="mt-4 font-serif text-2xl text-ink md:text-3xl">
              see how Kamakhya shapes our fragrance.
            </h2>
            <ButtonLink href="/story" className="mt-8">
              Read Our Story
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
