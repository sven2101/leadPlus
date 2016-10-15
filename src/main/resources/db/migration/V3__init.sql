-- Customers

INSERT INTO customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES (nextval('customer_id_seq'), '76133 Karlsruhe, Hauptstrasse 55 ', 'Eviarc GmbH', false, 'andreas.foitzik@eviarc.com', 'Max', 'Mustermann', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);
    
INSERT INTO customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES (nextval('customer_id_seq'), '7011 Stuttgart, Einsiedlerweg 1', 'Containerbasis.de', false, 'samuel@clions.de', 'Samuel', 'Ilg', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);

INSERT INTO customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES (nextval('customer_id_seq'), '7011 Stuttgart, Stuttgarterstraße 88', 'Containerbasis.de', false, 'samuel@clions.de', 'Samuel', 'Ilg', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);

INSERT INTO customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES (nextval('customer_id_seq'), '10115 Berlin, Hauptstrasse 10', 'Mustermann Schreinerei GmbH', false, 'andreas.foitzik@live.com', 'Timo', 'Neumann', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);   
     
INSERT INTO customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES (nextval('customer_id_seq'), '20457 Hamburg, Landebrücke 1', 'Schlecker EG', false, 'gottlieb.damiler@schlecker.de', 'Gottlieb', 'Daimler', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);

INSERT INTO customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES (nextval('customer_id_seq'), '20457 Hamburg, Landebrücke 2', 'Ikea AG', false, 'fritz.walter@ikea.com', 'Fritz', 'Walter', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);   

-- Products
INSERT INTO product(id, deactivated, description, name, pricenetto, timestamp, productstate, deleted)
	VALUES (nextval('product_id_seq'), false, 'Der beste Seecontainer der Welt', 'Seecontainer', 1000.00, CURRENT_TIMESTAMP,'NEW', false);
	
INSERT INTO product(id, deactivated, description, name, pricenetto, timestamp, productstate, deleted)
	VALUES (nextval('product_id_seq'), false, 'Der beste Frachtcontainer der Welt', 'Frachtcontainer', 2000.00, CURRENT_TIMESTAMP,'NEW', false);
	
INSERT INTO product(id, deactivated, description, name, pricenetto, timestamp, productstate, deleted) 
	VALUES (nextval('product_id_seq'), false, 'Der beste Handelscontainer der Welt', 'Handelscontainer', 3000.00, CURRENT_TIMESTAMP,'USED', false);
	
INSERT INTO product(id, deactivated, description, name, pricenetto, timestamp, productstate, deleted)
	VALUES (nextval('product_id_seq'), false, 'Der beste Wohncontainer der Welt', 'Wohncontainer', 4000.00, CURRENT_TIMESTAMP,'USED', false);
		
INSERT INTO product(id, deactivated, description, name, pricenetto, timestamp, productstate, deleted)
	VALUES (nextval('product_id_seq'), false, 'Der beste Abholcontainer der Welt', 'Abholcontainer', 5000.00, CURRENT_TIMESTAMP,'USED', false);
	
INSERT INTO product(id, deactivated, description, name, pricenetto, timestamp, productstate, deleted)
	VALUES (nextval('product_id_seq'), false, 'Der beste Handelscontainer der Welt', 'Reisecontainer', 3475.30, CURRENT_TIMESTAMP,'USED', false);

-- Vendors	
INSERT INTO vendor(id, name, phone, deleted)
    VALUES (nextval('vendor_id_seq'), 'Elbtainer GmbH', '021-5698234',false);
    
 -- Leads
 INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '7011 Stuttgart, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-03-26 12:23:00', 1, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '76133 Karlsruhe, Hauptstrasse 55', 300, 'Wichtige Anfrage!', '2016-04-26 12:23:00', 2, 1);

INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '10115 Berlin, Hauptstrasse 10', 300, 'Wichtige Anfrage!', '2016-05-25 12:23:00', 3, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-06-06 12:23:00', 4, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '10115 Berlin, Hauptstrasse 10', 300, 'Wichtige Anfrage!', '2016-08-30 12:23:00', 3, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-16 12:23:00', 4, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-25 12:23:00', 2, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-26 12:23:00', 2, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-25 12:23:00', 4, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-26 12:23:00', 2, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-26 12:23:00', 2, 1);
   	   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-24 12:23:00', 4, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-08-30 12:23:00', 5, 1);
     	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-08-30 12:23:00', 3, 1); 
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-13 12:23:00', 1, 1);

-- Offer
INSERT INTO offer(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk, deliverydate, offerprice)
   VALUES (nextval('hibernate_sequence'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-13 12:23:00', 1, 1, '2016-09-13 12:23:00', 2000);

-- Processes
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 1);
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 2 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 3 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 4 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 5 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 6 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 7 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 8 );
        
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 9 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 10 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 11 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 12 );
 
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 13 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 14 );
    
INSERT INTO process(id, deleted, status, lead_fk)
    VALUES (nextval('process_id_seq'), false, 'OPEN', 15 );
    
