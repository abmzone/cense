-- Repurposes the shipping-floor column added in 0003 into a minimum order
-- value instead (shipping reverted to a simple flat rate below the free
-- threshold, per updated requirements).
alter table settings rename column minimum_shipping_fee to minimum_order_value;
