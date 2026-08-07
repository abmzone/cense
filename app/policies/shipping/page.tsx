import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/policy-page";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping Policy" updated="7 August 2026">
      <p>
        We currently ship across India via trusted courier partners. Orders are processed and
        dispatched within 1-2 business days of confirmation.
      </p>
      <h2>Delivery times</h2>
      <p>
        Most orders arrive within 4-7 business days, depending on your location. Remote areas
        may take slightly longer.
      </p>
      <h2>Shipping fees</h2>
      <p>
        A flat shipping fee is calculated at checkout based on your delivery address. Orders
        above the free-shipping threshold shown at checkout ship at no additional cost.
      </p>
      <h2>Tracking</h2>
      <p>
        Once your order ships, you&apos;ll receive a tracking number by email and can also view
        it from your account&apos;s order history.
      </p>
    </PolicyPage>
  );
}
