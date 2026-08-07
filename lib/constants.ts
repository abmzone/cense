export const SITE = {
  name: "Cense",
  domain: "cense.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cense.in",
  description:
    "Cense transforms flowers offered at the Kamakhya Temple into premium handcrafted incense, blended with natural ingredients from across Northeast India.",
  email: "hello@cense.in",
  phone: "+91 90000 00000",
  instagram: "https://instagram.com/cense.in",
  address: "Guwahati, Assam, India",
};

export const MAIN_NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Story", href: "/story" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV = {
  brand: [
    { label: "About", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/policies/privacy" },
    { label: "Terms of Service", href: "/policies/terms" },
    { label: "Refund Policy", href: "/policies/refund" },
    { label: "Shipping Policy", href: "/policies/shipping" },
  ],
};
