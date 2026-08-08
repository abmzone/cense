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
    tagline: "Soft floral. Hibiscus, rose, jasmine, and the temple flowers themselves.",
    description:
      "Crafted from flowers offered at the Kamakhya Temple, blended with Karbi Anglong dhuna, Assam agarwood and essential oils from Assam & Meghalaya.",
    story:
      "Every morning, thousands of hibiscus, marigolds, roses and jasmine are offered at the Kamakhya Temple and, by evening, cleared away as waste. Where the Flowers Rested is our attempt to let that offering continue a little longer — the same petals, dried and reground by hand, folded back into a fragrance instead of a landfill.",
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
        url: "",
        alt: "Where the Flowers Rested incense sticks resting on dried temple flowers",
        position: 0,
      },
      {
        id: "img-1-2",
        product_id: "00000000-0000-0000-0000-000000000001",
        url: "",
        alt: "Close-up of rose and marigold petals used in Where the Flowers Rested",
        position: 1,
      },
    ],
    variants: [
      {
        id: "var-1-40",
        product_id: "00000000-0000-0000-0000-000000000001",
        label: "40g · 20 sticks",
        weight_grams: 40,
        burn_time_minutes: 45,
        price: 45000,
        compare_at_price: null,
        stock: 120,
        sku: "CENSE-WFR-40",
      },
      {
        id: "var-1-80",
        product_id: "00000000-0000-0000-0000-000000000001",
        label: "80g · 40 sticks",
        weight_grams: 80,
        burn_time_minutes: 45,
        price: 82000,
        compare_at_price: 90000,
        stock: 80,
        sku: "CENSE-WFR-80",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "rain-meets-the-grass",
    name: "Rain Meets the Grass",
    tagline: "Fresh. Lemongrass, rain, and green botanicals.",
    description:
      "Fresh lemongrass, rain-washed earth and green botanicals inspired by the monsoon across Northeast India.",
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
        url: "",
        alt: "Rain Meets the Grass incense sticks on a bed of wet green grass",
        position: 0,
      },
    ],
    variants: [
      {
        id: "var-2-40",
        product_id: "00000000-0000-0000-0000-000000000002",
        label: "40g · 20 sticks",
        weight_grams: 40,
        burn_time_minutes: 40,
        price: 42000,
        compare_at_price: null,
        stock: 100,
        sku: "CENSE-RMG-40",
      },
      {
        id: "var-2-80",
        product_id: "00000000-0000-0000-0000-000000000002",
        label: "80g · 40 sticks",
        weight_grams: 80,
        burn_time_minutes: 40,
        price: 78000,
        compare_at_price: null,
        stock: 60,
        sku: "CENSE-RMG-80",
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    slug: "into-the-forest",
    name: "Into the Forest",
    tagline: "Deep woody. Agarwood, dhuna, and forest floor.",
    description:
      "A deep woody blend inspired by the forests of Assam, resinous dhuna and native agarwood.",
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
        url: "",
        alt: "Into the Forest incense sticks beside agarwood chips and dhuna resin",
        position: 0,
      },
    ],
    variants: [
      {
        id: "var-3-40",
        product_id: "00000000-0000-0000-0000-000000000003",
        label: "40g · 20 sticks",
        weight_grams: 40,
        burn_time_minutes: 50,
        price: 48000,
        compare_at_price: null,
        stock: 90,
        sku: "CENSE-ITF-40",
      },
      {
        id: "var-3-80",
        product_id: "00000000-0000-0000-0000-000000000003",
        label: "80g · 40 sticks",
        weight_grams: 80,
        burn_time_minutes: 50,
        price: 88000,
        compare_at_price: null,
        stock: 55,
        sku: "CENSE-ITF-80",
      },
    ],
  },
];
