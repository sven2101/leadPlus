ALTER TABLE offer RENAME COLUMN offerprice TO net_price;
ALTER TABLE product RENAME COLUMN pricenetto TO net_price;
ALTER TABLE orderposition RENAME COLUMN price TO net_price;