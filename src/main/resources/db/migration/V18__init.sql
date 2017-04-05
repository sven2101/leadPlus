CREATE SEQUENCE IF NOT EXISTS api_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 2
  CACHE 1;
  
CREATE TABLE api
(
  id bigint NOT NULL DEFAULT nextval('api_id_seq'::regclass),
  authentication_key character varying(255) NOT NULL,
  authentication_value character varying(255) NOT NULL,
  iv bytea,
  password bytea,
  salt bytea,
  tenant character varying(255) NOT NULL,
  version character varying(255) NOT NULL,
  is_verified boolean NOT NULL,
  is_deactivated boolean NOT NULL,
  api_vendor character varying(255) NOT NULL,
  CONSTRAINT api_pkey PRIMARY KEY (id)
);