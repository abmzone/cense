import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/policy-page";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return (
    <PolicyPage title="Refund Policy" updated="7 August 2026">
      <p>
        As incense is a consumable product, we&apos;re unable to accept returns or offer
        refunds on opened packs unless the product is defective.
      </p>
      <h2>Damaged or incorrect orders</h2>
      <p>
        If your order arrives damaged, incorrect, or missing items, contact us at
        hello@cense.in within 48 hours of delivery with photos of the product and packaging.
        We&apos;ll arrange a replacement or a full refund.
      </p>
      <h2>Cancellations</h2>
      <p>
        Orders can be cancelled for a full refund any time before they are marked as
        &quot;Packed&quot; in your order history. Once packed, cancellation is no longer
        possible.
      </p>
      <h2>Processing time</h2>
      <p>Approved refunds are credited to your original payment method within 5-7 business days.</p>
    </PolicyPage>
  );
}
