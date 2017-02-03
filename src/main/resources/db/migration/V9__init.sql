ALTER TABLE notification ADD COLUMN user_fk bigint;

ALTER TABLE notification
ADD CONSTRAINT user_foreignkey FOREIGN KEY (user_fk)
REFERENCES "user" (id);