import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/shop/product-card";
import { getProducts } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Three incense blends handcrafted from Kamakhya temple flowers and natural ingredients from Assam and Meghalaya.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <section className="py-28">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Shop</p>
          <h1 className="mt-6 max-w-xl font-serif text-5xl leading-tight text-ink md:text-6xl">
            The Collection
          </h1>
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
  );
}
