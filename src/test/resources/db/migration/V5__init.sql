
CREATE SEQUENCE attachment_id_seq
 INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
  
-- Table: attachment
CREATE TABLE IF NOT EXISTS attachment
(
  id bigint NOT NULL DEFAULT nextval('attachment_id_seq'),
  fileUpload_fk bigint NOT NULL,
  notification_fk bigint NOT NULL,
  deleted boolean NOT NULL,
  CONSTRAINT attachment_pkey PRIMARY KEY (id),
  CONSTRAINT attachment_fileUpload_fk FOREIGN KEY (fileUpload_fk)
      REFERENCES fileupload (id) ,
  CONSTRAINT attachment_notification_fk FOREIGN KEY (notification_fk)
      REFERENCES notification (id)
);

ALTER TABLE notification RENAME COLUMN recipient TO recipients;
ALTER TABLE notification ADD COLUMN recipients_cc character varying(255);
ALTER TABLE notification ADD COLUMN recipients_bcc character varying(255);

-- Sequence: "Processor_id_seq"

CREATE SEQUENCE processor_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE TABLE processor
(
  id bigint NOT NULL DEFAULT nextval('processor_id_seq'),
  deleted boolean NOT NULL,
  activity character varying(255),
  "timestamp" timestamp,
  user_fk bigint,
  process_fk bigint,
  CONSTRAINT processor_pkey PRIMARY KEY (id),
  CONSTRAINT processor_user FOREIGN KEY (user_fk)
      REFERENCES "user" (id),
   CONSTRAINT processor_processor FOREIGN KEY (process_fk)
      REFERENCES process (id)
);

ALTER TABLE offer
ADD vat double precision NOT NULL DEFAULT (19);

ALTER TABLE "user"
ADD default_vat double precision NOT NULL DEFAULT (19);
 
DELETE FROM olap;

