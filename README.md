# Cense — cense.in

Premium handcrafted incense from Assam, made from flowers offered at the Kamakhya Temple.
A design-first storefront (Aesop / Byredo / Muji register) with a full e-commerce stack:
catalog, cart, checkout, Razorpay payments, customer accounts, and an admin dashboard.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide ·
Supabase (Postgres, Auth, Storage) · Razorpay · Zustand · deployed on Vercel.

> No real product photography exists yet — every image slot renders an elegant gradient
> placeholder (see `components/media/placeholder-image.tsx`) until you upload real photos via
> the admin dashboard's product image uploader. That's the first thing to replace before launch.

---

## Folder structure

```
app/
  page.tsx                      Home
  story/                        Editorial brand story
  about/                        Mission, process, the women's collective
  ingredients/                  Interactive ingredient breakdown
  shop/                         Collection grid + shop/[slug] product detail
  journal/                      Blog listing + journal/[slug] post
  contact/                      Contact form, map, details
  faq/                          Shipping / returns / safety / burning / ingredients FAQ
  policies/{privacy,terms,refund,shipping}/
  cart/, checkout/, checkout/success/
  account/
    (auth)/{login,signup,forgot-password,reset-password}/   public
    (dashboard)/{page,orders,addresses,wishlist}            auth-gated
  admin/
    (auth)/login/                                           public
    (dashboard)/{page,orders,products,inventory,coupons,banners,journal,customers}
    orders/[id]/invoice/                                    printable, outside the sidebar layout
  api/
    razorpay/{create-order,verify,webhook}/
    orders/cod/, coupons/validate/, shipping/calculate/
    contact/, newsletter/
    admin/{products,coupons,banners,journal,inventory,orders}/   service-role mutations
  sitemap.ts, robots.ts
components/
  ui/            Button, Container, Reveal (Framer Motion fade/slide wrapper)
  layout/        Nav, Footer, NewsletterForm
  media/         PlaceholderImage (real photo vs. gradient placeholder)
  shop/          ProductCard, QuantitySelector, ProductPurchasePanel, WishlistButton
  cart/          CartDrawer, CartPageContent
  checkout/      CheckoutForm (Razorpay + COD orchestration)
  account/       Login/signup/reset forms, AddressManager, WishlistList
  admin/         Orders table, ProductForm, CouponsManager, InventoryManager, BannersManager, JournalForm
lib/
  supabase/      client.ts (browser), server.ts (RSC/route handlers), admin.ts (service role),
                 proxy.ts (session refresh for proxy.ts)
  data/          Server-side reads with graceful fallback to local seed-shaped data
  cart-store.ts  Zustand + localStorage cart
  pricing.ts     Server-side-only order total computation (never trusts client totals)
  razorpay.ts    Order creation + HMAC signature verification
  require-admin.ts  Auth+role guard used by every /api/admin/* route
  types.ts       Shared domain types
proxy.ts         Next.js 16 "proxy" (formerly middleware) — guards /account/* and /admin/*
supabase/
  migrations/0001_init.sql   Full schema, RLS policies, storage buckets
  seed.sql                   3 products, sample coupon, FAQs, journal posts, homepage banner
```

---

## Why Vercel + Supabase (not cPanel)

This project originally targeted cPanel shared hosting, but Next.js's App Router (Route
Handlers, Server Actions, image optimization) is a first-class fit for Vercel, and Supabase
gives Postgres + Auth + file storage in one place — so there's no separate backend service to
run or a cPanel Node.js Selector to configure. One deployable Next.js app; two managed services.

---

## 1. Install

```bash
npm install
cp .env.example .env.local   # fill in the values from steps 2 and 3 below
npm run dev                  # http://localhost:3000
```

The storefront, journal, and FAQ pages work immediately using built-in fallback content (see
`lib/data/*`) even before Supabase is configured — useful for reviewing the design. Cart/
checkout/accounts/admin require a real Supabase project (step 2).

## 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com/dashboard).
2. **Project Settings → API** — copy the Project URL, `anon` key, and `service_role` key into
   `.env.local`.
3. **SQL Editor** — run `supabase/migrations/0001_init.sql`, then `supabase/seed.sql`.
   (Or with the Supabase CLI: `supabase link --project-ref <ref>` then `supabase db push`.)
4. **Authentication → Providers** — Email provider is enabled by default; that's all this
   project uses (no OAuth).
5. **Authentication → URL Configuration** — add your site URL and
   `{url}/account/reset-password` as a redirect URL (needed for the forgot-password flow).
6. **Create your first admin user:**
   - Sign up normally at `/account/signup` (or via the Supabase Auth dashboard).
   - In the SQL Editor: `update profiles set role = 'admin' where email = 'you@cense.in';`
   - Sign in at `/admin/login`.
7. Storage buckets `product-images` and `banners` are created by the migration, with RLS
   policies allowing public read and admin-only writes.

## 3. Set up Razorpay

