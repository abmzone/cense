-- Adds a floor for shipping charges (a Delhivery-quoted or flat-rate fee
-- below this is bumped up to it) so shipping never undercharges relative
-- to real courier + packaging cost.

alter table settings add column minimum_shipping_fee int not null default 15000;
