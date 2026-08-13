import type { Faq, JournalPost, Settings } from "../types";

export const FALLBACK_JOURNAL_POSTS: JournalPost[] = [
  {
    id: "post-1",
    slug: "second-life-of-temple-flowers",
    title: "From an Offering to a Fragrance",
    excerpt:
      "Every day, flowers are offered at the Kamakhya Temple as acts of devotion. Here is how a part of their story travels beyond the temple.",
    content:
      "There's a particular hour at Kamakhya, just after sunrise, when the walk up to the temple is already crowded — not with tourists yet, but with people who come every single day. Flower sellers arranging hibiscus into small woven baskets. Someone ringing a bell somewhere out of sight. The smell of the previous night's incense still hanging in the stone corridors. We've stood in that crowd more mornings than we can count, and it never quite stops feeling like the start of something, even though for the temple it's simply Tuesday.\n\nHibiscus, marigold, rose, jasmine — these are offered by the thousands, every day, as acts of devotion that have nothing to do with us. That's important to say plainly, because it would be easy to romanticise it otherwise. People come to Kamakhya for reasons that are theirs alone. We're not part of that moment. We arrive after it.\n\nWhat happens next is the part we do get to be involved in. After their ritual journey, a portion of these flowers is carefully collected rather than left behind. They're dried by hand, over several days, spread out and turned so they don't clump or mould — a slower process than it sounds, and one that a small collective of women artisans in Assam has gotten quietly excellent at. Once dry, the petals are ground into a fine base and blended with dhuna resin carried down from the hills of Karbi Anglong, and agarwood that's native to this part of the country. Nothing synthetic gets added at any point. It's a slow way to make something, but it's the only way we've found that keeps the flowers recognisable in the finished stick — not just as an ingredient, but as the actual thing they were.\n\nCense started with a question more than a plan: what if the spirit of a place could be carried home in a scent, the way a photograph carries a moment? Assam has a particular smell to it that's hard to describe to anyone who hasn't spent time here — wet stone, resin, something floral underneath all of it. We wanted to bottle that, and Kamakhya felt like the right place to start, given how much of the temple's daily life already runs on flowers and fire.\n\nWe want to be careful here, because this isn't a religious product and we don't want to imply otherwise. We're not claiming that a Cense stick carries divine energy, or that burning one does anything more than fill a room with a fragrance we happen to think is worth your time. What we are saying is that the flowers themselves travel — from an act of devotion at the temple, through a few quiet days of drying and grinding in Assam, into a box, and eventually onto a shelf or a windowsill in someone's home. The same flower, further along in its life, doing something useful with the time it has left.\n\nThat's also, incidentally, where the sustainability part of this story sits — not at the front of it, but underneath. By collecting these flowers instead of letting them go to landfill, we keep a fair amount of organic material out of the waste stream. It's a real benefit, and we're glad it exists, but it was never the whole reason we started. The reason was closer to what's happening in the photo above: a single stick, in a plain wooden holder, on an ordinary table, with light coming through the window and smoke going somewhere it doesn't matter. Devotion, then distance, then a fragrance in someone's home. That's the whole arc, really. We just happened to be the ones who got to shape it.",
    cover_image: "/journal/offering-to-fragrance.jpg",
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
    cover_image: "/journal/why-charcoal-free.jpg",
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
