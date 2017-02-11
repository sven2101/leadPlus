
ALTER TABLE  template
ADD notification_type_string character varying(500);

ALTER TABLE  template
ADD source_string character varying(500);

ALTER TABLE  template
ADD subject character varying(255);

ALTER TABLE notification ADD COLUMN sender_fk bigint;

ALTER TABLE notification
ADD CONSTRAINT sender_foreignkey FOREIGN KEY (sender_fk)
REFERENCES "user" (id);

ALTER TABLE notification ADD COLUMN "timestamp" timestamp without time zone;
