"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, cartSubtotal } from "@/lib/cart-store";
import { loadRazorpayScript } from "@/lib/load-razorpay-script";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import { SITE } from "@/lib/constants";

interface Props {
  codEnabled: boolean;
}

export function CheckoutForm({ codEnabled }: Props) {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const couponCode = useCart((s) => s.couponCode);
  const clearCart = useCart((s) => s.clear);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [taxAmount, setTaxAmount] = useState<number | null>(null);
  const [codFee, setCodFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [serviceable, setServiceable] = useState<boolean | null>(null);
  const [belowMinimumOrder, setBelowMinimumOrder] = useState(false);
  const [minimumOrderValue, setMinimumOrderValue] = useState(0);
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = cartSubtotal(lines);
  const isCompletePincode = /^\d{6}$/.test(form.postalCode);

  const cartLinePayload = useMemo(
    () => lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })),
    [lines]
  );

  // Debounced live estimate: pincode serviceability is only checked once a
  // full 6-digit postal code is entered, otherwise this still resolves
  // discount/shipping/minimum-order state so the summary isn't blank.
  useEffect(() => {
    if (lines.length === 0) return;
    setCheckingPincode(isCompletePincode);
    const timeout = setTimeout(() => {
      fetch("/api/shipping/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: cartLinePayload,
          couponCode,
          postalCode: isCompletePincode ? form.postalCode : undefined,
          paymentMode: paymentMethod === "cod" ? "COD" : "Prepaid",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setShippingFee(data.fee);
          setTaxAmount(data.tax);
          setCodFee(data.codFee ?? 0);
          setDiscount(data.discount);
          setBelowMinimumOrder(data.belowMinimumOrder);
          setMinimumOrderValue(data.minimumOrderValue);
          setServiceable(data.serviceable);
        })
        .catch(() => {
          setShippingFee(null);
          setTaxAmount(null);
          setCodFee(0);
        })
        .finally(() => setCheckingPincode(false));
    }, 400);

    return () => clearTimeout(timeout);
  }, [cartLinePayload, couponCode, form.postalCode, isCompletePincode, paymentMethod, lines.length]);

  const estimatedTotal = useMemo(() => {
    if (shippingFee === null || taxAmount === null) return null;
    return subtotal - discount + shippingFee + taxAmount + codFee;
  }, [subtotal, discount, shippingFee, taxAmount, codFee]);

  function isFormValid() {
    return (
      form.fullName.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.phone.trim().length >= 10 &&
      form.line1.trim() &&
      form.city.trim() &&
      form.state.trim() &&
      isCompletePincode
    );
  }

  const canSubmit =
    isFormValid() && !belowMinimumOrder && serviceable !== false && !checkingPincode;

  const shippingAddress = {
    full_name: form.fullName,
    phone: form.phone,
    line1: form.line1,
    line2: form.line2 || null,
    city: form.city,
    state: form.state,
    postal_code: form.postalCode,
    country: form.country,
  };

  async function payWithRazorpay() {
    const res = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lines: cartLinePayload,
        couponCode,
        destinationPincode: form.postalCode,
        email: form.email,
        phone: form.phone,
        shippingAddress,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Could not start payment.");

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) throw new Error("Could not load Razorpay checkout.");

    return new Promise<void>((resolve, reject) => {
      const razorpay = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: SITE.name,
        description: "Cense order",
        order_id: data.orderId,
        prefill: { name: form.fullName, email: form.email, contact: form.phone },
        theme: { color: "#5b1a24" },
        // Without this, a stalled bank/UPI confirmation can leave the
        // checkout modal showing "Confirming payment..." indefinitely if
        // Razorpay never resolves it to either success or payment.failed.
        timeout: 300,
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error ?? "Payment verification failed.");
            clearCart();
            router.push(`/checkout/success?order=${verifyData.orderNumber}`);
            resolve();
          } catch (err) {
            reject(err);
          }
        },
        modal: {
          ondismiss: () =>
            reject(new Error("Payment was not completed. Please try again.")),
        },
      });
      // Timeouts and declines don't always reach `handler` — this is the
      // only reliable way to catch those and surface a clear failure
      // message instead of leaving the customer on an ambiguous state.
      razorpay.on("payment.failed", (response) => {
        reject(
          new Error(
            response.error?.description ?? "Payment failed. Please try again."
          )
        );
      });
      razorpay.open();
    });
  }

  async function payWithCod() {
    const res = await fetch("/api/orders/cod", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        phone: form.phone,
        shippingAddress,
        lines: cartLinePayload,
        couponCode,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Could not place order.");
    clearCart();
    router.push(`/checkout/success?order=${data.orderNumber}`);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || lines.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      if (paymentMethod === "cod") {
        await payWithCod();
      } else {
        await payWithRazorpay();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-ink-soft">Your bag is empty — add something before checking out.</p>
        <Button type="button" className="mt-8" onClick={() => router.push("/shop")}>
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
      <div className="space-y-10">
        <div>
          <h2 className="font-serif text-xl text-ink">Contact</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              required
              placeholder="Full name"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              className="border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none"
            />
            <input
              required
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none md:col-span-2"
            />
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl text-ink">Shipping Address</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              required
              placeholder="Address line 1"
              value={form.line1}
              onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))}
              className="border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none md:col-span-2"
            />
            <input
              placeholder="Address line 2 (optional)"
              value={form.line2}
              onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))}
              className="border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none md:col-span-2"
            />
            <input
              required
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none"
            />
            <input
              required
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
              className="border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none"
            />
            <div>
              <input
                required
                placeholder="Postal code"
                value={form.postalCode}
                onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                className="w-full border border-ink/20 bg-transparent px-3 py-3 text-sm focus:border-maroon focus:outline-none"
              />
              {isCompletePincode && !checkingPincode && serviceable === false && (
                <p className="mt-1 text-xs text-maroon">
                  Sorry, we can&apos;t deliver to this pincode yet.
                </p>
              )}
            </div>
            <input
              disabled
              value={form.country}
              className="border border-ink/10 bg-off-white px-3 py-3 text-sm text-ink-soft"
            />
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl text-ink">Payment</h2>
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3 border border-ink/20 px-4 py-3 text-sm has-[:checked]:border-maroon">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
              />
              UPI, Cards, Net Banking, Wallets &amp; QR (Razorpay)
            </label>
            <label
              className={`flex items-center gap-3 border px-4 py-3 text-sm ${
                codEnabled ? "border-ink/20 has-[:checked]:border-maroon" : "border-ink/10 text-ink-soft/50"
              }`}
            >
              <input
                type="radio"
                name="payment"
                disabled={!codEnabled}
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery (+ ₹20) {!codEnabled && "(currently unavailable)"}
            </label>
          </div>
        </div>

        {error && <p className="text-sm text-maroon">{error}</p>}
      </div>

      <div className="h-fit border border-line p-8">
        <h2 className="font-serif text-xl text-ink">Order Summary</h2>
        <ul className="mt-6 space-y-4">
          {lines.map((line) => (
            <li key={line.variantId} className="flex justify-between text-sm">
              <span className="text-ink-soft">
                {line.name} ({line.variantLabel}) &times; {line.quantity}
              </span>
              <span className="text-ink">{formatINR(line.unitPrice * line.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span className="text-ink">{formatINR(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-ink-soft">
              <span>Discount</span>
              <span className="text-maroon">-{formatINR(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-ink-soft">
            <span>Shipping</span>
            <span className="text-ink">
              {shippingFee === null ? "—" : shippingFee === 0 ? "Free" : formatINR(shippingFee)}
            </span>
          </div>
          {paymentMethod === "cod" && codFee > 0 && (
            <div className="flex justify-between text-ink-soft">
              <span>Cash on Delivery Fee</span>
              <span className="text-ink">{formatINR(codFee)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-line pt-3 font-serif text-lg text-ink">
            <span>Total</span>
            <span>{estimatedTotal === null ? "—" : formatINR(estimatedTotal)}</span>
          </div>
          {belowMinimumOrder && (
            <p className="text-xs text-maroon">
              Minimum order value is {formatINR(minimumOrderValue)}.
            </p>
          )}
        </div>

        <Button type="submit" disabled={loading || !canSubmit} className="mt-6 w-full">
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </form>
  );
}
