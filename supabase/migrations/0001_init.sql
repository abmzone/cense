-- Cense e-commerce schema
-- Run in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────────────────
-- Profiles (extends auth.users with a role for admin gating)
-- ─────────────────────────────────────────────────────────────────────────
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Automatically create a profile row whenever a new auth user signs up.
create function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────
-- Catalog
-- ─────────────────────────────────────────────────────────────────────────
create table products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text not null default '',
  description text not null default '',
  story text not null default '',
  fragrance_notes text[] not null default '{}',
  ingredients text[] not null default '{}',
  directions text not null default '',
  collection text not null check (collection in ('floral', 'fresh', 'woody')),
  is_active boolean not null default true,
  seo_title text,
  seo_description text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  url text not null,
  alt text not null default '',
  "position" int not null default 0
);

create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  label text not null,
  weight_grams int not null,
  burn_time_minutes int not null,
  price int not null,               -- paise
  compare_at_price int,             -- paise
  stock int not null default 0,
  sku text not null unique
);

alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;

create function decrement_variant_stock(p_variant_id uuid, p_qty int)
returns void as $$
begin
  update product_variants
  set stock = greatest(stock - p_qty, 0)
  where id = p_variant_id;
end;
$$ language plpgsql security definer set search_path = public;

create function adjust_variant_stock(p_variant_id uuid, p_delta int)
returns void as $$
begin
  update product_variants
  set stock = greatest(stock + p_delta, 0)
  where id = p_variant_id;
end;
$$ language plpgsql security definer set search_path = public;

create policy "Public can view active products" on products
  for select using (is_active = true);

create policy "Public can view product images" on product_images
  for select using (true);

create policy "Public can view product variants" on product_variants
  for select using (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Addresses & wishlists (customer-owned)
-- ─────────────────────────────────────────────────────────────────────────
create table addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  full_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'India',
  is_default boolean not null default false
);

alter table addresses enable row level security;

create policy "Users manage own addresses" on addresses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id uuid not null references products (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

alter table wishlists enable row level security;

create policy "Users manage own wishlist" on wishlists
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- Orders (writes happen server-side with the service role key, after
-- Razorpay signature verification — customers only get read access to
-- their own rows here)
-- ─────────────────────────────────────────────────────────────────────────
create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  phone text not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled')),
  subtotal int not null,
  discount int not null default 0,
  shipping_fee int not null default 0,
  tax int not null default 0,
  total int not null,
  coupon_code text,
  payment_method text not null default 'razorpay' check (payment_method in ('razorpay', 'cod')),
  razorpay_order_id text,
  razorpay_payment_id text,
  shipping_address jsonb not null,
  tracking_number text,
  created_at timestamptz not null default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  product_id uuid not null references products (id),
  variant_id uuid not null references product_variants (id),
  product_name text not null,
  variant_label text not null,
  unit_price int not null,
  quantity int not null
);

alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Users can view own orders" on orders
  for select using (auth.uid() = user_id);

create policy "Users can view own order items" on order_items
  for select using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────────────────
-- Coupons & inventory adjustments (service-role / admin only — no public
-- policies, so anon/authenticated roles get zero access by default)
-- ─────────────────────────────────────────────────────────────────────────
create table coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  type text not null check (type in ('percentage', 'flat')),
  value int not null,
  min_order_value int not null default 0,
  usage_limit int,
  used_count int not null default 0,
  expires_at timestamptz,
  is_active boolean not null default true
);

alter table coupons enable row level security;

create function increment_coupon_usage(p_code text)
returns void as $$
begin
  update coupons set used_count = used_count + 1 where code = p_code;
end;
$$ language plpgsql security definer set search_path = public;

create table inventory_adjustments (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references product_variants (id) on delete cascade,
  delta int not null,
  reason text not null default '',
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

alter table inventory_adjustments enable row level security;

-- ─────────────────────────────────────────────────────────────────────────
-- Site settings (single row, id = 1)
-- ─────────────────────────────────────────────────────────────────────────
create table settings (
  id int primary key default 1,
  free_shipping_threshold int not null default 99900,
  standard_shipping_fee int not null default 6900,
  tax_rate_percent numeric not null default 5,
  cod_enabled boolean not null default false,
  constraint settings_singleton check (id = 1)
);

alter table settings enable row level security;

create policy "Public can view settings" on settings
  for select using (true);

-- ─────────────────────────────────────────────────────────────────────────
-- CMS: banners, journal, FAQs
-- ─────────────────────────────────────────────────────────────────────────
create table banners (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  heading text not null,
  subheading text not null default '',
  cta_label text not null default '',
  cta_href text not null default '',
  is_active boolean not null default true
);

alter table banners enable row level security;

create policy "Public can view active banners" on banners
  for select using (is_active = true);

create table journal_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  published_at timestamptz not null default now(),
  seo_title text,
  seo_description text
);

alter table journal_posts enable row level security;

create policy "Public can view journal posts" on journal_posts
  for select using (true);

create table faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('shipping', 'returns', 'safety', 'burning', 'ingredients')),
  question text not null,
  answer text not null,
  "position" int not null default 0
);

alter table faqs enable row level security;

create policy "Public can view faqs" on faqs
  for select using (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Newsletter
-- ─────────────────────────────────────────────────────────────────────────
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table newsletter_subscribers enable row level security;

create policy "Anyone can subscribe" on newsletter_subscribers
  for insert with check (true);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

create policy "Anyone can submit a contact message" on contact_messages
  for insert with check (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Storage (product photography & banner images uploaded from the admin
-- dashboard). Buckets are public-read; writes require an authenticated
-- admin profile.
-- ─────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true), ('banners', 'banners', true)
on conflict (id) do nothing;

create policy "Public can view product-images and banners"
  on storage.objects for select
  using (bucket_id in ('product-images', 'banners'));

create policy "Admins can upload product-images and banners"
  on storage.objects for insert
  with check (
    bucket_id in ('product-images', 'banners')
    and exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update product-images and banners"
  on storage.objects for update
  using (
    bucket_id in ('product-images', 'banners')
    and exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete product-images and banners"
  on storage.objects for delete
  using (
    bucket_id in ('product-images', 'banners')
    and exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- ─────────────────────────────────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────────────────────────────────
create index idx_product_images_product_id on product_images (product_id);
create index idx_product_variants_product_id on product_variants (product_id);
create index idx_orders_user_id on orders (user_id);
create index idx_order_items_order_id on order_items (order_id);
create index idx_addresses_user_id on addresses (user_id);
create index idx_wishlists_user_id on wishlists (user_id);
