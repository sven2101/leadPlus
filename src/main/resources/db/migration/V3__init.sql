-- Customers

INSERT INTO customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES (nextval('customer_id_seq'), '76133 Karlsruhe, Hauptstrasse 55 ', 'Eviarc GmbH', false, 'andreas.foitzik@eviarc.com', 'Max', 'Mustermann', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);
    
INSERT INTO customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES (nextval('customer_id_seq'), '7011 Stuttgart, Einsiedlerweg 1', 'Containerbasis.de', false, 'samuel@clions.de', 'Samuel', 'Ilg', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);

INSERT INTO customer(id, address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES (nextval('customer_id_seq'), '7011 Stuttgart, Stuttgarterstraße 88', 'Containerbasis.de', false, 'samuel@***REMOVED***.de', 'Samuel', 'Ilg', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);

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
   	VALUES (nextval('workflow_id_seq'), false, '7011 Stuttgart, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-03-26 12:23:00', 1, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '76133 Karlsruhe, Hauptstrasse 55', 300, 'Wichtige Anfrage!', '2016-04-26 12:23:00', 2, 1);

INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '10115 Berlin, Hauptstrasse 10', 300, 'Wichtige Anfrage!', '2016-05-25 12:23:00', 3, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-06-06 12:23:00', 4, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '10115 Berlin, Hauptstrasse 10', 300, 'Wichtige Anfrage!', '2016-08-30 12:23:00', 3, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-16 12:23:00', 4, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-25 12:23:00', 2, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-26 12:23:00', 2, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-25 12:23:00', 4, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-26 12:23:00', 2, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-26 12:23:00', 2, 1);
   	   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-24 12:23:00', 4, 1);
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-08-30 12:23:00', 5, 1);
     	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-08-30 12:23:00', 3, 1); 
   	
INSERT INTO lead(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk)
   	VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-13 12:23:00', 1, 1);

-- Offer
INSERT INTO offer(id, deleted, deliveryaddress, deliverycosts, message, timestamp, customer_fk, vendor_fk, deliverydate, offerprice)
   VALUES (nextval('workflow_id_seq'), false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-13 12:23:00', 1, 1, '2016-09-13 12:23:00', 2000);

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
 
-- Templates
INSERT INTO public.template(content, deactivated, description, name)
    VALUES ('<title>Angebot</title><h1 style="font-family: &quot;open sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; color: rgb(103, 106, 108);">Welcome our beloved leader!</h1>
<h1><p style="font-size: 13px; color: red;">Titel: &lt;#if titel??&gt;${titel}&lt;#else&gt;Titel&lt;/#if&gt;</p>
<br style="font-size: 13px;"><p style="font-size: 13px;">Vorname: &lt;#if firstname??&gt;${firstname}&lt;#else&gt;Vorname&lt;/#if&gt;</p>
<br style="font-size: 13px;"><p style="font-size: 13px;">Nachname: &lt;#if lastname??&gt;${lastname} &lt;#else&gt;Nachname&lt;/#if&gt;</p>
<br style="font-size: 13px;"><p style="font-size: 13px;">deliveryAddress: &lt;#if deliveryAddress??&gt;${deliveryAddress}&lt;#else&gt;deliveryAddress&lt;/#if&gt;</p>
<br style="font-size: 13px;"><p style="font-size: 13px;">offerPrice: &lt;#if offerPrice??&gt;${offerPrice} &lt;#else&gt;offerPrice&lt;/#if&gt;</p>
<br style="font-size: 13px;"><p style="font-size: 13px;">deliveryDate: &lt;#if deliveryDate??&gt;${deliveryDate}&lt;#else&gt;deliveryDate&lt;/#if&gt;</p>
</h1>
 <br><br>', false, 'Anfrage Template', 'Container-Anfrage-Vorlage');
 
INSERT INTO public.template(content, deactivated, description, name)
    VALUES ( '<p>Sehr geehrter Herr &lt;#if customer.firstname??&gt;${customer.firstname}&lt;#else&gt;&lt;/#if&gt; &lt;#if customer.lastname??&gt;${customer.lastname}&lt;#else&gt;&lt;/#if&gt; ,</p><p>&nbsp;</p><p>haben Sie vielen Dank für Ihre Anfrage auf ***REMOVED***.de. Wir können Ihnen folgendes anbieten:</p><p>&nbsp;</p><p>Container:</p><p>&lt;#list orderPositions as orderPosition&gt;</p><p>Item: ${orderPosition.price} / per ${orderPosition.product.name} frei Haus &lt;#if offer.deliveryAddress??&gt;${offer.deliveryAddress}&lt;#else&gt;&lt;/#if&gt; &nbsp;/ exklusive ebenerdiger Entladung/ zzgl. MwSt.&nbsp;</p><p>&lt;/#list&gt;</p><p><br></p><p>Zustand:</p><p>* Gebraucht</p><p>* Stahlrepariert nach Cargo Worthy Standart</p><p>* Wind- und wasserdicht</p><p>* Leichter bis mittlerer Oberflächenrost innen und/oder aussen</p><p>* Leichte bis mittlere Dellen und Abschärfungen, ohne Beeinträchtigung der Beladung</p><p>* Holzfussboden</p><p>&nbsp;</p><p>Zubehör:</p><p>35,00€ zzgl. MwSt. per Monoblockschloss für Lockbox und Containertürstangen ( 41,65€ Brutto )</p><p>303,00€ zzgl. MwSt. per Türstangenverriegelung Omega 3 ( 360,57€ Brutto )</p><p>795,00€ zzgl. MwSt. per Auffahrrampe ( variable Maße/ Gewicht 90-120kg/ Tragkraft 3 ton ) ( 946,05€ Brutto )</p><p>&nbsp;</p><p>Vorbehaltlich Verfügbarkeit. Gültigkeit 2 Wochen.</p><p>&nbsp;</p><p>Wir freuen uns Ihnen geholfen zu haben.</p><p>&nbsp;</p><p>Mit freundlichen Grüßen / Best regards</p><p>&nbsp;</p><p>&lt;#if user.firstname??&gt;${user.firstname}&lt;#else&gt;&lt;/#if&gt; &lt;#if user.lastname??&gt;${user.lastname}&lt;#else&gt;&lt;/#if&gt;</p><p>&lt;#if user.job??&gt;${user.job}&lt;#else&gt;Sales-Specialst&lt;/#if&gt;</p><p>&nbsp;</p><p>&nbsp;&nbsp;</p><p>Tel.: &lt;#if user.phone??&gt;${user.phone}&lt;#else&gt;&lt;/#if&gt;</p><p>Fax.: &lt;#if user.fax??&gt;${user.fax}&lt;#else&gt;&lt;/#if&gt;</p><p>Skype.: &lt;#if user.skype??&gt;${user.skype}&lt;#else&gt;&lt;/#if&gt;</p><p>&nbsp;</p><p>&lt;#if user.email??&gt;${user.email}&lt;#else&gt;&lt;/#if&gt;</p><p>&nbsp;</p><p>Elbtainer Trading GmbH</p><p>Zippelhaus 5</p><p>20457 Hamburg</p><p>Germany</p><p>&nbsp;&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p><p>&nbsp;</p><p>Wir arbeiten ausschließlich unter Einbeziehung unserer AGBs. Nachzulesen unter: http://www.***REMOVED***.com/allgemeine-verkaufs-und-lieferbedingungen-handel/</p><p>Geschäftsführer: Andreas Atrott - &nbsp;Sitz der Gesellschaft: Hamburg &nbsp;HRB 126 105 - &nbsp;Steuer-Nr. 50 717 01141 - &nbsp;USt-ID Nr. DE 287015650 - &nbsp;www.***REMOVED***.com &nbsp;</p><p>This email is confidential and may be subject to legal privilege. If you are not the intended recipient please notify the sender immediately and delete the email from your computer.</p><p>You should not copy the email, use it for any purpose or disclose its contents to any other person. Please note that any views or opinions presented in this email may be personal to</p><p>the author and do not necessarily represent the views or opinions of Elbtainer. &nbsp;It is the responsibility of the recipient to check this email for the presence of viruses.</p><div><br></div><p>
</p>', false, 'Simpel Template', 'Simple');