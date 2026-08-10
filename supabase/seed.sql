-- Seed data for Cense. Run after 0001_init.sql.
-- Product IDs are fixed so this file can be re-run safely with `on conflict`.

-- tax_rate_percent is 0 by default: an unregistered seller (no GST) should
-- not display a separate tax line at all. Only set this above 0 once
-- GST-registered, and re-add the "Tax" line in the checkout/invoice/order
-- UI (removed for the same reason).
insert into settings (id, free_shipping_threshold, standard_shipping_fee, minimum_shipping_fee, tax_rate_percent, cod_enabled)
values (1, 49900, 6900, 15000, 0, false)
on conflict (id) do nothing;

-- Where the Flowers Rested ---------------------------------------------------
insert into products (id, slug, name, tagline, description, story, fragrance_notes, ingredients, directions, collection, seo_title, seo_description, tags)
values (
  '00000000-0000-0000-0000-000000000001',
  'where-the-flowers-rested',
  'Where the Flowers Rested',
  'Floral · Soft · Devotional',
  'The fragrance of devotion. Rose, hibiscus and jasmine offered at the Kamakhya Temple, carried into a soft floral incense blended with Karbi Anglong dhuna and Assam agarwood.',
  'Every morning, hibiscus, marigolds, roses and jasmine are offered at the Kamakhya Temple as acts of devotion. Where the Flowers Rested carries a part of that offering forward — the same petals, dried and reground by hand, folded into a fragrance that lets the ritual travel beyond the temple.',
  array['Hibiscus', 'Rose', 'Jasmine', 'Temple flowers', 'Soft musk'],
  array['Reclaimed temple flowers (hibiscus, rose, marigold, jasmine)', 'Karbi Anglong dhuna resin', 'Assam agarwood powder', 'Natural essential oils', 'Bamboo core', 'Joss powder binder'],
  'Light the tip until it glows, then gently blow out the flame. Rest the stick in a heat-safe holder and allow the fragrance to settle in a ventilated room.',
  'floral',
  'Where the Flowers Rested — Temple Flower Incense | Cense',
  'A soft floral incense handcrafted from flowers offered at the Kamakhya Temple, blended with Assam agarwood and Karbi Anglong dhuna.',
  array['floral', 'temple-flowers', 'bestseller']
)
on conflict (id) do nothing;

insert into product_variants (id, product_id, label, weight_grams, burn_time_minutes, price, compare_at_price, stock, sku)
values
  ('00000000-0000-0000-0001-000000000001', '00000000-0000-0000-0000-000000000001', '40g · 20 sticks', 40, 45, 8500, null, 120, 'CENSE-WFR-40')
on conflict (id) do nothing;

