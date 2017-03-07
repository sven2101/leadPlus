ALTER TABLE customer 
	ADD COLUMN delivery_address_fk bigint;

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
    
