
-- Sequence: "User_id_seq"

CREATE SEQUENCE "user_id_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
   
-- Sequence: comment_id_seq

CREATE SEQUENCE comment_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

-- Sequence: customer_id_seq

CREATE SEQUENCE customer_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

-- Sequence: notification_id_seq

CREATE SEQUENCE notification_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

-- Sequence: orderposition_id_seq

CREATE SEQUENCE orderposition_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

-- Sequence: process_id_seq

CREATE SEQUENCE process_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

-- Sequence: product_id_seq

CREATE SEQUENCE product_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

-- Sequence: smtp_id_seq

CREATE SEQUENCE smtp_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

-- Sequence: template_id_seq

CREATE SEQUENCE template_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

-- Sequence: vendor_id_seq

CREATE SEQUENCE vendor_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
  
 -- Sequence: fileupload_id_seq

CREATE SEQUENCE IF NOT EXISTS fileupload_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

-- Sequence: olap_id_seq

CREATE SEQUENCE IF NOT EXISTS olap_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

 -- Sequence: workflow_id_seq

CREATE SEQUENCE IF NOT EXISTS workflow_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
 

-- Table: hibernate_sequences

CREATE TABLE hibernate_sequences
(
  sequence_name character varying(255) NOT NULL,
  next_val bigint,
  CONSTRAINT hibernate_sequences_pkey PRIMARY KEY (sequence_name)
)
WITH (
  OIDS=FALSE
);
  
-- Table: template

CREATE TABLE template
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
  
-- Table: vendor

CREATE TABLE vendor
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
  
-- Table: fileupload

CREATE TABLE fileupload
(
  id bigint NOT NULL DEFAULT nextval('"fileupload_id_seq"'::regclass),
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
  
-- Table: "User"

CREATE TABLE "user"
(
  id bigint NOT NULL DEFAULT nextval('"user_id_seq"'::regclass),
  email character varying(100) NOT NULL,
  enabled boolean NOT NULL,
  firstname character varying(50) NOT NULL,
  language character varying(50),
  lastname character varying(50) NOT NULL,
  password character varying(60) NOT NULL,
  phone character varying(50),
  skype character varying(50),
  fax character varying(50),
  job character varying(100),
  role character varying(255),
  username character varying(100),	
  picture_fk bigint,
  thumbnail_fk bigint,
  CONSTRAINT "user_pkey" PRIMARY KEY (id),
  CONSTRAINT fkoxacr7c2iwurvyel2h0jwblu3 FOREIGN KEY (picture_fk)
      REFERENCES fileupload (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT thumbnail_fileupload FOREIGN KEY (thumbnail_fk)
      REFERENCES fileupload (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_e6gkqunxajvyxl5uctpl2vl2p UNIQUE (email)
)
WITH (
  OIDS=FALSE
);
  
-- Table: customer

CREATE TABLE customer
(
  id bigint NOT NULL DEFAULT nextval('customer_id_seq'::regclass),
  address character varying(255),
  company character varying(255),
  deactivated boolean NOT NULL,
  deleted boolean NOT NULL,
  email character varying(255),
  firstname character varying(255),
  lastname character varying(255),
  phone character varying(255),
  "timestamp" timestamp without time zone,
  title character varying(255),
  customernumber character varying(255),
  CONSTRAINT customer_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
    
-- Table: product

CREATE TABLE product
(
  id bigint NOT NULL DEFAULT nextval('product_id_seq'::regclass),
  deactivated boolean NOT NULL,
  deleted boolean NOT NULL,
  description character varying(255),
  name character varying(255),
  pricenetto double precision NOT NULL,
  productstate character varying(255),
  productnumber character varying(255),
  "timestamp" timestamp without time zone,
  picture_fk bigint,
  CONSTRAINT product_pkey PRIMARY KEY (id),
  CONSTRAINT fkgk3l6scw566juj92do6pam2cu FOREIGN KEY (picture_fk)
      REFERENCES fileupload (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

-- Table: sale

CREATE TABLE sale
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
  invoicenumber character varying(255),
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

-- Table: lead

CREATE TABLE lead
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

-- Table: offer

CREATE TABLE offer
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

-- Table: orderposition

CREATE TABLE orderposition
(
  id bigint NOT NULL DEFAULT nextval('orderposition_id_seq'::regclass),
  amount integer NOT NULL,
  deleted boolean NOT NULL,
  discount double precision NOT NULL,
  price double precision NOT NULL,
  product_fk bigint,
  workflow_fk bigint NOT NULL,
  CONSTRAINT orderposition_pkey PRIMARY KEY (id),
  CONSTRAINT fkm30o7q4mt907eab95uadthrk7 FOREIGN KEY (product_fk)
      REFERENCES product (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

-- Table: process

CREATE TABLE process
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

-- Table: notification

CREATE TABLE notification
(
  id bigint NOT NULL DEFAULT nextval('notification_id_seq'::regclass),
  process_fk bigint NOT NULL,
  content character varying(30000),
  deleted boolean NOT NULL,
  recipient character varying(255),
  subject character varying(255),
  attachment_fk bigint,
  notificationtype character varying(255) NOT NULL, 
  CONSTRAINT notification_pkey PRIMARY KEY (id),
  CONSTRAINT fker61rsj10b0uasld2vim4ym2e FOREIGN KEY (attachment_fk)
      REFERENCES fileupload (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT notification_process FOREIGN KEY (process_fk)
      REFERENCES process (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
    
-- Table: comment

CREATE TABLE comment
(
  id bigint NOT NULL DEFAULT nextval('comment_id_seq'::regclass),
  commenttext character varying(5000),
  deleted boolean NOT NULL,
  "timestamp" timestamp with time zone,
  creator_fk bigint NOT NULL,
  process_fk bigint NOT NULL,
  CONSTRAINT comment_pkey PRIMARY KEY (id),
  CONSTRAINT fk1wni9g8xoxv69t0p8gqf1l9u4 FOREIGN KEY (creator_fk)
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk260uoiig31xoni9ap126hrbjq FOREIGN KEY (process_fk)
      REFERENCES process (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

-- Table: smtp

CREATE TABLE smtp
(
  id bigint NOT NULL DEFAULT nextval('smtp_id_seq'::regclass),
  connection boolean NOT NULL,
  email character varying(255),
  encryption integer,
  host character varying(255),
  iv bytea,
  password bytea,
  port integer NOT NULL,
  responseadress character varying(255),
  salt bytea,
  sender character varying(255),
  username character varying(255),
  user_fk bigint,
  CONSTRAINT smtp_pkey PRIMARY KEY (id),
  CONSTRAINT fkgmivoqfpw4ssva180dtvkcln0 FOREIGN KEY (user_fk)
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
  
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

   
