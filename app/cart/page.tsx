import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CartPageContent } from "@/components/cart/cart-page-content";

export const metadata: Metadata = {
  title: "Your Bag",
};

export default function CartPage() {
  return (
    <section className="py-20">
      <Container>
        <h1 className="mb-14 font-serif text-4xl text-ink md:text-5xl">Your Bag</h1>
        <CartPageContent />
      </Container>
    </section>
  );
}
