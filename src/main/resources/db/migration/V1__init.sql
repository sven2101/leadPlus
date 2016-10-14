
-- Sequence: "User_id_seq"

CREATE SEQUENCE public."user_id_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public."user_id_seq"
  OWNER TO postgres;
   
-- Sequence: comment_id_seq

CREATE SEQUENCE public.comment_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.comment_id_seq
  OWNER TO postgres;

-- Sequence: customer_id_seq

CREATE SEQUENCE public.customer_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.customer_id_seq
  OWNER TO postgres;

-- Sequence: notification_id_seq

CREATE SEQUENCE public.notification_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.notification_id_seq
  OWNER TO postgres;

-- Sequence: orderposition_id_seq

CREATE SEQUENCE public.orderposition_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.orderposition_id_seq
  OWNER TO postgres;

-- Sequence: process_id_seq

CREATE SEQUENCE public.process_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.process_id_seq
  OWNER TO postgres;

-- Sequence: product_id_seq

CREATE SEQUENCE public.product_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.product_id_seq
  OWNER TO postgres;

-- Sequence: smtp_id_seq

CREATE SEQUENCE public.smtp_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.smtp_id_seq
  OWNER TO postgres;

-- Sequence: template_id_seq

CREATE SEQUENCE public.template_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.template_id_seq
  OWNER TO postgres;

-- Sequence: vendor_id_seq

CREATE SEQUENCE public.vendor_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.vendor_id_seq
  OWNER TO postgres;











-- Table: hibernate_sequences

CREATE TABLE public.hibernate_sequences
(
  sequence_name character varying(255) NOT NULL,
  next_val bigint,
  CONSTRAINT hibernate_sequences_pkey PRIMARY KEY (sequence_name)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.hibernate_sequences
  OWNER TO postgres;

  
-- Table: template

CREATE TABLE public.template
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
ALTER TABLE public.template
  OWNER TO postgres;
  
-- Table: vendor

CREATE TABLE public.vendor
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
ALTER TABLE public.vendor
  OWNER TO postgres;
  
-- Table: fileupload

CREATE TABLE public.fileupload
(
  id bigint NOT NULL,
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
ALTER TABLE public.fileupload
  OWNER TO postgres;
  
-- Table: "User"

CREATE TABLE public."user"
(
  id bigint NOT NULL DEFAULT nextval('"user_id_seq"'::regclass),
  email character varying(50) NOT NULL,
  enabled boolean NOT NULL,
  firstname character varying(50) NOT NULL,
  language character varying(255),
  lastname character varying(50) NOT NULL,
  password character varying(60) NOT NULL,
  phone character varying(50),
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
ALTER TABLE public."user"
  OWNER TO postgres;
  
-- Table: customer

CREATE TABLE public.customer
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
  CONSTRAINT customer_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.customer
  OWNER TO postgres;

    
-- Table: product

CREATE TABLE public.product
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
ALTER TABLE public.product
  OWNER TO postgres;

-- Table: sale

CREATE TABLE public.sale
(
  id bigint NOT NULL,
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
ALTER TABLE public.sale
  OWNER TO postgres;

-- Table: lead

CREATE TABLE public.lead
(
  id bigint NOT NULL,
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
ALTER TABLE public.lead
  OWNER TO postgres;

-- Table: notification

CREATE TABLE public.notification
(
  id bigint NOT NULL DEFAULT nextval('notification_id_seq'::regclass),
  content character varying(30000),
  deleted boolean NOT NULL,
  recipient character varying(255),
  subject character varying(255),
  attachment_id bigint,
  CONSTRAINT notification_pkey PRIMARY KEY (id),
  CONSTRAINT fker61rsj10b0uasld2vim4ym2e FOREIGN KEY (attachment_id)
      REFERENCES fileupload (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.notification
  OWNER TO postgres;

-- Table: offer

CREATE TABLE public.offer
(
  id bigint NOT NULL,
  deleted boolean NOT NULL,
  deliveryaddress character varying(255),
  deliverycosts double precision NOT NULL,
  message character varying(4096),
  "timestamp" timestamp without time zone,
  customer_fk bigint,
  vendor_fk bigint,
  deliverydate timestamp with time zone,
  offerprice double precision NOT NULL,
  notification_id bigint,
  CONSTRAINT offer_pkey PRIMARY KEY (id),
  CONSTRAINT fk_6mogpqxa4c87k261g07yentij FOREIGN KEY (vendor_fk)
      REFERENCES vendor (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_d552vlot1wyami90791a3ru5e FOREIGN KEY (customer_fk)
      REFERENCES customer (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkh32vdgri1org99pnveo45ln6w FOREIGN KEY (notification_id)
      REFERENCES notification (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.offer
  OWNER TO postgres;

-- Table: orderposition

CREATE TABLE public.orderposition
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
ALTER TABLE public.orderposition
  OWNER TO postgres;

-- Table: process

CREATE TABLE public.process
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
      REFERENCES public.sale (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkaqx9t3438r0uimn8usf67g3o FOREIGN KEY (processor_fk)
      REFERENCES public."user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkgkqv2uyptgvaaed0g66wj5tws FOREIGN KEY (lead_fk)
      REFERENCES public.lead (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fknl7jxrsktrmjdjwbhqb1qcq9m FOREIGN KEY (offer_fk)
      REFERENCES public.offer (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.process
  OWNER TO postgres;

    
-- Table: comment

CREATE TABLE public.comment
(
  id bigint NOT NULL DEFAULT nextval('comment_id_seq'::regclass),
  commenttext character varying(5000),
  deleted boolean NOT NULL,
  "timestamp" timestamp with time zone,
  creator_fk bigint NOT NULL,
  process_id bigint NOT NULL,
  CONSTRAINT comment_pkey PRIMARY KEY (id),
  CONSTRAINT fk1wni9g8xoxv69t0p8gqf1l9u4 FOREIGN KEY (creator_fk)
      REFERENCES public."user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk260uoiig31xoni9ap126hrbjq FOREIGN KEY (process_id)
      REFERENCES public.process (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.comment
  OWNER TO postgres;

-- Table: smtp

CREATE TABLE public.smtp
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
  user_id bigint,
  CONSTRAINT smtp_pkey PRIMARY KEY (id),
  CONSTRAINT fkgmivoqfpw4ssva180dtvkcln0 FOREIGN KEY (user_id)
      REFERENCES public."user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.smtp
  OWNER TO postgres; 