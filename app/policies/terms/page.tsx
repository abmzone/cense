import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { PolicyPage } from "@/components/policies/policy-page";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <PolicyPage title="Terms of Service" updated="7 August 2026">
      <p>
        By using {SITE.domain} and placing an order, you agree to the following terms.
      </p>
      <h2>Orders and pricing</h2>
      <p>
        All prices are listed in Indian Rupees (INR) and inclusive of applicable taxes unless
        stated otherwise. We reserve the right to correct pricing errors and to limit order
        quantities.
      </p>
      <h2>Product use</h2>
      <p>
        Cense products are intended for use as incense only. Always follow the burning
        instructions provided with your order and on our website.
      </p>
      <h2>Intellectual property</h2>
      <p>
        All content on this site — including photography, copy, and the Cense name and logo —
        is the property of Cense and may not be reproduced without permission.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, with jurisdiction in Guwahati, Assam.</p>
    </PolicyPage>
  );
}
