

-- Sequence: "User_id_seq"

CREATE SEQUENCE IF NOT EXISTS hibernate_sequence
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE hibernate_sequence
  OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS "user_id_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE "user_id_seq"
  OWNER TO postgres;
   
-- Sequence: comment_id_seq

CREATE SEQUENCE IF NOT EXISTS comment_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE comment_id_seq
  OWNER TO postgres;
  
-- Sequence: customer_id_seq

CREATE SEQUENCE IF NOT EXISTS customer_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE customer_id_seq
  OWNER TO postgres;

-- Sequence: notification_id_seq

CREATE SEQUENCE IF NOT EXISTS notification_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE notification_id_seq
  OWNER TO postgres;

-- Sequence: orderposition_id_seq

CREATE SEQUENCE IF NOT EXISTS orderposition_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE orderposition_id_seq
  OWNER TO postgres;

-- Sequence: process_id_seq

CREATE SEQUENCE IF NOT EXISTS process_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE process_id_seq
  OWNER TO postgres;

-- Sequence: olap_id_seq

CREATE SEQUENCE IF NOT EXISTS olap_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE olap_id_seq
  OWNER TO postgres;

  
-- Sequence: product_id_seq

CREATE SEQUENCE IF NOT EXISTS product_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE product_id_seq
  OWNER TO postgres;

-- Sequence: smtp_id_seq

CREATE SEQUENCE IF NOT EXISTS smtp_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE smtp_id_seq
  OWNER TO postgres;

-- Sequence: template_id_seq

CREATE SEQUENCE IF NOT EXISTS template_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE template_id_seq
  OWNER TO postgres;

-- Sequence: vendor_id_seq

CREATE SEQUENCE IF NOT EXISTS vendor_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE vendor_id_seq
  OWNER TO postgres;

  -- Sequence: vendor_id_seq

CREATE SEQUENCE IF NOT EXISTS fileupload_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE fileupload_id_seq
  OWNER TO postgres;

  -- Sequence: workflow_id_seq

CREATE SEQUENCE IF NOT EXISTS workflow_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE workflow_id_seq
  OWNER TO postgres;







-- Table: hibernate_sequences

