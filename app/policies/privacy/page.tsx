import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { PolicyPage } from "@/components/policies/policy-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy" updated="7 August 2026">
      <p>
        Cense (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what
        information we collect, how we use it, and the choices you have.
      </p>
      <h2>Information we collect</h2>
      <p>
        Name, email, phone, shipping address and order history when you create an account or
        place an order; email address if you subscribe to our newsletter or use the contact
        form.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>To process and deliver your orders</li>
        <li>To communicate order updates, shipping and delivery notifications</li>
        <li>To send newsletter updates, if you&apos;ve opted in</li>
        <li>To improve our products and website experience</li>
      </ul>
      <h2>Payment information</h2>
      <p>
        Payments are processed by Razorpay. We do not store your card, UPI or banking details
        on our servers.
      </p>
      <h2>Your rights</h2>
      <p>
        You can access, update or delete your account information at any time from your
        account settings, or by emailing {SITE.email}.
      </p>
    </PolicyPage>
  );
}
