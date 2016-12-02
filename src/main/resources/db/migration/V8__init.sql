ALTER TABLE fileupload ADD COLUMN content_fk bigint;

-- Sequence: "file_content_seq"

CREATE SEQUENCE file_content_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

  CREATE TABLE file_content
(
  id bigint NOT NULL DEFAULT nextval('file_content_id_seq'::regclass),
  content bytea,
  fileupload_fk bigint
  );
  
INSERT INTO file_content
(content,fileupload_fk)
SELECT content,id
FROM fileupload;

UPDATE fileupload f
SET content_fk=(SELECT id
				FROM file_content
				WHERE fileupload_fk=f.id);				
				
ALTER TABLE file_content
DROP COLUMN fileupload_fk;

ALTER TABLE fileupload
DROP COLUMN content;

