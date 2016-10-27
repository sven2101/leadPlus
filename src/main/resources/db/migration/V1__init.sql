CREATE SCHEMA IF NOT EXISTS public;

-- Sequence: tenant_id_seq
CREATE SEQUENCE IF NOT EXISTS public.tenant_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.tenant_id_seq
  OWNER TO postgres;
  
-- Sequence: license_id_seq
CREATE SEQUENCE IF NOT EXISTS public.license_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.license_id_seq
  OWNER TO postgres;

-- Table: license

CREATE TABLE IF NOT EXISTS public.license
(
  id bigint NOT NULL DEFAULT nextval('public.license_id_seq'::regclass),
  licenseType character varying(255) NOT NULL,
  trial boolean NOT NULL,
  "term" timestamp without time zone,
  CONSTRAINT license_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.license
  OWNER TO postgres;

-- Table: tenant

CREATE TABLE IF NOT EXISTS public.tenant
(
  id bigint NOT NULL DEFAULT nextval('public.tenant_id_seq'::regclass),
  address character varying(255),
  description character varying(255),
  enabled boolean NOT NULL,
  tenantkey character varying(50) NOT NULL,
  license_fk bigint NOT NULL,
  CONSTRAINT tenant_unique UNIQUE (tenantkey),
  CONSTRAINT tenant_pkey PRIMARY KEY (id),
  CONSTRAINT tenantLicenceForeignKey FOREIGN KEY (license_fk)
      REFERENCES public.license(id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.tenant
  OWNER TO postgres; 
        