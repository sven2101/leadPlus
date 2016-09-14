-- Customers
INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title)
    VALUES ('Dorf 123', 'Mustermann Schreinerei GmbH', false, 'andreas.foitzik@live.com', 'Max', 'Mustermann', '07961/55166', CURRENT_TIMESTAMP, 'MR');
    
INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title)
    VALUES ('Dorf 123', 'Mustermann Schreinerei GmbH', false, 'andreas.foitzik@get-net.eu', 'Moritz', 'Gebhardt', '07961/55166', CURRENT_TIMESTAMP, 'MR');

INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title)
    VALUES ('Dorf 123', 'Mustermann Schreinerei GmbH', false, 'andreas.foitzik@eviarc.com', 'Timo', 'Neumann', '07961/55166', CURRENT_TIMESTAMP, 'MR');    

-- Templates
INSERT INTO public.template(content, deactivated, description, name)
    VALUES ('<html><head><title>Angebot</title></head><body><h1>Welcome our beloved leader!</h1><p style="color:red;">Titel: <#if titel??>${titel}<#else>Titel</#if> </p><br/><p>Vorname:  <#if firstname??>${firstname}<#else>Vorname</#if> </p> <br/><p>Nachname: <#if lastname??>${lastname} <#else>Nachname</#if></p> <br/> <p>deliveryAddress:  <#if deliveryAddress??>${deliveryAddress}<#else>deliveryAddress</#if> </p> <br/><p>offerPrice:  <#if offerPrice??>${offerPrice} <#else>offerPrice</#if></p> <br/><p>deliveryDate:  <#if deliveryDate??>${deliveryDate}<#else>deliveryDate</#if> </p> <br/></body></html>', false, 'Angebot Template', 'Container-Angebot-Vorlage');
    
INSERT INTO public.template(content, deactivated, description, name)
    VALUES ('Test Template', false, 'Verkauf Template', 'Container-Verkauf-Vorlage');
    
INSERT INTO public.template(content, deactivated, description, name)
    VALUES ('Test Template', false, 'Anfrage Template', 'Container-Anfrage-Vorlage');

-- Products
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state)
	VALUES (false, 'Der beste Seecontainer der Welt', 'Seecontainer', 2000.00, CURRENT_TIMESTAMP,'NEW');
	
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state)
	VALUES (false, 'Der beste Frachtcontainer der Welt', 'Frachtcontainer', 2000.00, CURRENT_TIMESTAMP,'NEW');
	
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state)
	VALUES (false, 'Der beste Handelscontainer der Welt', 'Handelscontainer', 2000.00, CURRENT_TIMESTAMP,'USED');

-- Vendors	
INSERT INTO public.vendor(name, phone)
    VALUES ('Elbtainer GmbH', '021-5698234');
    
-- SMTP	
-- INSERT INTO public.smtp(connection, email, encryption, host, password, port, response_adress, sender, username)
--    VALUES ( false, 'andreas.foitzik@get-net.eu', 1, 'alfa3017.alfahosting-server.de', '***REMOVED***', 25, '' ,'Andreas Foitzik', 'web26262457p2');