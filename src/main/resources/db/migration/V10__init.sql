ALTER TABLE template 
	ALTER COLUMN content TYPE text;

ALTER TABLE customer 
	ADD COLUMN fax character varying(255);
	
ALTER TABLE customer 
	ADD COLUMN mobile character varying(255);
	
ALTER TABLE customer 
	ADD COLUMN fax character varying(255);

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
)

ALTER TABLE customer 
	ADD address_fk bigint;

ALTER TABLE customer 
	ADD CONSTRAINT address_foreignkey FOREIGN KEY (address_fk)
	REFERENCES address (id);