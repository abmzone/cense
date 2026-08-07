import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { getSettings } from "@/lib/data/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default async function CheckoutPage() {
  const settings = await getSettings();

  return (
    <section className="py-20">
      <Container>
        <h1 className="mb-14 font-serif text-4xl text-ink md:text-5xl">Checkout</h1>
        <CheckoutForm codEnabled={settings.cod_enabled} />
      </Container>
    </section>
  );
}
