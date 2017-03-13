ALTER TABLE customer 
ADD COLUMN delivery_address_fk bigint;

ALTER TABLE address 
ALTER COLUMN number TYPE character varying(10);

ALTER TABLE address 
ADD COLUMN deleted boolean NOT NULL;
	
ALTER TABLE customer
ADD CONSTRAINT delivery_address_fk FOREIGN KEY (delivery_address_fk)
REFERENCES address (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE customer
DROP CONSTRAINT customer_address_fk;

ALTER TABLE customer
RENAME address_fk TO billing_address_fk;
    
ALTER TABLE customer
ADD CONSTRAINT billing_address_fk FOREIGN KEY (billing_address_fk)
REFERENCES address (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;
    
ALTER TABLE lead 
ADD COLUMN deliverydate timestamp without time zone;

ALTER TABLE sale 
ADD COLUMN deliverydate timestamp without time zone;

ALTER TABLE lead 
ADD COLUMN delivery_term character varying(255);

ALTER TABLE offer 
ADD COLUMN delivery_term character varying(255);

ALTER TABLE sale 
ADD COLUMN delivery_term character varying(255);

ALTER TABLE lead 
ADD COLUMN payment_term character varying(255);

ALTER TABLE offer 
ADD COLUMN payment_term character varying(255);

ALTER TABLE sale 
ADD COLUMN payment_term character varying(255);

ALTER TABLE offer 
ADD COLUMN billing_address_fk bigint;

ALTER TABLE offer
ADD CONSTRAINT billing_address_offer_fk FOREIGN KEY (billing_address_fk)
REFERENCES address (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE lead 
ADD COLUMN billing_address_fk bigint;

ALTER TABLE lead
ADD CONSTRAINT billing_address_lead_fk FOREIGN KEY (billing_address_fk)
REFERENCES address (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE sale 
ADD COLUMN billing_address_fk bigint;

ALTER TABLE sale
ADD CONSTRAINT billing_address_sale_fk FOREIGN KEY (billing_address_fk)
REFERENCES address (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE lead
ADD skonto double precision;

ALTER TABLE offer
ADD skonto double precision;

ALTER TABLE sale
ADD skonto double precision;

ALTER TABLE lead
RENAME deliveryaddress TO deliveryaddress_line;

ALTER TABLE lead 
ADD COLUMN delivery_address_fk bigint;

ALTER TABLE lead
ADD CONSTRAINT deliveryaddress_lead_fk FOREIGN KEY (delivery_address_fk)
REFERENCES address (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE offer
RENAME deliveryaddress TO deliveryaddress_line;

ALTER TABLE offer 
ADD COLUMN delivery_address_fk bigint;

ALTER TABLE offer
ADD CONSTRAINT deliveryaddress_offer_fk FOREIGN KEY (delivery_address_fk)
REFERENCES address (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE sale
RENAME deliveryaddress TO deliveryaddress_line;

ALTER TABLE sale 
ADD COLUMN delivery_address_fk bigint;

ALTER TABLE sale
ADD CONSTRAINT deliveryaddress_sale_fk FOREIGN KEY (delivery_address_fk)
REFERENCES address (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;
