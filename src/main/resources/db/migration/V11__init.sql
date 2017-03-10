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

ALTER TABLE  source
ADD token_id character varying(50);