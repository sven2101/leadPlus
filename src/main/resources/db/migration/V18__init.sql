CREATE SEQUENCE IF NOT EXISTS api_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 2
  CACHE 1;
  
CREATE TABLE api
(
  id bigint NOT NULL DEFAULT nextval('api_id_seq'::regclass),
  authenticationKey character varying(255) NOT NULL,
  authenticationValue character varying(255) NOT NULL,
  tenant character varying(255) NOT NULL,
  version character varying(255) NOT NULL,
  isVerified boolean NOT NULL,
  isDeactivated boolean NOT NULL,
  apiVendor character varying(255) NOT NULL,
  CONSTRAINT api_pkey PRIMARY KEY (id)
);