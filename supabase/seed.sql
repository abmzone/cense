-- Seed data for Cense. Run after 0001_init.sql.
-- Product IDs are fixed so this file can be re-run safely with `on conflict`.

insert into settings (id, free_shipping_threshold, standard_shipping_fee, tax_rate_percent, cod_enabled)
values (1, 99900, 6900, 5, false)
on conflict (id) do nothing;

-- Where the Flowers Rested ---------------------------------------------------
insert into products (id, slug, name, tagline, description, story, fragrance_notes, ingredients, directions, collection, seo_title, seo_description, tags)
values (
  '00000000-0000-0000-0000-000000000001',
  'where-the-flowers-rested',
  'Where the Flowers Rested',
  'Soft floral. Rose, jasmine, and the temple flowers themselves.',
  'Crafted from flowers offered at the Kamakhya Temple, blended with Karbi Anglong dhuna, Assam agarwood and essential oils from Assam & Meghalaya.',
  'Every morning, thousands of marigolds, roses and jasmine are offered at the Kamakhya Temple and, by evening, cleared away as waste. Where the Flowers Rested is our attempt to let that offering continue a little longer.',
  array['Rose', 'Jasmine', 'Temple flowers', 'Soft musk'],
  array['Reclaimed temple flowers (rose, marigold, jasmine)', 'Karbi Anglong dhuna resin', 'Assam agarwood powder', 'Natural essential oils', 'Bamboo core', 'Joss powder binder'],
  'Light the tip until it glows, then gently blow out the flame. Rest the stick in a heat-safe holder and allow the fragrance to settle in a ventilated room.',
  'floral',
  'Where the Flowers Rested — Temple Flower Incense | Cense',
  'A soft floral incense handcrafted from flowers offered at the Kamakhya Temple, blended with Assam agarwood and Karbi Anglong dhuna.',
  array['floral', 'temple-flowers', 'bestseller']
)
on conflict (id) do nothing;

insert into product_variants (id, product_id, label, weight_grams, burn_time_minutes, price, compare_at_price, stock, sku)
values
  ('00000000-0000-0000-0001-000000000001', '00000000-0000-0000-0000-000000000001', '40g · 20 sticks', 40, 45, 45000, null, 120, 'CENSE-WFR-40'),
  ('00000000-0000-0000-0001-000000000002', '00000000-0000-0000-0000-000000000001', '80g · 40 sticks', 80, 45, 82000, 90000, 80, 'CENSE-WFR-80')
on conflict (id) do nothing;

-- Rain Meets the Grass --------------------------------------------------------
insert into products (id, slug, name, tagline, description, story, fragrance_notes, ingredients, directions, collection, seo_title, seo_description, tags)
values (
  '00000000-0000-0000-0000-000000000002',
  'rain-meets-the-grass',
  'Rain Meets the Grass',
  'Fresh. Lemongrass, rain, and green botanicals.',
  'Fresh lemongrass, rain-washed earth and green botanicals inspired by the monsoon across Northeast India.',
  'There is a particular smell that arrives just before the monsoon breaks over the Brahmaputra valley — wet earth, cut grass, the first rain on warm stone. Rain Meets the Grass is our attempt to hold onto that moment.',
  array['Lemongrass', 'Rain-washed earth', 'Green grass', 'Monsoon petrichor'],
  array['Lemongrass essential oil', 'Vetiver root', 'Natural petrichor accord', 'Assam agarwood powder', 'Bamboo core', 'Joss powder binder'],
  'Light the tip until it glows, then gently blow out the flame. Rest the stick in a heat-safe holder and allow the fragrance to settle in a ventilated room.',
  'fresh',
  'Rain Meets the Grass — Fresh Monsoon Incense | Cense',
  'A fresh lemongrass and rain-washed incense inspired by the monsoon across Assam and Meghalaya, handcrafted in small batches.',
  array['fresh', 'monsoon']
)
on conflict (id) do nothing;

insert into product_variants (id, product_id, label, weight_grams, burn_time_minutes, price, compare_at_price, stock, sku)
values
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000002', '40g · 20 sticks', 40, 40, 42000, null, 100, 'CENSE-RMG-40'),
  ('00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0000-000000000002', '80g · 40 sticks', 80, 40, 78000, null, 60, 'CENSE-RMG-80')
on conflict (id) do nothing;

-- Into the Forest ---------------------------------------------------------
insert into products (id, slug, name, tagline, description, story, fragrance_notes, ingredients, directions, collection, seo_title, seo_description, tags)
values (
  '00000000-0000-0000-0000-000000000003',
  'into-the-forest',
  'Into the Forest',
  'Deep woody. Agarwood, dhuna, and forest floor.',
  'A deep woody blend inspired by the forests of Assam, resinous dhuna and native agarwood.',
  'Assam''s forests carry a scent of their own — resin, damp bark, and agarwood trees that have stood for generations. Into the Forest draws on Karbi Anglong dhuna and native agarwood to bring that depth indoors.',
  array['Agarwood', 'Dhuna resin', 'Forest floor', 'Eucalyptus'],
  array['Assam agarwood', 'Karbi Anglong dhuna resin', 'Eucalyptus essential oil', 'Natural essential oils', 'Bamboo core', 'Joss powder binder'],
  'Light the tip until it glows, then gently blow out the flame. Rest the stick in a heat-safe holder and allow the fragrance to settle in a ventilated room.',
  'woody',
  'Into the Forest — Assam Agarwood & Dhuna Incense | Cense',
  'A deep woody incense blending Assam agarwood, Karbi Anglong dhuna and eucalyptus, handcrafted in small batches by rural women in Assam.',
  array['woody', 'agarwood']
)
on conflict (id) do nothing;

