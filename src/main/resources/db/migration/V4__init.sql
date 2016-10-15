-- Sequence: license_id_seq

CREATE SEQUENCE license_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE license_id_seq
  OWNER TO postgres;

-- Table: license

CREATE TABLE IF NOT EXISTS public.license
(
  id bigint NOT NULL DEFAULT nextval('license_id_seq'::regclass),
  licenseType NOT NULL character varying(255),
  trial boolean NOT NULL,
  "term" timestamp without time zone,
  CONSTRAINT license_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE license
  OWNER TO postgres;

ALTER TABLE public.tenant ADD license_fk bigint NOT NULL;
ALTER TABLE public.tenant ADD FOREIGN KEY (license_fk) REFERENCES public.license(id);
