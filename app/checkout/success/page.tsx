import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: PageProps<"/checkout/success">) {
  const { order } = await searchParams;
  const orderNumber = Array.isArray(order) ? order[0] : order;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 6);

  return (
    <section className="py-32">
      <Container className="max-w-xl text-center">
        <CheckCircle2 size={48} strokeWidth={1.25} className="mx-auto text-maroon" />
        <h1 className="mt-8 font-serif text-4xl text-ink md:text-5xl">Thank you.</h1>
        <p className="mt-4 text-base text-ink-soft">
          Your order has been confirmed and is being prepared with care.
        </p>

        {orderNumber && (
          <div className="mt-10 border border-line px-8 py-6">
            <p className="text-xs uppercase tracking-widest text-ink-soft">Order Number</p>
            <p className="mt-1 font-serif text-2xl text-ink">{orderNumber}</p>
            <p className="mt-4 text-xs uppercase tracking-widest text-ink-soft">
              Estimated Delivery
            </p>
            <p className="mt-1 text-ink">
              {estimatedDelivery.toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}

        <ButtonLink href="/shop" className="mt-10">
          Continue Shopping
        </ButtonLink>
      </Container>
    </section>
  );
}
