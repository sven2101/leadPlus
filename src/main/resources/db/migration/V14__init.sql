CREATE TABLE IF NOT EXISTS template_types
(
  template_id BIGINT NOT NULL,
  template_type CHARACTER VARYING(100) NOT NULL,
 
  CONSTRAINT template_types_pk PRIMARY KEY (template_id,template_type),
  CONSTRAINT template_typestemplate_fk FOREIGN KEY (template_id)
      REFERENCES template (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);