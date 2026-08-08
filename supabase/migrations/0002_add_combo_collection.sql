-- Allow a "combo" collection value for bundle/gift-set products
-- (e.g. "The Complete Collection" — one of each scent).

alter table products drop constraint products_collection_check;
alter table products add constraint products_collection_check
  check (collection in ('floral', 'fresh', 'woody', 'combo'));
