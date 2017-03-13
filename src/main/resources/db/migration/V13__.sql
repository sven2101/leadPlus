CREATE TABLE password_forgot_request
(
  id bigint NOT NULL,
  "timestamp" timestamp without time zone,
  email character varying(50) NOT NULL,
  CONSTRAINT password_forgot_request_pkey PRIMARY KEY (id)
);