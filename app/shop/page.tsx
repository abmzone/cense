import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/shop/product-card";
import { ButtonLink } from "@/components/ui/button";
import { getProducts } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Three incense blends handcrafted from Kamakhya temple flowers and natural ingredients from Assam and Meghalaya.",
};

export default async function ShopPage() {
  const products = await getProducts();
  const combo = products.find((p) => p.collection === "combo");

  return (
    <>
      <section className="py-28">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Shop</p>
            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-tight text-ink md:text-6xl">
              The Collection
            </h1>
            <p className="mt-4 max-w-lg text-base text-ink-soft">
              Three fragrances. One landscape.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {combo && (
        <section className="bg-off-white py-24">
          <Container className="text-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
                The Complete Collection
              </p>
              <h2 className="mt-6 font-serif text-3xl text-ink md:text-4xl">
                Three fragrances. One landscape.
              </h2>
              <p className="mt-4 text-base text-ink-soft">
                Bring the full Cense experience home.
              </p>
              <ButtonLink href={`/shop/${combo.slug}`} className="mt-8">
                Shop the Complete Collection
              </ButtonLink>
            </Reveal>
          </Container>
        </section>
      )}
    </>
  );
}