1. Create an account at [razorpay.com](https://dashboard.razorpay.com/) — test mode is enabled
   by default, no live KYC required to start building.
2. **Settings → API Keys** — generate a Key ID / Key Secret, add to `.env.local` as
   `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`.
3. **Settings → Webhooks** — add `{your-domain}/api/razorpay/webhook`, subscribe to
   `payment.captured`, and copy the webhook secret into `RAZORPAY_WEBHOOK_SECRET`. This webhook
   is a reconciliation fallback; the primary order-confirmation path is the client-side
   `/api/razorpay/verify` call made right after a successful payment.
4. Cash on Delivery exists in the checkout UI but is **disabled by default**
   (`settings.cod_enabled = false`, seeded via `supabase/seed.sql`). Enable it by updating that
   row once you have a fulfillment process for it.
5. All order totals (subtotal, discount, shipping, tax) are recomputed server-side in
   `lib/pricing.ts` from the live database — the client never gets to dictate what gets charged.

## 4. Set up Delhivery (shipping labels)

Order fulfillment (`app/api/admin/orders/[id]/shipping-label`, `lib/delhivery.ts`) creates a
forward shipment via Delhivery's Order Creation API and fetches the packing slip/label, called
from the **Shipping Label** button on an order's admin detail page.

1. Get your API token from Delhivery's client portal (contact your BD/support rep if it's not
   visible in your dashboard).
2. Find your **exact** registered pickup/warehouse facility name and address — this must match
   your Delhivery account precisely, or shipment creation fails.
3. Add to `.env.local` / your host's environment variables: `DELHIVERY_API_TOKEN`,
   `DELHIVERY_CLIENT_NAME`, `DELHIVERY_PICKUP_LOCATION`, `DELHIVERY_PICKUP_ADDRESS`,
   `DELHIVERY_PICKUP_CITY`, `DELHIVERY_PICKUP_PINCODE`, `DELHIVERY_PICKUP_PHONE` (see
   `.env.example` for the full list, including `DELHIVERY_HSN_CODE` and
   `DELHIVERY_SELLER_GST_TIN`, which can be left blank if you aren't GST-registered — Delhivery
   may still reject shipments without one depending on your account tier).
4. **Delhivery's public API docs are sparse and response shapes have been reported to vary by
   account.** The integration parses the commonly-documented response shape and logs the full
   raw response to the browser console on every label-generation attempt — check that console
   log first if a label doesn't come back as expected, and adjust the parsing in
   `lib/delhivery.ts` (`createShipment` / `getShippingLabel`) to match what your account actually
   returns.
5. This calls Delhivery's **production** endpoint directly (no staging/sandbox step) — every
   successful call creates a real shipment against your account.

## 5. Deploy

**Vercel:**

```bash
npx vercel
```

Or connect the repo in the Vercel dashboard. Add every variable from `.env.example` under
**Project Settings → Environment Variables**, then deploy. No build configuration changes are
needed — `next build` runs as-is.

**Supabase:** already hosted; just make sure the migration + seed ran in step 2.

## 6. Build scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |

---

## Database schema

See `supabase/migrations/0001_init.sql` for the full, authoritative schema. Summary:

| Table | Purpose |
| --- | --- |
| `profiles` | Extends `auth.users`; `role` (`customer`/`admin`) gates `/admin` |
| `products`, `product_images`, `product_variants` | Catalog |
| `orders`, `order_items` | Placed orders (written server-side only, after payment verification) |
| `addresses`, `wishlists` | Customer-owned, RLS-restricted to `auth.uid()` |
| `coupons` | Percentage/flat, expiry, usage limits |
| `settings` | Single-row config: shipping rates, free-shipping threshold, tax rate, COD toggle |
| `banners` | Homepage hero + any future CMS banner slots, keyed by `key` |
| `journal_posts`, `faqs` | Blog + FAQ CMS content |
| `inventory_adjustments` | Audit trail for manual stock changes |
| `newsletter_subscribers`, `contact_messages` | Public form submissions |

**Security model:** public storefront reads use the anon key under RLS (products, journal,
FAQs, settings, banners are public-read). Customer data (orders, addresses, wishlists) is
RLS-restricted to its owner. All admin dashboard reads/writes and checkout order-writes go
through Route Handlers using the Supabase **service role** key (`lib/supabase/admin.ts`), after
`lib/require-admin.ts` confirms the caller's session belongs to an admin profile — proxy.ts
gates the `/admin/*` **pages**, but API routes re-check authorization themselves since they
aren't covered by that matcher.

---

## What's intentionally simplified for v1

- **Invoices**: implemented as a print-optimized page (`/admin/orders/[id]/invoice`) using the
  browser's native "Print to PDF" — no server PDF library needed.
- **CSV export / analytics**: client-side CSV export on the orders table; the dashboard's
  revenue/low-stock figures are computed from live queries, not a pre-aggregated analytics
  pipeline.
- **Email**: transactional email (order confirmations, password reset) rides on Supabase Auth's
  built-in email sending for auth flows. Order-confirmation emails to customers aren't sent —
  add a provider (Resend, Postmark) in `/api/razorpay/verify` if you want that.

---

## SEO & performance

- `app/sitemap.ts` / `app/robots.ts` — generated sitemap covering static pages, products, and
  journal posts; admin/account/checkout/API routes disallowed.
- Per-page `generateMetadata` with Open Graph + Twitter cards; `Product` and `Article` JSON-LD
  on product and journal pages; `Organization` JSON-LD in the root layout.
- Marketing pages that don't depend on the database render statically; anything reading from
  Supabase (shop, journal, account, admin, checkout) is explicitly dynamic (`force-dynamic`) so
  `next build` never needs live database access to succeed.
- Fonts loaded via `next/font/google` (self-hosted, no layout shift); images via `next/image`
  once real photography is uploaded to Supabase Storage.
