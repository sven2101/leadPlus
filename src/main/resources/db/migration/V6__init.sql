-- Sequence: source_id_seq
CREATE SEQUENCE source_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
  
-- Table: source

CREATE TABLE IF NOT EXISTS source
(
  id bigint NOT NULL DEFAULT nextval('source_id_seq'::regclass),
  name character varying(100) NOT NULL,
  description character varying(500),
  deactivated boolean NOT NULL,
  deleted boolean NOT NULL,
  CONSTRAINT source_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

CREATE UNIQUE INDEX source_unique_idx on source (LOWER(name));  

ALTER TABLE process
ADD source_fk bigint;

ALTER TABLE process
ADD CONSTRAINT source_foreignkey FOREIGN KEY (source_fk)
REFERENCES source (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE  product
ALTER COLUMN description TYPE character varying(3000);

ALTER TABLE "user" DROP CONSTRAINT uk_e6gkqunxajvyxl5uctpl2vl2p;
CREATE UNIQUE INDEX user_email_unique_idx on "user" (LOWER(email));  