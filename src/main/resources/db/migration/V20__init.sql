ALTER TABLE process ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE process ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE customer ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE customer ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE product ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE product ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE source ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE source ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE template ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE template ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE smtp ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE smtp ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE api ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE api ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE "user" ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE "user" ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE api 
ADD COLUMN deleted boolean NOT NULL DEFAULT false;

ALTER TABLE smtp 
ADD COLUMN deleted boolean NOT NULL DEFAULT false;

ALTER TABLE template 
ADD COLUMN deleted boolean NOT NULL DEFAULT false;

ALTER TABLE "user" 
ADD COLUMN deleted boolean NOT NULL DEFAULT false;

