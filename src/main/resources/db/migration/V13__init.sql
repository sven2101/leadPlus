
CREATE OR REPLACE function f_add_address_col(_tbl regclass)
  RETURNS bool AS
$func$
BEGIN
    DECLARE    
    rec record;
    current_id_billing int;
    current_id_delivery int;
    tbl regclass = _tbl;
    BEGIN
        FOR rec IN EXECUTE format('SELECT * FROM %s WHERE billing_address_fk is null', tbl) LOOP  
	 		 select nextval('address_id_seq') INTO current_id_billing;
	  		 INSERT INTO address (id,deleted) VALUES (current_id_billing, rec.deleted);
	 		 EXECUTE format('UPDATE %s SET billing_address_fk=%s WHERE id=%s', tbl, current_id_billing, rec.id);	  		
	 	END LOOP;
		FOR rec IN EXECUTE format('SELECT * FROM %s WHERE delivery_address_fk is null', tbl) LOOP
			 select nextval('address_id_seq') INTO current_id_delivery;
			 INSERT INTO address (id,deleted) VALUES (current_id_delivery, rec.deleted);
			 EXECUTE format('UPDATE %s SET delivery_address_fk=%s WHERE id=%s', tbl, current_id_delivery, rec.id);   
	 	END LOOP;
    END;
    RETURN TRUE;
END
$func$ LANGUAGE plpgsql;

SELECT f_add_address_col('lead');
SELECT f_add_address_col('offer');
SELECT f_add_address_col('sale');
SELECT f_add_address_col('customer');

