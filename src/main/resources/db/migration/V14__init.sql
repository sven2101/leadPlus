
CREATE TABLE IF NOT EXISTS template_types
(
  template_id BIGINT NOT NULL,
  template_type CHARACTER VARYING(100) NOT NULL,
 
  CONSTRAINT template_types_pk PRIMARY KEY (template_id,template_type),
  CONSTRAINT template_typestemplate_fk FOREIGN KEY (template_id)
      REFERENCES template (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

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

