import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getProducts } from "@/lib/data/products";
import { getJournalPosts } from "@/lib/data/journal";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([getProducts(), getJournalPosts()]);

  const staticRoutes = [
    "",
    "/shop",
    "/story",
    "/ingredients",
    "/journal",
    "/contact",
    "/faq",
    "/policies/privacy",
    "/policies/terms",
    "/policies/refund",
    "/policies/shipping",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${SITE.url}/shop/${product.slug}`,
    lastModified: new Date(),
  }));

  const journalRoutes = posts.map((post) => ({
    url: `${SITE.url}/journal/${post.slug}`,
    lastModified: new Date(post.published_at),
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
