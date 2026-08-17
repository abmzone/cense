-- Seed data for Cense. Run after 0001_init.sql.
-- Product IDs are fixed so this file can be re-run safely with `on conflict`.

-- tax_rate_percent is 0 by default: an unregistered seller (no GST) should
-- not display a separate tax line at all. Only set this above 0 once
-- GST-registered, and re-add the "Tax" line in the checkout/invoice/order
-- UI (removed for the same reason).
insert into settings (id, free_shipping_threshold, standard_shipping_fee, minimum_shipping_fee, tax_rate_percent, cod_enabled)
values (1, 49900, 6900, 15000, 0, true)
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
  ('00000000-0000-0000-0001-000000000001', '00000000-0000-0000-0000-000000000001', '20 sticks', 40, 45, 8500, null, 120, 'CENSE-WFR-40')
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
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000002', '20 sticks', 40, 40, 8500, null, 100, 'CENSE-RMG-40')
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
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0000-000000000003', '20 sticks', 40, 50, 8500, null, 90, 'CENSE-ITF-40')
on conflict (id) do nothing;

-- The Complete Collection (combo) ---------------------------------------------
insert into products (id, slug, name, tagline, description, story, fragrance_notes, ingredients, directions, collection, seo_title, seo_description, tags)
values (
  '00000000-0000-0000-0000-000000000004',
  'the-complete-collection',
  'The Complete Collection',
  'Three fragrances · One landscape',
  'Bring the full Cense experience home. One 20-stick box of each fragrance — Where the Flowers Rested, Rain Meets the Grass, and Into the Forest — together in one set.',
  'Some mornings call for hibiscus and rose. Some call for rain on warm stone. Some call for the quiet of a forest. The Complete Collection is for when you are not sure which — one box of each, so the choice can wait until the moment asks for it.',
  array['Hibiscus & Rose', 'Lemongrass & Rain', 'Agarwood & Dhuna'],
  array['Reclaimed temple flowers (hibiscus, rose, marigold, jasmine)', 'Lemongrass, citronella, vetiver and patchouli essential oils', 'Assam agarwood', 'Karbi Anglong dhuna resin', 'Bamboo core', 'Joss powder binder'],
  'Light the tip until it glows, then gently blow out the flame. Rest the stick in a heat-safe holder and allow the fragrance to settle in a ventilated room.',
  'combo',
  'The Complete Collection — All Three Cense Fragrances | Cense',
  'One box each of Where the Flowers Rested, Rain Meets the Grass, and Into the Forest — the full Cense range in one set.',
  array['combo', 'gift-set', 'bestseller']
)
on conflict (id) do nothing;

insert into product_variants (id, product_id, label, weight_grams, burn_time_minutes, price, compare_at_price, stock, sku)
values
  ('00000000-0000-0000-0004-000000000001', '00000000-0000-0000-0000-000000000004', '20 x 3 sticks', 120, 45, 23000, 25500, 50, 'CENSE-COMBO-SET')
on conflict (id) do nothing;

-- Sample coupon ---------------------------------------------------------------
insert into coupons (code, type, value, min_order_value, usage_limit, expires_at, is_active)
values ('WELCOME10', 'percentage', 10, 0, 500, now() + interval '1 year', true)
on conflict (code) do nothing;

