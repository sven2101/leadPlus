ALTER TABLE customer ALTER COLUMN company TYPE character varying(500);

ALTER TABLE lead ALTER COLUMN message TYPE character varying(20000);
ALTER TABLE offer ALTER COLUMN message TYPE character varying(20000);
ALTER TABLE sale ALTER COLUMN message TYPE character varying(20000);