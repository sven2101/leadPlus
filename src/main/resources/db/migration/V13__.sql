-- Sequence: tenant_id_seq
CREATE SEQUENCE IF NOT EXISTS password_forgot_req_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 2
  CACHE 1;
  
CREATE TABLE password_forgot_request
(
  id bigint NOT NULL DEFAULT nextval('password_forgot_req_id_seq'::regclass),
  randomKey character varying(300) NOT NULL UNIQUE,
  "timestamp" timestamp without time zone,
  email character varying(50) NOT NULL,
  resetSmtp boolean NOT NULL,

  CONSTRAINT password_forgot_request_pkey PRIMARY KEY (id)
);