CREATE TABLE IF NOT EXISTS hibernate_sequences
(
  sequence_name character varying(255) NOT NULL,
  next_val bigint,
  CONSTRAINT hibernate_sequences_pkey PRIMARY KEY (sequence_name)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE hibernate_sequences
  OWNER TO postgres;

  
-- Table: Olap

CREATE TABLE IF NOT EXISTS olap
(
  id bigint NOT NULL DEFAULT nextval('olap_id_seq'::regclass),
  daterange smallint NOT NULL,
  "timestamp" timestamp without time zone,
  profit bytea NOT NULL,
  turnover bytea NOT NULL,
  leads bytea NOT NULL,
  offers bytea NOT NULL,
  sales bytea NOT NULL,
  products bytea,
  users bytea,
  CONSTRAINT olap_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE olap
  OWNER TO postgres;
    
  
-- Table: template

CREATE TABLE IF NOT EXISTS template
(
  id bigint NOT NULL DEFAULT nextval('template_id_seq'::regclass),
  content character varying(30000),
  deactivated boolean NOT NULL,
  description character varying(255),
  name character varying(255),
  CONSTRAINT template_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE template
  OWNER TO postgres;
  
-- Table: vendor

CREATE TABLE IF NOT EXISTS vendor
(
  id bigint NOT NULL DEFAULT nextval('vendor_id_seq'::regclass),
  deleted boolean NOT NULL,
  name character varying(255),
  phone character varying(255),
  CONSTRAINT vendor_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vendor
  OWNER TO postgres;
  
-- Table: fileupload

CREATE TABLE IF NOT EXISTS fileupload
(
  id bigint NOT NULL DEFAULT nextval('fileupload_id_seq'::regclass),
  content bytea,
  deleted boolean NOT NULL,
  filename character varying(255),
  mimetype character varying(255),
  size bigint NOT NULL,
  CONSTRAINT fileupload_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fileupload
  OWNER TO postgres;
  
-- Table: "User"

CREATE TABLE IF NOT EXISTS "user"
(
  id bigint NOT NULL DEFAULT nextval('"user_id_seq"'::regclass),
  email character varying(50) NOT NULL UNIQUE,
  enabled boolean NOT NULL,
  firstname character varying(50) NOT NULL,
  language character varying(255),
  lastname character varying(50) NOT NULL,
  password character varying(60) NOT NULL,
  phone character varying(50),
  skype character varying(50),
  fax character varying(50),
  job character varying(50),
  role character varying(255),
  username character varying(30),	
  picture_id bigint,
  CONSTRAINT "user_pkey" PRIMARY KEY (id),
  CONSTRAINT fkoxacr7c2iwurvyel2h0jwblu3 FOREIGN KEY (picture_id)
      REFERENCES fileupload (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_e6gkqunxajvyxl5uctpl2vl2p UNIQUE (email)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "user"
  OWNER TO postgres;
  
-- Table: customer

CREATE TABLE IF NOT EXISTS customer
(
  id bigint NOT NULL DEFAULT nextval('customer_id_seq'::regclass),
  address character varying(255),
  company character varying(255),
  deactivated boolean NOT NULL,
  deleted boolean NOT NULL,
  email character varying(255) UNIQUE,
  firstname character varying(255),
  lastname character varying(255),
  phone character varying(255),
  customerNumber bigint,
  "timestamp" timestamp without time zone,
  title character varying(255),
  CONSTRAINT customer_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE customer
  OWNER TO postgres;

    
-- Table: product

CREATE TABLE IF NOT EXISTS product
(
  id bigint NOT NULL DEFAULT nextval('product_id_seq'::regclass),
  deactivated boolean NOT NULL,
  deleted boolean NOT NULL,
  description character varying(255),
  name character varying(255),
  pricenetto double precision NOT NULL,
  productstate character varying(255),
  "timestamp" timestamp without time zone,
  picture_id bigint,
  CONSTRAINT product_pkey PRIMARY KEY (id),
  CONSTRAINT fkgk3l6scw566juj92do6pam2cu FOREIGN KEY (picture_id)
      REFERENCES fileupload (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE product
  OWNER TO postgres;

-- Table: sale

CREATE TABLE IF NOT EXISTS sale
(
  id bigint NOT NULL DEFAULT nextval('workflow_id_seq'::regclass),
  deleted boolean NOT NULL,
  deliveryaddress character varying(255),
  deliverycosts double precision NOT NULL,
  message character varying(4096),
  "timestamp" timestamp without time zone,
  customer_fk bigint,
  vendor_fk bigint,
  salecost double precision NOT NULL,
  saleprofit double precision NOT NULL,
  saleturnover double precision NOT NULL,
  invoicenumber character varying(255) NOT NULL,
  CONSTRAINT sale_pkey PRIMARY KEY (id),
  CONSTRAINT fk_ahdkaweufsvpdg3va553r1mux FOREIGN KEY (vendor_fk)
      REFERENCES vendor (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_ct3vox68jijco10m45g8uknwi FOREIGN KEY (customer_fk)
      REFERENCES customer (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sale
  OWNER TO postgres;

-- Table: lead

CREATE TABLE IF NOT EXISTS lead
(
  id bigint NOT NULL DEFAULT nextval('workflow_id_seq'::regclass),
  deleted boolean NOT NULL,
  deliveryaddress character varying(255),
  deliverycosts double precision NOT NULL,
  message character varying(4096),
  "timestamp" timestamp without time zone,
  customer_fk bigint,
  vendor_fk bigint,
  CONSTRAINT lead_pkey PRIMARY KEY (id),
  CONSTRAINT fk_5v5svtjdrmdst1upmokemw3t1 FOREIGN KEY (vendor_fk)
      REFERENCES vendor (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_j8ed31r497xe5119inlsg007l FOREIGN KEY (customer_fk)
      REFERENCES customer (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE lead
  OWNER TO postgres;


-- Table: offer

CREATE TABLE IF NOT EXISTS offer
(
  id bigint NOT NULL DEFAULT nextval('workflow_id_seq'::regclass),
  deleted boolean NOT NULL,
  deliveryaddress character varying(255),
  deliverycosts double precision NOT NULL,
  message character varying(4096),
  "timestamp" timestamp without time zone,
  customer_fk bigint,
  vendor_fk bigint,
  deliverydate timestamp with time zone,
  offerprice double precision NOT NULL,
 
  CONSTRAINT offer_pkey PRIMARY KEY (id),
  CONSTRAINT fk_6mogpqxa4c87k261g07yentij FOREIGN KEY (vendor_fk)
      REFERENCES vendor (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_d552vlot1wyami90791a3ru5e FOREIGN KEY (customer_fk)
      REFERENCES customer (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION  
)
WITH (
  OIDS=FALSE
);
ALTER TABLE offer
  OWNER TO postgres;

-- Table: orderposition

CREATE TABLE IF NOT EXISTS orderposition
(
  id bigint NOT NULL DEFAULT nextval('orderposition_id_seq'::regclass),
  amount integer NOT NULL,
  deleted boolean NOT NULL,
  discount double precision NOT NULL,
  price double precision NOT NULL,
  product_id bigint,
  workflow_id bigint NOT NULL,
  CONSTRAINT orderposition_pkey PRIMARY KEY (id),
  CONSTRAINT fkm30o7q4mt907eab95uadthrk7 FOREIGN KEY (product_id)
      REFERENCES product (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE orderposition
  OWNER TO postgres;

-- Table: process

CREATE TABLE IF NOT EXISTS process
(
  id bigint NOT NULL DEFAULT nextval('process_id_seq'::regclass),
  deleted boolean NOT NULL,
  status character varying(255),
  lead_fk bigint,
  offer_fk bigint,
  processor_fk bigint,
  sale_fk bigint,
  CONSTRAINT process_pkey PRIMARY KEY (id),
  CONSTRAINT fk6v5v8xuq66hbyo1ueqvgw0vpv FOREIGN KEY (sale_fk)
      REFERENCES sale (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkaqx9t3438r0uimn8usf67g3o FOREIGN KEY (processor_fk)
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkgkqv2uyptgvaaed0g66wj5tws FOREIGN KEY (lead_fk)
      REFERENCES lead (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fknl7jxrsktrmjdjwbhqb1qcq9m FOREIGN KEY (offer_fk)
      REFERENCES offer (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE process
  OWNER TO postgres;

-- Table: notification

CREATE TABLE IF NOT EXISTS notification
(
  id bigint NOT NULL DEFAULT nextval('notification_id_seq'::regclass),
  process_id bigint NOT NULL,
  notificationtype character varying(255),
  content character varying(30000),
  deleted boolean NOT NULL,
  recipient character varying(255),
  subject character varying(255),
  attachment_id bigint,
  CONSTRAINT notification_pkey PRIMARY KEY (id),
  CONSTRAINT fker61rsj10b0uasld2vim4ym2e FOREIGN KEY (attachment_id)
      REFERENCES fileupload (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
   CONSTRAINT notification_process FOREIGN KEY (process_id)
      REFERENCES process (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE notification
  OWNER TO postgres;
 
 
-- Table: comment

CREATE TABLE IF NOT EXISTS comment
(
  id bigint NOT NULL DEFAULT nextval('comment_id_seq'::regclass),
  commenttext character varying(5000),
  deleted boolean NOT NULL,
  "timestamp" timestamp with time zone,
  creator_fk bigint NOT NULL,
  process_id bigint NOT NULL,
  CONSTRAINT comment_pkey PRIMARY KEY (id),
  CONSTRAINT fk1wni9g8xoxv69t0p8gqf1l9u4 FOREIGN KEY (creator_fk)
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk260uoiig31xoni9ap126hrbjq FOREIGN KEY (process_id)
      REFERENCES process (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE comment
  OWNER TO postgres;

-- Table: smtp

CREATE TABLE IF NOT EXISTS smtp
(
  id bigint NOT NULL DEFAULT nextval('smtp_id_seq'::regclass),
  connection boolean NOT NULL,
  email character varying(255) NOT NULL,
  encryption integer NOT NULL,
  host character varying(255) NOT NULL,
  iv bytea NOT NULL,
  password bytea NOT NULL,
  port integer NOT NULL ,
  salt bytea NOT NULL,
  sender character varying(255) NOT NULL,
  username character varying(255) NOT NULL,
  user_id bigint NOT NULL,
  CONSTRAINT smtp_pkey PRIMARY KEY (id),
  CONSTRAINT fkgmivoqfpw4ssva180dtvkcln0 FOREIGN KEY (user_id)
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE smtp
  OWNER TO postgres; 