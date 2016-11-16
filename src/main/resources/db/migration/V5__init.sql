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

-- Table: recipient

CREATE SEQUENCE recipient_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE TABLE IF NOT EXISTS recipient
(
  id bigint NOT NULL DEFAULT nextval('recipient_id_seq'::regclass),
  email character varying(255) NOT NULL,
  notification_fk bigint NOT NULL,
  recipientType character varying(3) NOT NULL,
  CONSTRAINT recipient_pkey PRIMARY KEY (id),
  CONSTRAINT attachment_notification_fk FOREIGN KEY (notification_fk)
      REFERENCES notification (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);