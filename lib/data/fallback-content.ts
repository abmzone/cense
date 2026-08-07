import type { Faq, JournalPost, Settings } from "../types";

export const FALLBACK_JOURNAL_POSTS: JournalPost[] = [
  {
    id: "post-1",
    slug: "second-life-of-temple-flowers",
    title: "The Second Life of Temple Flowers",
    excerpt:
      "Every day, tonnes of flowers are offered at temples across India and cleared away as waste by evening. Here is what happens when they aren't.",
    content:
      "Every day, tonnes of flowers are offered at temples across India — and cleared away as waste by evening. At the Kamakhya Temple, that means marigold, rose and jasmine, gathered in baskets and taken to the river or the landfill within hours of being offered.\n\nCense began with a simple question: what if those flowers had a second life? Working with a small collective of women in Assam, we now recover a portion of these temple flowers, dry them by hand, and grind them into a base for incense — blended with dhuna resin from Karbi Anglong and agarwood native to the region.\n\nThe result isn't a religious product. It's a fragrance house that happens to start where devotion ends, treating what was offered with the same care it was given the first time.",
    cover_image: null,
    published_at: "2026-01-12T00:00:00.000Z",
    seo_title: "The Second Life of Temple Flowers | Cense Journal",
    seo_description:
      "How Cense recovers flowers offered at the Kamakhya Temple and transforms them into premium incense, working with rural women across Assam.",
  },
  {
    id: "post-2",
    slug: "why-charcoal-free-matters",
    title: "Why We Don't Use Charcoal",
    excerpt:
      "Most conventional incense relies on charcoal as a base — cheap, fast-burning, and heavy with smoke. Here's why we chose otherwise.",
    content:
      "Most conventional incense relies on charcoal as a combustible base — it's cheap, burns predictably, and is heavy with smoke. Cense uses a joss powder and natural binder base instead, built around reclaimed temple flowers, dhuna resin and essential oils.\n\nThe difference shows in the burn: a slower release, a lighter smoke, and a scent that reads closer to the raw materials themselves rather than a charcoal aftertaste layered on top.",
    cover_image: null,
    published_at: "2026-02-03T00:00:00.000Z",
    seo_title: "Why Cense Is Charcoal-Free | Cense Journal",
    seo_description:
      "Cense incense is built on a joss powder and natural binder base instead of charcoal — here is why that matters for scent and for smoke.",
  },
];

export const FALLBACK_FAQS: Faq[] = [
  {
    id: "faq-1",
    category: "shipping",
    question: "Where do you ship, and how long does delivery take?",
    answer:
      "We currently ship across India. Orders are dispatched within 1-2 business days and typically arrive within 4-7 business days depending on your location.",
    position: 0,
  },
  {
    id: "faq-2",
    category: "shipping",
    question: "Is shipping free?",
    answer:
      "Shipping is free on orders above the threshold shown at checkout. Below that, a flat shipping fee is calculated automatically at checkout.",
    position: 1,
  },
  {
    id: "faq-3",
    category: "returns",
    question: "Can I return or exchange an opened product?",
    answer:
      "As incense is a consumable product, we're unable to accept returns on opened packs. If your order arrives damaged or incorrect, contact us within 48 hours and we'll make it right.",
    position: 0,
  },
  {
    id: "faq-4",
    category: "safety",
    question: "Is Cense incense safe to burn indoors?",
    answer:
      "Yes, when used as directed. Always burn incense in a ventilated room, on a heat-safe holder, away from flammable materials, children and pets.",
    position: 0,
  },
  {
    id: "faq-5",
    category: "burning",
    question: "How do I get the best burn from a stick?",
    answer:
      "Light the tip until it glows orange, then gently blow out the flame — do not leave it burning with an open flame. Rest it in a heat-safe holder and let it burn undisturbed.",
    position: 0,
  },
  {
    id: "faq-6",
    category: "ingredients",
    question: "What is joss powder?",
    answer:
      "Joss powder is a natural plant-based binder that holds the incense paste together around the bamboo core. It contains no charcoal and no synthetic fillers.",
    position: 0,
  },
];

export const FALLBACK_SETTINGS: Settings = {
  free_shipping_threshold: 99900,
  standard_shipping_fee: 6900,
  tax_rate_percent: 5,
  cod_enabled: false,
};