-- Journal ---------------------------------------------------------------------
insert into journal_posts (slug, title, excerpt, content, cover_image, published_at, seo_title, seo_description)
values
  (
    'second-life-of-temple-flowers',
    'From an Offering to a Fragrance',
    'Every day, flowers are offered at the Kamakhya Temple as acts of devotion. Here is how a part of their story travels beyond the temple.',
    'There''s a particular hour at Kamakhya, just after sunrise, when the walk up to the temple is already crowded — not with tourists yet, but with people who come every single day. Flower sellers arranging hibiscus into small woven baskets. Someone ringing a bell somewhere out of sight. The smell of the previous night''s incense still hanging in the stone corridors. We''ve stood in that crowd more mornings than we can count, and it never quite stops feeling like the start of something, even though for the temple it''s simply Tuesday.

Hibiscus, marigold, rose, jasmine — these are offered by the thousands, every day, as acts of devotion that have nothing to do with us. That''s important to say plainly, because it would be easy to romanticise it otherwise. People come to Kamakhya for reasons that are theirs alone. We''re not part of that moment. We arrive after it.

What happens next is the part we do get to be involved in. After their ritual journey, a portion of these flowers is carefully collected rather than left behind. They''re dried by hand, over several days, spread out and turned so they don''t clump or mould — a slower process than it sounds, and one that a small collective of women artisans in Assam has gotten quietly excellent at. Once dry, the petals are ground into a fine base and blended with dhuna resin carried down from the hills of Karbi Anglong, and agarwood that''s native to this part of the country. Nothing synthetic gets added at any point. It''s a slow way to make something, but it''s the only way we''ve found that keeps the flowers recognisable in the finished stick — not just as an ingredient, but as the actual thing they were.

Cense started with a question more than a plan: what if the spirit of a place could be carried home in a scent, the way a photograph carries a moment? Assam has a particular smell to it that''s hard to describe to anyone who hasn''t spent time here — wet stone, resin, something floral underneath all of it. We wanted to bottle that, and Kamakhya felt like the right place to start, given how much of the temple''s daily life already runs on flowers and fire.

We want to be careful here, because this isn''t a religious product and we don''t want to imply otherwise. We''re not claiming that a Cense stick carries divine energy, or that burning one does anything more than fill a room with a fragrance we happen to think is worth your time. What we are saying is that the flowers themselves travel — from an act of devotion at the temple, through a few quiet days of drying and grinding in Assam, into a box, and eventually onto a shelf or a windowsill in someone''s home. The same flower, further along in its life, doing something useful with the time it has left.

That''s also, incidentally, where the sustainability part of this story sits — not at the front of it, but underneath. By collecting these flowers instead of letting them go to landfill, we keep a fair amount of organic material out of the waste stream. It''s a real benefit, and we''re glad it exists, but it was never the whole reason we started. The reason was closer to what''s happening in the photo above: a single stick, in a plain wooden holder, on an ordinary table, with light coming through the window and smoke going somewhere it doesn''t matter. Devotion, then distance, then a fragrance in someone''s home. That''s the whole arc, really. We just happened to be the ones who got to shape it.',
    '/journal/offering-to-fragrance.jpg',
    '2026-01-12',
    'From an Offering to a Fragrance | Cense Journal',
    'How Cense transforms flowers offered at the Kamakhya Temple into handcrafted incense, working with women artisans across Assam.'
  ),
  (
    'why-charcoal-free-matters',
    'Why We Don''t Use Charcoal',
    'Most conventional incense relies on charcoal as a base — cheap, fast-burning, and heavy with smoke. Here''s why we chose otherwise.',
    'Walk into almost any incense shop in India and you''ll notice the same thing before you notice anything else: soot. A thin grey film on the shelves, on the wall behind the counter, sometimes on the shopkeeper''s fingers. That''s charcoal doing what charcoal does — burning fast, burning hot, and leaving a residue behind. It isn''t a flaw exactly. It''s just what the vast majority of incense in this country is built on, and has been for a very long time.

Charcoal ends up in incense for a simple reason: it''s an excellent combustion base. Mixed into a paste and packed around a bamboo core, it catches easily, burns at a steady, predictable rate, and it''s cheap — genuinely cheap, in a way that matters when you''re producing incense at the volume most of the market demands. None of that is a criticism. It''s physics and economics doing what they do, and it''s why charcoal shows up in almost every mass-market stick you''ve ever bought.

We chose not to build Cense that way, and the reason is less about avoiding something bad and more about wanting something specific. Our sticks are built on a joss powder and natural binder base instead — a plant-derived paste that holds everything together around the bamboo core without needing a fast-burning combustible at its centre. Into that base goes what actually gives Cense its character: reclaimed temple flowers from Kamakhya, dhuna resin carried down from Karbi Anglong, and essential oils drawn from farms across Assam and Meghalaya.

The difference is obvious the moment you light one. A charcoal-based stick tends to flare and then settle into a strong, fairly one-note burn — smoke first, fragrance second. What we use releases more slowly, with a noticeably lighter trail of smoke, and it lets the raw materials speak for themselves instead of layering a charcoal note over everything else. Dhuna smells like dhuna. Agarwood smells like agarwood. You''re not smelling charcoal with hints of something else underneath it.

None of this is us claiming to have invented anything — joss powder bases have been used by incense makers across South and Southeast Asia for a long time. What we can say is that it was a deliberate choice for us, made early on, and one we''ve stuck with even though it''s slower and more expensive than the alternative. Cense was always meant to be a small-batch fragrance house rather than a high-volume incense brand, and the base every stick is built on is one of the clearest ways that shows up before you''ve even lit the first one.',
    '/journal/why-charcoal-free.jpg',
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
