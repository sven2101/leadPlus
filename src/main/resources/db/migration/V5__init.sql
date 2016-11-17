
-- Sequence: "Processor_id_seq"

CREATE SEQUENCE "processor_id_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
  
  CREATE TABLE processor
(
  id bigint NOT NULL DEFAULT nextval('processor_id_seq'::regclass),
  deleted boolean NOT NULL,
  activity character varying(255),
  "timestamp" timestamp without time zone,
  user_fk bigint,
  process_fk bigint,
  CONSTRAINT processor_pkey PRIMARY KEY (id),
  CONSTRAINT processor_user FOREIGN KEY (user_fk)
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
   CONSTRAINT processor_processor FOREIGN KEY (process_fk)
      REFERENCES process (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

ALTER TABLE offer
ADD vat double precision NOT NULL DEFAULT (19);

ALTER TABLE "user"
ADD default_vat double precision NOT NULL DEFAULT (19);
 
DELETE FROM olap;

