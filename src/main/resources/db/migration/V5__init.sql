ALTER TABLE offer
ADD vat double precision NOT NULL DEFAULT (19);

ALTER TABLE "user"
ADD default_vat double precision NOT NULL DEFAULT (19);


 