CREATE SCHEMA IF NOT EXISTS public;
CREATE SCHEMA IF NOT EXISTS demo;

-- Sequence: tenant_id_seq
CREATE SEQUENCE IF NOT EXISTS public.tenant_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 2
  CACHE 1;
  
-- Sequence: license_id_seq
CREATE SEQUENCE IF NOT EXISTS public.license_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 2
  CACHE 1;

-- Table: license

CREATE TABLE IF NOT EXISTS public.license
(
  id bigint NOT NULL DEFAULT nextval('public.license_id_seq'),
  licenseType character varying(255) NOT NULL,
  trial boolean NOT NULL,
  term timestamp,
  CONSTRAINT license_pkey PRIMARY KEY (id)
);

-- Table: tenant

CREATE TABLE IF NOT EXISTS public.tenant
(
  id bigint NOT NULL DEFAULT nextval('public.tenant_id_seq'),
  address character varying(255),
  description character varying(255),
  enabled boolean NOT NULL,
  tenantkey character varying(50) NOT NULL,
  license_fk bigint NOT NULL,
  CONSTRAINT tenant_unique UNIQUE (tenantkey),
  CONSTRAINT tenant_pkey PRIMARY KEY (id),
  CONSTRAINT tenantLicenceForeignKey FOREIGN KEY (license_fk)
      REFERENCES public.license(id)

);
        