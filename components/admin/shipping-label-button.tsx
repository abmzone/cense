"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ShippingLabelButton({
  orderId,
  hasTrackingNumber,
}: {
  orderId: string;
  hasTrackingNumber: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ waybill: string; label: unknown } | null>(null);

  async function onGenerate() {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/admin/orders/${orderId}/shipping-label`, { method: "POST" });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Could not generate shipping label.");
      return;
    }

    // Logged since Delhivery's exact label response shape can vary by
    // account — inspect this if no PDF link is found below.
    console.log("Delhivery shipping-label response:", data);
    setResult(data);
    router.refresh();

    const pdfLink =
      data.label?.packages?.[0]?.pdf_download_link ?? data.label?.pdf_download_link;
    if (pdfLink) {
      window.open(pdfLink, "_blank");
    }
  }

  return (
    <div className="border border-line p-6">
      <p className="text-xs uppercase tracking-widest text-ink-soft">Shipping Label (Delhivery)</p>
      <button
        onClick={onGenerate}
        disabled={loading}
        className="mt-4 w-full border border-ink/30 px-4 py-2 text-xs uppercase tracking-widest text-ink hover:border-maroon hover:text-maroon disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : hasTrackingNumber
            ? "Fetch Shipping Label"
            : "Create Shipment & Generate Label"}
      </button>
      {error && <p className="mt-3 text-xs text-maroon">{error}</p>}
      {result && (
        <div className="mt-3 text-xs text-ink-soft">
          <p>Waybill: {result.waybill}</p>
          {!(
            (result.label as { packages?: { pdf_download_link?: string }[] })?.packages?.[0]
              ?.pdf_download_link ??
            (result.label as { pdf_download_link?: string })?.pdf_download_link
          ) && (
            <p className="mt-1">
              No direct PDF link was found in Delhivery&apos;s response — check the browser
              console or Delhivery&apos;s dashboard for this waybill to print the label.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
