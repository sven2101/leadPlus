-- Customers
INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title)
    VALUES ('Dorf 123', 'Mustermann Schreinerei GmbH', false, 'max.mustermann@besteSchreinerei.de', 'Max', 'Mustermann', '07961/55166', CURRENT_TIMESTAMP, 'MR');
    
INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title)
    VALUES ('Dorf 123', 'Mustermann Schreinerei GmbH', false, 'moritz.mustermann@besteSchreinerei.de', 'Moritz', 'Gebhardt', '07961/55166', CURRENT_TIMESTAMP, 'MR');

INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title)
    VALUES ('Dorf 123', 'Mustermann Schreinerei GmbH', false, 'timo.mustermann@besteSchreinerei.de', 'Timo', 'Neumann', '07961/55166', CURRENT_TIMESTAMP, 'MR');    

-- Templates
INSERT INTO public.template(content, deactivated, description, name)
    VALUES ('Test Template', false, 'Angebot Template', 'Container-Angebot-Vorlage');
    
INSERT INTO public.template(content, deactivated, description, name)
    VALUES ('Test Template', false, 'Verkauf Template', 'Container-Verkauf-Vorlage');
    
INSERT INTO public.template(content, deactivated, description, name)
    VALUES ('Test Template', false, 'Anfrage Template', 'Container-Anfrage-Vorlage');

-- Products
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp)
	VALUES (false, 'Der beste Seecontainer der Welt', 'Seecontainer', 2000.00, CURRENT_TIMESTAMP);
	
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp)
	VALUES (false, 'Der beste Frachtcontainer der Welt', 'Frachtcontainer', 2000.00, CURRENT_TIMESTAMP);
	
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp)
	VALUES (false, 'Der beste Handelscontainer der Welt', 'Handelscontainer', 2000.00, CURRENT_TIMESTAMP);

-- Vendors	
INSERT INTO public.vendor(name, phone)
    VALUES ('Elbtainer GmbH', '021-5698234');