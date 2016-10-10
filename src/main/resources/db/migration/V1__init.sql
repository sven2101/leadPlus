
-- Sequence: tenant_id_seq

CREATE SEQUENCE IF NOT EXISTS public.tenant_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE tenant_id_seq
  OWNER TO postgres;

-- Table: tenant

CREATE TABLE IF NOT EXISTS public.tenant
(
  id bigint NOT NULL DEFAULT nextval('tenant_id_seq'::regclass),
  address character varying(255),
  description character varying(255),
  enabled boolean NOT NULL,
  tenant_key character varying(255),
  CONSTRAINT tenant_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.tenant
  OWNER TO postgres; 