import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { IngredientAccordion, type Ingredient } from "@/components/ingredients/ingredient-accordion";

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "A fragrance map of the Northeast — Kamakhya temple flowers, Karbi Anglong dhuna, Assam agarwood, and essential oils from Assam & Meghalaya.",
};

const INGREDIENTS: Ingredient[] = [
  {
    title: "Temple Flowers",
    region: "Kamakhya",
    tone: "floral",
    description:
      "Rose, marigold and jasmine offered at the Kamakhya Temple, carefully collected after their ritual journey. Dried by hand over several days, then ground into the base of every Cense stick.",
  },
  {
    title: "Dhuna",
    region: "Karbi Anglong",
    tone: "woody",
    description:
      "Known as Dhuna in Assamese and Hijung in Karbi, this frankincense is the sap of Canarium resiniferum — a large tree native to Assam and Bangladesh that thrives in moist tropical forest. Harvesters make incisions in the trunk, releasing a clear, reddish sap that hardens into a brownish gum. Traditionally burned on its own for its warm, smoky character, we fold it into our blends for depth.",
  },
  {
    title: "Agarwood",
    region: "Assam",
    tone: "woody",
    description:
      "Native agarwood, aged and ground to a fine powder. It carries a fragrance that is deep without being heavy — the backbone of our woodier blends.",
  },
  {
    title: "Essential Oils",
    region: "Assam & Meghalaya",
    tone: "fresh",
    description:
      "Lemongrass, citronella, vetiver and patchouli, sourced from farms across Assam and Meghalaya — no synthetic fragrance oils are used in any Cense product.",
  },
  {
    title: "Joss Powder",
    region: "Natural Materials",
    tone: "neutral",
    description:
      "A natural, plant-based binder that holds the incense paste around its bamboo core — our charcoal-free alternative to conventional incense bases.",
  },
  {
    title: "Traditional Craft",
    tone: "neutral",
    description:
      "Every stick is hand-rolled by women artisans across Assam, using techniques passed down rather than mechanised production lines.",
  },
];

export default function IngredientsPage() {
  return (
    <section className="py-28">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Ingredients</p>
          <h1 className="mt-6 max-w-xl font-serif text-5xl leading-tight text-ink md:text-6xl">
            Rooted in the Northeast.
          </h1>
        </Reveal>

        <div className="mt-20">
          <IngredientAccordion ingredients={INGREDIENTS} />
        </div>
      </Container>
    </section>
  );
}
