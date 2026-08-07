import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { getFaqs } from "@/lib/data/faqs";
import type { Faq } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Shipping, returns, safety, burning instructions and ingredient questions, answered.",
};

const CATEGORY_LABELS: Record<Faq["category"], string> = {
  shipping: "Shipping",
  returns: "Returns",
  safety: "Safety",
  burning: "Burning Instructions",
  ingredients: "Ingredients",
};

export default async function FaqPage() {
  const faqs = await getFaqs();
  const categories = Object.keys(CATEGORY_LABELS) as Faq["category"][];

  return (
    <section className="py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">FAQ</p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-ink md:text-6xl">
            Questions, answered.
          </h1>
        </Reveal>

        <div className="mt-16 space-y-16">
          {categories.map((category) => {
            const items = faqs.filter((f) => f.category === category);
            if (items.length === 0) return null;
            return (
              <Reveal key={category}>
                <h2 className="font-serif text-2xl text-ink">{CATEGORY_LABELS[category]}</h2>
                <div className="mt-6">
                  <FaqAccordion faqs={items} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