-- Rain Meets the Grass --------------------------------------------------------
insert into products (id, slug, name, tagline, description, story, fragrance_notes, ingredients, directions, collection, seo_title, seo_description, tags)
values (
  '00000000-0000-0000-0000-000000000002',
  'rain-meets-the-grass',
  'Rain Meets the Grass',
  'Fresh · Green · Monsoon',
  'The scent of an Assam monsoon. Fresh lemongrass, rain-washed earth and green botanicals, capturing the moment before the rains break over the valley.',
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
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000002', '40g · 20 sticks', 40, 40, 8500, null, 100, 'CENSE-RMG-40')
on conflict (id) do nothing;

-- Into the Forest ---------------------------------------------------------
insert into products (id, slug, name, tagline, description, story, fragrance_notes, ingredients, directions, collection, seo_title, seo_description, tags)
values (
  '00000000-0000-0000-0000-000000000003',
  'into-the-forest',
  'Into the Forest',
  'Woody · Resinous · Deep',
  'The deep fragrance of Assam''s forests. Native agarwood and resinous dhuna, unhurried and quiet, drawn from the forests of the Northeast.',
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
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0000-000000000003', '40g · 20 sticks', 40, 50, 8500, null, 90, 'CENSE-ITF-40')
on conflict (id) do nothing;

-- The Complete Collection (combo) ---------------------------------------------
insert into products (id, slug, name, tagline, description, story, fragrance_notes, ingredients, directions, collection, seo_title, seo_description, tags)
values (
  '00000000-0000-0000-0000-000000000004',
  'the-complete-collection',
  'The Complete Collection',
  'Three fragrances · One landscape',
  'Bring the full Cense experience home. One 40g box of each fragrance — Where the Flowers Rested, Rain Meets the Grass, and Into the Forest — together in one set.',
  'Some mornings call for hibiscus and rose. Some call for rain on warm stone. Some call for the quiet of a forest. The Complete Collection is for when you are not sure which — one box of each, so the choice can wait until the moment asks for it.',
  array['Hibiscus & Rose', 'Lemongrass & Rain', 'Agarwood & Dhuna'],
  array['Reclaimed temple flowers (hibiscus, rose, marigold, jasmine)', 'Lemongrass, citronella, vetiver and patchouli essential oils', 'Assam agarwood', 'Karbi Anglong dhuna resin', 'Bamboo core', 'Joss powder binder'],
  'Light the tip until it glows, then gently blow out the flame. Rest the stick in a heat-safe holder and allow the fragrance to settle in a ventilated room.',
  'combo',
  'The Complete Collection — All Three Cense Fragrances | Cense',
  'One box each of Where the Flowers Rested, Rain Meets the Grass, and Into the Forest — the full Cense range in one gift set.',
  array['combo', 'gift-set', 'bestseller']
)
on conflict (id) do nothing;

insert into product_variants (id, product_id, label, weight_grams, burn_time_minutes, price, compare_at_price, stock, sku)
values
  ('00000000-0000-0000-0004-000000000001', '00000000-0000-0000-0000-000000000004', '3 x 40g Gift Set', 120, 45, 21000, 25500, 50, 'CENSE-COMBO-SET')
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
    'From an Offering to a Fragrance',
    'Every day, flowers are offered at the Kamakhya Temple as acts of devotion. Here is how a part of their story travels beyond the temple.',
    'Every day, flowers are offered at the Kamakhya Temple as acts of devotion — hibiscus, marigold, rose and jasmine. After their ritual journey, Cense carefully collects a portion of these flowers, dries them by hand, and grinds them into a base for incense — blended with dhuna resin from Karbi Anglong and agarwood native to Assam.

Cense began with a simple question: what if the spirit of a place could be experienced through fragrance? Working with a small collective of women artisans in Assam, we transform devotion into a scent that carries Kamakhya, and Assam, into the everyday rituals of a home.

The result is not a religious product. It is a fragrance house that begins with devotion and ends at home, treating what was offered with the same care it was given the first time. By giving these flowers a second life, Cense also keeps valuable organic material from becoming waste — a quiet, secondary benefit of a process built around fragrance first.',
    '2026-01-12',
    'From an Offering to a Fragrance | Cense Journal',
    'How Cense transforms flowers offered at the Kamakhya Temple into handcrafted incense, working with women artisans across Assam.'
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
values ('home-hero', 'Handcrafted incense made from Kamakhya Temple flowers.', '', 'Shop the Collection', '/shop', true)
on conflict (key) do nothing;

-- Product photography -----------------------------------------------------
insert into product_images (product_id, url, alt, "position")
values
  ('00000000-0000-0000-0000-000000000001', 'https://fpivffbugbajnoygqnur.supabase.co/storage/v1/object/public/product-images/where-the-flowers-rested-1.jpg', 'Where the Flowers Rested incense box and sticks on a bed of rose, hibiscus, marigold and jasmine petals', 0),
  ('00000000-0000-0000-0000-000000000002', 'https://fpivffbugbajnoygqnur.supabase.co/storage/v1/object/public/product-images/rain-meets-the-grass-1.jpg', 'Rain Meets the Grass incense box and sticks on rain-wet grass with butterfly pea and jasmine flowers', 0),
  ('00000000-0000-0000-0000-000000000003', 'https://fpivffbugbajnoygqnur.supabase.co/storage/v1/object/public/product-images/into-the-forest-1.jpg', 'Into the Forest incense box and sticks resting on a moss-covered log in a forest', 0),
  ('00000000-0000-0000-0000-000000000004', 'https://fpivffbugbajnoygqnur.supabase.co/storage/v1/object/public/product-images/complete-collection-1.jpg', 'All three Cense incense boxes stacked together with loose sticks and a holder', 0)
on conflict do nothing;
