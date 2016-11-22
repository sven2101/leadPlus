
-- Table: attachment

CREATE SEQUENCE attachment_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
  
CREATE TABLE IF NOT EXISTS attachment
(
  id bigint NOT NULL DEFAULT nextval('attachment_id_seq'::regclass),
  fileUpload_fk bigint NOT NULL,
  notification_fk bigint NOT NULL,
  deleted boolean NOT NULL,
  CONSTRAINT attachment_pkey PRIMARY KEY (id),
  CONSTRAINT attachment_fileUpload_fk FOREIGN KEY (fileUpload_fk)
      REFERENCES fileupload (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT attachment_notification_fk FOREIGN KEY (notification_fk)
      REFERENCES notification (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

ALTER TABLE notification RENAME COLUMN recipient TO recipients;
ALTER TABLE notification ADD COLUMN recipients_cc character varying(255);
ALTER TABLE notification ADD COLUMN recipients_bcc character varying(255);

ALTER TABLE offer
ADD vat double precision NOT NULL DEFAULT (19);

ALTER TABLE "user"
ADD default_vat double precision NOT NULL DEFAULT (19);
 
DELETE FROM olap;

