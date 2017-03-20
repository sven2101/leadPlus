CREATE OR REPLACE function f_add_col(_tbl regclass, _col  text, _type regtype)
  RETURNS bool AS
$func$
BEGIN
   IF EXISTS (SELECT 1 FROM pg_attribute
              WHERE  attrelid = _tbl
              AND    attname = _col
              AND    NOT attisdropped) THEN
      RETURN FALSE;
   ELSE
      EXECUTE format('ALTER TABLE %s ADD COLUMN %I %s', _tbl, _col, _type);
      RETURN TRUE;
   END IF;
END
$func$  LANGUAGE plpgsql;

SELECT f_add_col('public.tenant', 'jwt_token_version', 'character varying(50)');

UPDATE public.tenant
SET jwt_token_version='3ed4f054-ea35-4b62-b6e6-6e3b965d8ee0'
WHERE tenantkey='demo';

ALTER TABLE  source
ADD token_id character varying(50);

CREATE SEQUENCE IF NOT EXISTS password_forgot_req_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 2
  CACHE 1;
  
CREATE TABLE password_forgot_request
(
  id bigint NOT NULL DEFAULT nextval('password_forgot_req_id_seq'::regclass),
  randomKey character varying(300) NOT NULL UNIQUE,
  "timestamp" timestamp without time zone,
  email character varying(50) NOT NULL,
  resetSmtp boolean NOT NULL,

  CONSTRAINT password_forgot_request_pkey PRIMARY KEY (id)
);