CREATE OR REPLACE function add_template_type_to_template()
  RETURNS bool AS
$func$
BEGIN
    DECLARE    
    rec record;
    BEGIN
        FOR rec IN (SELECT *
		    FROM template t
		    WHERE t.id NOT IN (SELECT t.id
			  FROM template t
			  INNER JOIN template_types tt on t.id = tt.template_id
			  WHERE tt.template_type like 'EMAIL')) LOOP 			   
	 		
	  		 INSERT INTO template_types (template_id,template_type) VALUES (rec.id, 'EMAIL');	 	  		
	 	END LOOP;		
    END;
    RETURN TRUE;
END
$func$ LANGUAGE plpgsql;

SELECT add_template_type_to_template();

DROP FUNCTION IF EXISTS add_template_type_to_template(); 
DROP FUNCTION IF EXISTS f_add_address_col();
DROP FUNCTION IF EXISTS f_add_col();