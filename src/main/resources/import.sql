-- Customers
INSERT INTO public.customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title)
    VALUES (0, 'Dorf 123', 'Mustermann Schreinerei GmbH', false, 'max.mustermann@besteSchreinerei.de', 'Max', 'Mustermann', '07961/55166', CURRENT_TIMESTAMP, 'MR');
    
INSERT INTO public.customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title)
    VALUES (1, 'Dorf 123', 'Mustermann Schreinerei GmbH', false, 'moritz.mustermann@besteSchreinerei.de', 'Moritz', 'Gebhardt', '07961/55166', CURRENT_TIMESTAMP, 'MR');

INSERT INTO public.customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title)
    VALUES (2, 'Dorf 123', 'Mustermann Schreinerei GmbH', false, 'timo.mustermann@besteSchreinerei.de', 'Timo', 'Neumann', '07961/55166', CURRENT_TIMESTAMP, 'MR');    

-- Templates
INSERT INTO public.template(id, content, deactivated, description, name)
    VALUES (0, 'Test Template', false, 'Angebot Template', 'Container-Angebot-Vorlage');
    
INSERT INTO public.template(id, content, deactivated, description, name)
    VALUES (1, 'Test Template', false, 'Verkauf Template', 'Container-Verkauf-Vorlage');
    
INSERT INTO public.template(id, content, deactivated, description, name)
    VALUES (2, 'Test Template', false, 'Anfrage Template', 'Container-Anfrage-Vorlage');

-- Products
INSERT INTO public.product(id, deactivated, description, name, price_netto, timestamp)
	VALUES (0, false, 'Der beste Seecontainer der Welt', 'Seecontainer', 2000.00, CURRENT_TIMESTAMP);
	
INSERT INTO public.product(id, deactivated, description, name, price_netto, timestamp)
	VALUES (1, false, 'Der beste Frachtcontainer der Welt', 'Frachtcontainer', 2000.00, CURRENT_TIMESTAMP);
	
INSERT INTO public.product(id, deactivated, description, name, price_netto, timestamp)
	VALUES (2, false, 'Der beste Handelscontainer der Welt', 'Handelscontainer', 2000.00, CURRENT_TIMESTAMP);
	
-- Vendors	
INSERT INTO public.vendor(id, name, phone)
    VALUES (0, 'Elbtainer GmbH', '021-5698234');
    
-- Leads
INSERT INTO public.lead(id, delivery_address, "timestamp", customer_fk, product_fk, vendor_fk, message)
    VALUES (0, 'Hamburg City', CURRENT_TIMESTAMP, 2, 0, 0, 'Automatisch generierte Message');

