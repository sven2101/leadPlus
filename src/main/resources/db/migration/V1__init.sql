CREATE SCHEMA IF NOT EXISTS public;

-- Sequence: tenant_id_seq

  
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
  
INSERT INTO public.license(licenseType, trial, term)
    VALUES ('BASIC', false, now())
        ON CONFLICT DO NOTHING;   
  
CREATE SEQUENCE IF NOT EXISTS public.tenant_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.tenant_id_seq
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
  
INSERT INTO public.tenant (address, description, enabled, tenantkey, license_fk)
    VALUES ('Hauptstrasse 55', 'Test Tenant', true, 'tenant', 1)
        ON CONFLICT DO NOTHING; 
