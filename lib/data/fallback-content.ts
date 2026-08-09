import type { Faq, JournalPost, Settings } from "../types";

export const FALLBACK_JOURNAL_POSTS: JournalPost[] = [
  {
    id: "post-1",
    slug: "second-life-of-temple-flowers",
    title: "From an Offering to a Fragrance",
    excerpt:
      "Every day, flowers are offered at the Kamakhya Temple as acts of devotion. Here is how a part of their story travels beyond the temple.",
    content:
      "Every day, flowers are offered at the Kamakhya Temple as acts of devotion — hibiscus, marigold, rose and jasmine. After their ritual journey, Cense carefully collects a portion of these flowers, dries them by hand, and grinds them into a base for incense — blended with dhuna resin from Karbi Anglong and agarwood native to Assam.\n\nCense began with a simple question: what if the spirit of a place could be experienced through fragrance? Working with a small collective of women artisans in Assam, we transform devotion into a scent that carries Kamakhya, and Assam, into the everyday rituals of a home.\n\nThe result isn't a religious product. It's a fragrance house that begins with devotion and ends at home, treating what was offered with the same care it was given the first time. By giving these flowers a second life, Cense also keeps valuable organic material from becoming waste — a quiet, secondary benefit of a process built around fragrance first.",
    cover_image: null,
    published_at: "2026-01-12T00:00:00.000Z",
    seo_title: "From an Offering to a Fragrance | Cense Journal",
    seo_description:
      "How Cense transforms flowers offered at the Kamakhya Temple into handcrafted incense, working with women artisans across Assam.",
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
  free_shipping_threshold: 49900,
  standard_shipping_fee: 8000,
  minimum_order_value: 15000,
  tax_rate_percent: 0,
  cod_enabled: false,
};
