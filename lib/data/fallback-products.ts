import type { Product } from "../types";

/**
 * Local fallback content — mirrors supabase/seed.sql. Used only when a
 * product query to Supabase fails (e.g. no project configured yet), so the
 * storefront is still fully browsable during local setup and review.
 */
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "where-the-flowers-rested",
    name: "Where the Flowers Rested",
    tagline: "Floral · Soft · Devotional",
    description:
      "The fragrance of devotion. Rose, hibiscus and jasmine offered at the Kamakhya Temple, carried into a soft floral incense blended with Karbi Anglong dhuna and Assam agarwood.",
    story:
      "Every morning, hibiscus, marigolds, roses and jasmine are offered at the Kamakhya Temple as acts of devotion. Where the Flowers Rested carries a part of that offering forward — the same petals, dried and reground by hand, folded into a fragrance that lets the ritual travel beyond the temple.",
    fragrance_notes: ["Hibiscus", "Rose", "Jasmine", "Temple flowers", "Soft musk"],
    ingredients: [
      "Reclaimed temple flowers (hibiscus, rose, marigold, jasmine)",
      "Karbi Anglong dhuna resin",
      "Assam agarwood powder",
      "Natural essential oils",
      "Bamboo core",
      "Joss powder binder",
    ],
    directions:
      "Light the tip until it glows, then gently blow out the flame. Rest the stick in a heat-safe holder and allow the fragrance to settle in a ventilated room.",
    collection: "floral",
    is_active: true,
    seo_title: "Where the Flowers Rested — Temple Flower Incense | Cense",
    seo_description:
      "A soft floral incense handcrafted from flowers offered at the Kamakhya Temple, blended with Assam agarwood and Karbi Anglong dhuna.",
    tags: ["floral", "temple-flowers", "bestseller"],
    images: [
      {
        id: "img-1-1",
        product_id: "00000000-0000-0000-0000-000000000001",
        url: "https://fpivffbugbajnoygqnur.supabase.co/storage/v1/object/public/product-images/where-the-flowers-rested-1.jpg",
        alt: "Where the Flowers Rested incense box and sticks on a bed of rose, hibiscus, marigold and jasmine petals",
        position: 0,
      },
    ],
    variants: [
      {
        id: "var-1-40",
        product_id: "00000000-0000-0000-0000-000000000001",
        label: "20 sticks",
        weight_grams: 40,
        burn_time_minutes: 45,
        price: 8500,
        compare_at_price: null,
        stock: 120,
        sku: "CENSE-WFR-40",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "rain-meets-the-grass",
    name: "Rain Meets the Grass",
    tagline: "Fresh · Green · Monsoon",
    description:
      "The scent of an Assam monsoon. Fresh lemongrass, rain-washed earth and green botanicals, capturing the moment before the rains break over the valley.",
    story:
      "There is a particular smell that arrives just before the monsoon breaks over the Brahmaputra valley — wet earth, cut grass, the first rain on warm stone. Rain Meets the Grass is our attempt to hold onto that moment a little longer than the weather allows.",
    fragrance_notes: ["Lemongrass", "Rain-washed earth", "Green grass", "Monsoon petrichor"],
    ingredients: [
      "Lemongrass essential oil",
      "Vetiver root",
      "Natural petrichor accord",
      "Assam agarwood powder",
      "Bamboo core",
      "Joss powder binder",
    ],
    directions:
      "Light the tip until it glows, then gently blow out the flame. Rest the stick in a heat-safe holder and allow the fragrance to settle in a ventilated room.",
    collection: "fresh",
    is_active: true,
    seo_title: "Rain Meets the Grass — Fresh Monsoon Incense | Cense",
    seo_description:
      "A fresh lemongrass and rain-washed incense inspired by the monsoon across Assam and Meghalaya, handcrafted in small batches.",
    tags: ["fresh", "monsoon"],
    images: [
      {
        id: "img-2-1",
        product_id: "00000000-0000-0000-0000-000000000002",
        url: "https://fpivffbugbajnoygqnur.supabase.co/storage/v1/object/public/product-images/rain-meets-the-grass-1.jpg",
        alt: "Rain Meets the Grass incense box and sticks on rain-wet grass with butterfly pea and jasmine flowers",
        position: 0,
      },
    ],
    variants: [
      {
        id: "var-2-40",
        product_id: "00000000-0000-0000-0000-000000000002",
        label: "20 sticks",
        weight_grams: 40,
        burn_time_minutes: 40,
        price: 8500,
        compare_at_price: null,
        stock: 100,
        sku: "CENSE-RMG-40",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    slug: "into-the-forest",
    name: "Into the Forest",
    tagline: "Woody · Resinous · Deep",
    description:
      "The deep fragrance of Assam's forests. Native agarwood and resinous dhuna, unhurried and quiet, drawn from the forests of the Northeast.",
    story:
      "Assam's forests carry a scent of their own — resin, damp bark, and agarwood trees that have stood for generations. Into the Forest draws on Karbi Anglong dhuna and native agarwood to bring that depth indoors, unhurried and quiet.",
    fragrance_notes: ["Agarwood", "Dhuna resin", "Forest floor", "Eucalyptus"],
    ingredients: [
      "Assam agarwood",
      "Karbi Anglong dhuna resin",
      "Eucalyptus essential oil",
      "Natural essential oils",
      "Bamboo core",
      "Joss powder binder",
    ],
    directions:
      "Light the tip until it glows, then gently blow out the flame. Rest the stick in a heat-safe holder and allow the fragrance to settle in a ventilated room.",
    collection: "woody",
    is_active: true,
    seo_title: "Into the Forest — Assam Agarwood & Dhuna Incense | Cense",
    seo_description:
      "A deep woody incense blending Assam agarwood, Karbi Anglong dhuna and eucalyptus, handcrafted in small batches by rural women in Assam.",
    tags: ["woody", "agarwood"],
    images: [
      {
        id: "img-3-1",
        product_id: "00000000-0000-0000-0000-000000000003",
        url: "https://fpivffbugbajnoygqnur.supabase.co/storage/v1/object/public/product-images/into-the-forest-1.jpg",
        alt: "Into the Forest incense box and sticks resting on a moss-covered log in a forest",
        position: 0,
      },
    ],
    variants: [
      {
        id: "var-3-40",
        product_id: "00000000-0000-0000-0000-000000000003",
        label: "20 sticks",
        weight_grams: 40,
        burn_time_minutes: 50,
        price: 8500,
        compare_at_price: null,
        stock: 90,
        sku: "CENSE-ITF-40",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    slug: "the-complete-collection",
    name: "The Complete Collection",
    tagline: "Three fragrances · One landscape",
    description:
      "Bring the full Cense experience home. One 20-stick box of each fragrance — Where the Flowers Rested, Rain Meets the Grass, and Into the Forest — together in one set.",
    story:
      "Some mornings call for hibiscus and rose. Some call for rain on warm stone. Some call for the quiet of a forest. The Complete Collection is for when you are not sure which — one box of each, so the choice can wait until the moment asks for it.",
    fragrance_notes: ["Hibiscus & Rose", "Lemongrass & Rain", "Agarwood & Dhuna"],
    ingredients: [
      "Reclaimed temple flowers (hibiscus, rose, marigold, jasmine)",
      "Lemongrass, citronella, vetiver and patchouli essential oils",
      "Assam agarwood",
      "Karbi Anglong dhuna resin",
      "Bamboo core",
      "Joss powder binder",
    ],
    directions:
      "Light the tip until it glows, then gently blow out the flame. Rest the stick in a heat-safe holder and allow the fragrance to settle in a ventilated room.",
    collection: "combo",
    is_active: true,
    seo_title: "The Complete Collection — All Three Cense Fragrances | Cense",
    seo_description:
      "One box each of Where the Flowers Rested, Rain Meets the Grass, and Into the Forest — the full Cense range in one set.",
    tags: ["combo", "gift-set", "bestseller"],
    images: [
      {
        id: "img-4-1",
        product_id: "00000000-0000-0000-0000-000000000004",
        url: "https://fpivffbugbajnoygqnur.supabase.co/storage/v1/object/public/product-images/complete-collection-1.jpg",
        alt: "All three Cense incense boxes stacked together with loose sticks and a holder",
        position: 0,
      },
    ],
    variants: [
      {
        id: "var-4-set",
        product_id: "00000000-0000-0000-0000-000000000004",
        label: "20 x 3 sticks",
        weight_grams: 120,
        burn_time_minutes: 45,
        price: 23000,
        compare_at_price: 25500,
        stock: 50,
        sku: "CENSE-COMBO-SET",
      },
    ],
  },
];
