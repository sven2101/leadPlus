ALTER TABLE template 
	ALTER COLUMN content TYPE text;
	
ALTER TABLE notification 
	ALTER COLUMN content TYPE text;

ALTER TABLE customer 
	ADD COLUMN fax character varying(20);
	
ALTER TABLE customer 
	ADD COLUMN mobile character varying(20);
	
ALTER TABLE customer 
	DROP COLUMN address;

CREATE SEQUENCE "address_id_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
  
CREATE TABLE address
(
  id bigint NOT NULL DEFAULT nextval('"address_id_seq"'::regclass),
  number integer,
  street character varying(255),
  city character varying(255),
  state character varying(255),
  zip character varying(255),
  country character varying(255),
  CONSTRAINT address_pkey PRIMARY KEY (id)
);

ALTER TABLE customer 
	ADD COLUMN address_fk bigint;

ALTER TABLE customer
ADD CONSTRAINT customer_address_fk FOREIGN KEY (address_fk)
REFERENCES address (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;
