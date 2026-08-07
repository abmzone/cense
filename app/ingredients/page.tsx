import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { IngredientAccordion, type Ingredient } from "@/components/ingredients/ingredient-accordion";

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "Temple flowers, Assam agarwood, Karbi Anglong dhuna, natural essential oils and joss powder — every ingredient behind Cense.",
};

const INGREDIENTS: Ingredient[] = [
  {
    title: "Temple Flowers",
    tone: "floral",
    description:
      "Rose, marigold and jasmine offered at the Kamakhya Temple, recovered before they become waste. Dried by hand over several days, then ground into the base of every Cense stick.",
  },
  {
    title: "Assam Agarwood",
    tone: "woody",
    description:
      "Native agarwood, aged and ground to a fine powder. It carries a fragrance that is deep without being heavy — the backbone of our woodier blends.",
  },
  {
    title: "Karbi Anglong Dhuna",
    tone: "woody",
    description:
      "A resin harvested in the hills of Karbi Anglong, traditionally burned on its own for its warm, smoky character. We fold it into our blends for depth.",
  },
  {
    title: "Natural Essential Oils",
    tone: "fresh",
    description:
      "Lemongrass, vetiver and other essential oils sourced from Assam and Meghalaya — no synthetic fragrance oils are used in any Cense product.",
  },
  {
    title: "Joss Powder",
    tone: "neutral",
    description:
      "A natural, plant-based binder that holds the incense paste around its bamboo core — our charcoal-free alternative to conventional incense bases.",
  },
  {
    title: "Traditional Craft",
    tone: "neutral",
    description:
      "Every stick is hand-rolled by a collective of women artisans across Assam, using techniques passed down rather than mechanised production lines.",
  },
];

export default function IngredientsPage() {
  return (
    <section className="py-28">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Ingredients</p>
          <h1 className="mt-6 max-w-xl font-serif text-5xl leading-tight text-ink md:text-6xl">
            What goes into every stick.
          </h1>
        </Reveal>

        <div className="mt-20">
          <IngredientAccordion ingredients={INGREDIENTS} />
        </div>
      </Container>
    </section>
  );
}
