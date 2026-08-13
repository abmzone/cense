import { Resend } from "resend";
import { formatINR } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface OrderConfirmationItem {
  product_name: string;
  variant_label: string;
  unit_price: number;
  quantity: number;
}

interface OrderConfirmationAddress {
  full_name?: string;
  line1?: string;
  line2?: string | null;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

interface OrderConfirmationData {
  order: {
    order_number: string;
    email: string;
    payment_method: "razorpay" | "cod";
    subtotal: number;
    discount: number;
    shipping_fee: number;
    tax: number;
    total: number;
    coupon_code: string | null;
    shipping_address: OrderConfirmationAddress;
  };
  items: OrderConfirmationItem[];
}

const COLORS = {
  warmWhite: "#faf6f0",
  offWhite: "#f2ece2",
  ink: "#211a17",
  inkSoft: "#4a3f3a",
  maroon: "#5b1a24",
  line: "#e6ddd0",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function buildOrderConfirmationHtml({ order, items }: OrderConfirmationData) {
  const isCod = order.payment_method === "cod";
  const addr = order.shipping_address ?? {};
  const addressLines = [
    addr.full_name,
    addr.line1,
    addr.line2,
    [addr.city, addr.state, addr.postal_code].filter(Boolean).join(", "),
    addr.country,
  ]
    .filter(Boolean)
    .join("<br/>");

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid ${COLORS.line};font-family:${SANS};font-size:14px;color:${COLORS.ink};">
            ${item.product_name}<br/>
            <span style="color:${COLORS.inkSoft};font-size:12px;">${item.variant_label} &times; ${item.quantity}</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid ${COLORS.line};font-family:${SANS};font-size:14px;color:${COLORS.ink};text-align:right;white-space:nowrap;">
            ${formatINR(item.unit_price * item.quantity)}
          </td>
        </tr>`
    )
    .join("");

  const summaryRow = (label: string, value: string, bold = false) => `
    <tr>
      <td style="padding:4px 0;font-family:${SANS};font-size:${bold ? "15px" : "13px"};color:${bold ? COLORS.ink : COLORS.inkSoft};${bold ? "font-weight:600;" : ""}">${label}</td>
      <td style="padding:4px 0;font-family:${SANS};font-size:${bold ? "15px" : "13px"};color:${bold ? COLORS.ink : COLORS.inkSoft};${bold ? "font-weight:600;" : ""}text-align:right;">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${SITE.name} Order ${order.order_number}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${COLORS.offWhite};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.offWhite};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${COLORS.warmWhite};">
            <tr>
              <td style="padding:32px 40px 24px;text-align:center;">
                <img src="${SITE.url}/logo-email.png" alt="${SITE.name}" height="28" style="height:28px;width:auto;" />
              </td>
            </tr>
            <tr>
              <td style="background-color:${COLORS.maroon};padding:28px 40px;text-align:center;">
                <p style="margin:0;font-family:${SANS};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.7);">
                  ${isCod ? "Order Received" : "Order Confirmed"}
                </p>
                <h1 style="margin:8px 0 0;font-family:${SERIF};font-size:26px;color:#ffffff;font-weight:normal;">
                  Thank you for your order
                </h1>
                <p style="margin:8px 0 0;font-family:${SANS};font-size:13px;color:rgba(255,255,255,0.85);">
                  Order ${order.order_number}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px 8px;">
                <p style="margin:0 0 20px;font-family:${SANS};font-size:14px;line-height:1.6;color:${COLORS.inkSoft};">
                  ${
                    isCod
                      ? "We've received your order and will begin preparing it. You can pay by cash when it arrives."
                      : "Your payment has been received and your order is confirmed. Here's what's on its way to you."
                  }
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${itemRows}
                </table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                  ${summaryRow("Subtotal", formatINR(order.subtotal))}
                  ${order.discount > 0 ? summaryRow(`Discount${order.coupon_code ? ` (${order.coupon_code})` : ""}`, `-${formatINR(order.discount)}`) : ""}
                  ${summaryRow("Shipping", order.shipping_fee > 0 ? formatINR(order.shipping_fee) : "Free")}
                  ${order.tax > 0 ? summaryRow("Tax", formatINR(order.tax)) : ""}
                  <tr><td colspan="2" style="padding-top:8px;border-top:1px solid ${COLORS.line};"></td></tr>
                  ${summaryRow(isCod ? "Total (pay on delivery)" : "Total Paid", formatINR(order.total), true)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 40px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-top:1px solid ${COLORS.line};padding-top:16px;">
                  <tr>
                    <td style="padding-top:16px;">
                      <p style="margin:0 0 6px;font-family:${SANS};font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:${COLORS.inkSoft};">
                        Shipping To
                      </p>
                      <p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.6;color:${COLORS.ink};">
                        ${addressLines}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color:${COLORS.offWhite};padding:24px 40px;text-align:center;">
                <p style="margin:0;font-family:${SERIF};font-size:14px;font-style:italic;color:${COLORS.inkSoft};">
                  Bring the spirit of Kamakhya home.
                </p>
                <p style="margin:12px 0 0;font-family:${SANS};font-size:12px;color:${COLORS.inkSoft};">
                  Questions about your order? Reply to this email or write to
                  <a href="mailto:${SITE.email}" style="color:${COLORS.maroon};">${SITE.email}</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendOrderConfirmationEmail(data: OrderConfirmationData) {
  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — skipping order confirmation email for",
      data.order.order_number
    );
    return;
  }

  const isCod = data.order.payment_method === "cod";
  const subject = isCod
    ? `We've received your ${SITE.name} order ${data.order.order_number}`
    : `Your ${SITE.name} order ${data.order.order_number} is confirmed`;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || `${SITE.name} <onboarding@resend.dev>`,
      to: data.order.email,
      replyTo: SITE.email,
      subject,
      html: buildOrderConfirmationHtml(data),
    });
  } catch (err) {
    console.error("Failed to send order confirmation email:", err);
  }
}