insert into product_variants (id, product_id, label, weight_grams, burn_time_minutes, price, compare_at_price, stock, sku)
values
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0000-000000000003', '40g · 20 sticks', 40, 50, 48000, null, 90, 'CENSE-ITF-40'),
  ('00000000-0000-0000-0003-000000000002', '00000000-0000-0000-0000-000000000003', '80g · 40 sticks', 80, 50, 88000, null, 55, 'CENSE-ITF-80')
on conflict (id) do nothing;

-- Sample coupon ---------------------------------------------------------------
insert into coupons (code, type, value, min_order_value, usage_limit, expires_at, is_active)
values ('WELCOME10', 'percentage', 10, 0, 500, now() + interval '1 year', true)
on conflict (code) do nothing;

-- Journal ---------------------------------------------------------------------
insert into journal_posts (slug, title, excerpt, content, published_at, seo_title, seo_description)
values
  (
    'second-life-of-temple-flowers',
    'The Second Life of Temple Flowers',
    'Every day, tonnes of flowers are offered at temples across India and cleared away as waste by evening. Here is what happens when they aren''t.',
    'Every day, tonnes of flowers are offered at temples across India — and cleared away as waste by evening. At the Kamakhya Temple, that means marigold, rose and jasmine, gathered in baskets and taken to the river or the landfill within hours of being offered.

Cense began with a simple question: what if those flowers had a second life? Working with a small collective of women in Assam, we now recover a portion of these temple flowers, dry them by hand, and grind them into a base for incense — blended with dhuna resin from Karbi Anglong and agarwood native to the region.

The result isn''t a religious product. It''s a fragrance house that happens to start where devotion ends, treating what was offered with the same care it was given the first time.',
    '2026-01-12',
    'The Second Life of Temple Flowers | Cense Journal',
    'How Cense recovers flowers offered at the Kamakhya Temple and transforms them into premium incense, working with rural women across Assam.'
  ),
  (
    'why-charcoal-free-matters',
    'Why We Don''t Use Charcoal',
    'Most conventional incense relies on charcoal as a base — cheap, fast-burning, and heavy with smoke. Here''s why we chose otherwise.',
    'Most conventional incense relies on charcoal as a combustible base — it''s cheap, burns predictably, and is heavy with smoke. Cense uses a joss powder and natural binder base instead, built around reclaimed temple flowers, dhuna resin and essential oils.

The difference shows in the burn: a slower release, a lighter smoke, and a scent that reads closer to the raw materials themselves rather than a charcoal aftertaste layered on top.',
    '2026-02-03',
    'Why Cense Is Charcoal-Free | Cense Journal',
    'Cense incense is built on a joss powder and natural binder base instead of charcoal — here is why that matters for scent and for smoke.'
  )
on conflict (slug) do nothing;

-- FAQs --------------------------------------------------------------------
insert into faqs (category, question, answer, "position")
values
  ('shipping', 'Where do you ship, and how long does delivery take?', 'We currently ship across India. Orders are dispatched within 1-2 business days and typically arrive within 4-7 business days depending on your location.', 0),
  ('shipping', 'Is shipping free?', 'Shipping is free on orders above the threshold shown at checkout. Below that, a flat shipping fee is calculated automatically at checkout.', 1),
  ('returns', 'Can I return or exchange an opened product?', 'As incense is a consumable product, we''re unable to accept returns on opened packs. If your order arrives damaged or incorrect, contact us within 48 hours and we''ll make it right.', 0),
  ('safety', 'Is Cense incense safe to burn indoors?', 'Yes, when used as directed. Always burn incense in a ventilated room, on a heat-safe holder, away from flammable materials, children and pets.', 0),
  ('burning', 'How do I get the best burn from a stick?', 'Light the tip until it glows orange, then gently blow out the flame — do not leave it burning with an open flame. Rest it in a heat-safe holder and let it burn undisturbed.', 0),
  ('ingredients', 'What is joss powder?', 'Joss powder is a natural plant-based binder that holds the incense paste together around the bamboo core. It contains no charcoal and no synthetic fillers.', 0)
on conflict do nothing;

-- Homepage banner ---------------------------------------------------------
insert into banners (key, heading, subheading, cta_label, cta_href, is_active)
values ('home-hero', 'Where devotion becomes fragrance.', 'Handcrafted incense from Assam, made from flowers offered at the Kamakhya Temple.', 'Shop Now', '/shop', true)
on conflict (key) do nothing;
