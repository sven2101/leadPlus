
ALTER TABLE  template
ADD notification_type_string character varying(500);

ALTER TABLE  template
ADD source_string character varying(500);

ALTER TABLE  template
ADD subject character varying(255);

ALTER TABLE notification ADD COLUMN user_fk bigint;

ALTER TABLE notification
ADD CONSTRAINT user_foreignkey FOREIGN KEY (user_fk)
REFERENCES "user" (id);
