ALTER TABLE demo.lead ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE demo.lead ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE demo.offer ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE demo.offer ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE demo.sale ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE demo.sale ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE demo.process ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE demo.process ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE demo.customer ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE demo.customer ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE demo.product ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE demo.product ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE demo.source ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE demo.source ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

ALTER TABLE demo.template ADD COLUMN last_edited timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc');
ALTER TABLE demo.template ADD COLUMN last_editor character varying(50) NOT NULL DEFAULT 'system';

