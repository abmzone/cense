import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { ProductPurchasePanel } from "@/components/shop/product-purchase-panel";
import { WishlistButton } from "@/components/shop/wishlist-button";
import { getProductBySlug } from "@/lib/data/products";
import { formatINR } from "@/lib/utils";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.seo_title ?? product.name,
    description: product.seo_description ?? product.description,
    alternates: { canonical: `${SITE.url}/shop/${product.slug}` },
    openGraph: {
      title: product.seo_title ?? product.name,
      description: product.seo_description ?? product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: SITE.name },
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      price: (v.price / 100).toFixed(2),
      priceCurrency: "INR",
      availability:
        v.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      sku: v.sku,
    })),
  };

  return (
    <section className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="grid gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div className="grid gap-4">
            <div className="aspect-[4/5] w-full">
              <PlaceholderImage
                src={product.images[0]?.url}
                alt={product.images[0]?.alt ?? product.name}
                tone={product.collection}
                label={product.name}
                className="h-full w-full"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {product.images.slice(1).map((image) => (
                  <div key={image.id} className="aspect-square w-full">
                    <PlaceholderImage
                      src={image.url}
                      alt={image.alt}
                      tone={product.collection}
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
            {product.collection}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-base text-ink-soft">{product.tagline}</p>

          <div className="mt-10">
            <ProductPurchasePanel product={product} />
            <WishlistButton productId={product.id} />
          </div>

          <div className="mt-14 space-y-10">
            <div>
              <h2 className="font-serif text-xl text-ink">Fragrance Notes</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.fragrance_notes.map((note) => (
                  <li
                    key={note}
                    className="border border-line px-3 py-1 text-xs uppercase tracking-wide text-ink-soft"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-ink">Story</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{product.story}</p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-ink">Ingredients</h2>
              <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-ink">How to Use</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{product.directions}</p>
            </div>

            <div className="border-t border-line pt-10">
              <h2 className="font-serif text-xl text-ink">Craft &amp; Origin</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Hand-finished by women artisans in Assam, in small batches, on a charcoal-free
                joss powder base. Every stick carries the same natural ingredients and craft as
                the offering it began with.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
