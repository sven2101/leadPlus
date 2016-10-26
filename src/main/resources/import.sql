
-- Customers
INSERT INTO tenant.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES ('76133 Karlsruhe, Hauptstrasse 55 ', 'Eviarc GmbH', false, 'andreas.foitzik@eviarc.com', 'Max', 'Mustermann', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);
    
INSERT INTO tenant.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title,deleted)
    VALUES ('7011 Stuttgart, Einsiedlerweg 1', 'Containerbasis.de', false, 'samuel@clions.de', 'Samuel', 'Ilg', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);

INSERT INTO tenant.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title,deleted)
    VALUES ('7011 Stuttgart, Stuttgarterstraße 88', 'Containerbasis.de', false, 'samuel@clions.de', 'Samuel', 'Ilg', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);

INSERT INTO tenant.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title,deleted)
    VALUES ('10115 Berlin, Hauptstrasse 10', 'Mustermann Schreinerei GmbH', false, 'andreas.foitzik@live.com', 'Timo', 'Neumann', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);   
     
INSERT INTO tenant.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title,deleted)
    VALUES ('20457 Hamburg, Landebrücke 1', 'Schlecker EG', false, 'gottlieb.damiler@schlecker.de', 'Gottlieb', 'Daimler', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);

INSERT INTO tenant.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title,deleted)
    VALUES ('20457 Hamburg, Landebrücke 2', 'Ikea AG', false, 'fritz.walter@ikea.com', 'Fritz', 'Walter', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);   
   
-- User

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('andreas.atrott@***REMOVED***.com', true, 'Andreas', 'DE', 'Atrott', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'SUPERADMIN', 'andreas.atrott', 1);

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('lars.graulo@***REMOVED***.com', true, 'Lars', 'DE', 'Graulo', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'lars.graulo', 1);

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('philipp.manzow@***REMOVED***.com', true, 'Philipp', 'DE', 'Manzow', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'philipp.manzow', 1);

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('kristina.evtuhova@***REMOVED***.com', true, 'Kristina', 'DE', 'Evtuhova', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'kristina.evtuhova', 1);

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('samuel.ilg@***REMOVED***.com', true, 'Samuel', 'DE', 'Ilg', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'samuel.ilg', 1);

INSERT INTO tenant."user"(email, enabled, firstname, language, lastname, password, role, username, tenant_id)
    VALUES ('jana.reusch@***REMOVED***.com', true, 'Jana', 'DE', 'Reusch', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'jana.reusch', 1);

-- SMTP	
-- INSERT INTO tenant.smtp(connection, email, encryption, host, password, port, response_adress, sender, username, user)
--    VALUES ( false, 'andreas.foitzik@get-net.eu', 1, 'alfa3017.alfahosting-server.de', '***REMOVED***', 25, '' ,'Andreas Foitzik', 'web26262457p2', 1);  

-- Templates
INSERT INTO tenant.template(content, deactivated, description, name)
    VALUES ('<h1 style="font-family: &quot;open sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; color: rgb(103, 106, 108);">Welcome our beloved leader!</h1>
<p style="color: red;">Titel: &lt;#if titel??&gt;${titel}&lt;#else&gt;Titel&lt;/#if&gt;</p>
<br><p>Vorname: &lt;#if firstname??&gt;${firstname}&lt;#else&gt;Vorname&lt;/#if&gt;</p>
<br><p>Nachname: &lt;#if lastname??&gt;${lastname} &lt;#else&gt;Nachname&lt;/#if&gt;</p>
<br><p>deliveryAddress: &lt;#if deliveryAddress??&gt;${deliveryAddress}&lt;#else&gt;deliveryAddress&lt;/#if&gt;</p>
<br><p>offerPrice: &lt;#if offerPrice??&gt;${offerPrice} &lt;#else&gt;offerPrice&lt;/#if&gt;</p>
<br><p>deliveryDate: &lt;#if deliveryDate??&gt;${deliveryDate}&lt;#else&gt;deliveryDate&lt;/#if&gt;</p>
<div><br></div>', false, 'Angebot Template', 'Container-Angebot-Vorlage');
    
INSERT INTO tenant.template(content, deactivated, description, name)
    VALUES ('<title>Angebot</title><h3 style="font-family: &quot;open sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;"><span style="font-family: inherit; font-size: 13px; color: inherit;">&nbsp;&lt;#if titel=="MR"&gt;Sehr geehrter Herr&nbsp;</span><span style="color: inherit; font-family: inherit; font-size: 13px;">${lastname}&lt;#else&gt;Sehr geehrte Frau&nbsp;</span><span style="color: inherit; font-family: inherit; font-size: 13px;">${lastname}&lt;/#if&gt;,</span></h3><h1><p style="font-size: 13px;">Ihre Waren wird voraussichtlich am&nbsp;&lt;#if deliveryDate!="null"&gt;${deliveryDate}&lt;#else&gt;<span style="color: rgb(255, 0, 0); font-weight: bold;">00.00.000</span>&lt;/#if&gt;&nbsp;in&nbsp;&lt;#if deliveryAddress!="null"&gt;${deliveryAddress}&lt;#else&gt;<span style="color: rgb(255, 0, 0); font-weight: bold;">_______ </span>&lt;/#if&gt; eintreffen.</p><p style="font-size: 13px;">Der offene Rechnungsbetrag:&nbsp;&lt;#if offerPrice!="null"&gt;${offerPrice} &lt;#else&gt;<span style="color: rgb(255, 0, 0); font-weight: bold;">0</span>&lt;/#if&gt;<span style="color: inherit; font-family: inherit;">&nbsp;Ã¢â€šÂ¬</span></p><p style="font-size: 13px;">Mit freundlichen GrÃƒÂ¼ÃƒÅ¸en</p></h1> <br><br>', false, 'Verkauf Template', 'Container-Verkauf-Vorlage');
    
INSERT INTO tenant.template(content, deactivated, description, name)
    VALUES ('<title>Angebot</title><h1 style="font-family: &quot;open sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; color: rgb(103, 106, 108);">Welcome our beloved leader!</h1>
<h1><p style="font-size: 13px; color: red;">Titel: &lt;#if titel??&gt;${titel}&lt;#else&gt;Titel&lt;/#if&gt;</p>
<br style="font-size: 13px;"><p style="font-size: 13px;">Vorname: &lt;#if firstname??&gt;${firstname}&lt;#else&gt;Vorname&lt;/#if&gt;</p>
<br style="font-size: 13px;"><p style="font-size: 13px;">Nachname: &lt;#if lastname??&gt;${lastname} &lt;#else&gt;Nachname&lt;/#if&gt;</p>
<br style="font-size: 13px;"><p style="font-size: 13px;">deliveryAddress: &lt;#if deliveryAddress??&gt;${deliveryAddress}&lt;#else&gt;deliveryAddress&lt;/#if&gt;</p>
<br style="font-size: 13px;"><p style="font-size: 13px;">offerPrice: &lt;#if offerPrice??&gt;${offerPrice} &lt;#else&gt;offerPrice&lt;/#if&gt;</p>
<br style="font-size: 13px;"><p style="font-size: 13px;">deliveryDate: &lt;#if deliveryDate??&gt;${deliveryDate}&lt;#else&gt;deliveryDate&lt;/#if&gt;</p>
</h1>
 <br><br>', false, 'Anfrage Template', 'Container-Anfrage-Vorlage');
 
 INSERT INTO tenant.template(content, deactivated, description, name)
    VALUES ('<div><div>Sehr geehrter Herr &lt;#if lastname??&gt;${lastname}&lt;#else&gt;xxx&lt;/#if&gt;,</div><div>&nbsp;</div><div>haben Sie vielen Dank für Ihre Anfrage auf ***REMOVED***.de. Wir können Ihnen folgendes anbieten:</div><div>&nbsp;</div><div>Container:</div><div>&lt;#if offerPrice??&gt;${offerPrice}&lt;#else&gt;xxx&lt;/#if&gt;€/ per 20ft Container frei Haus PLZ &lt;#if deliveryAddress??&gt;${deliveryAddress}&lt;#else&gt;xxx&lt;/#if&gt;/ exklusive ebenerdiger Entladung/ zzgl. MwSt.&nbsp;</div><div>&nbsp;</div><div>Zustand:</div><div>* Gebraucht</div><div>* Stahlrepariert nach Cargo Worthy Standart</div><div>* Wind- und wasserdicht</div><div>* Leichter bis mittlerer Oberflächenrost innen und/oder aussen</div><div>* Leichte bis mittlere Dellen und Abschürfungen, ohne Beeinträchtigung der Beladung</div><div>* Holzfussboden</div><div>&nbsp;</div><div>Zubehör:</div><div>35,00€ zzgl. MwSt. per Monoblockschloss für Lockbox und Containertürstangen ( 41,65€ Brutto )</div><div>303,00€ zzgl. MwSt. per Türstangenverriegelung Omega 3 ( 360,57€ Brutto )</div><div>795,00€ zzgl. MwSt. per Auffahrrampe ( variable Maße/ Gewicht 90-120kg/ Tragkraft 3 ton ) ( 946,05€ Brutto )</div><div>&nbsp;</div><div>Vorbehaltlich Verfügbarkeit. Gültigkeit 2 Wochen.</div><div>&nbsp;</div><div>Wir freuen uns Ihnen geholfen zu haben.</div><div>&nbsp;</div><div>Mit freundlichen Grüßen / Best regards</div><div>&nbsp;</div><div>Philipp Manzow</div><div>Sales Specialist</div><div>&nbsp;</div><div>&nbsp;</div></div><img src="data:image/png;base64,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" data-filename="***REMOVED***-trading-gmbh-logo.png" style="width: 350px;"><div><div><br></div><div>&nbsp;</div><div>&nbsp;</div><div>Tel.: +49 (0) 40 303841-53</div><div>Fax.: +49 (0) 40 303841-55</div><div>Skype.: ett-pm</div><div>&nbsp;</div><div>philipp.manzow@***REMOVED***.com</div><div>&nbsp;</div><div>Elbtainer Trading GmbH</div><div>Zippelhaus 5</div><div>20457 Hamburg</div><div>Germany</div><div>&nbsp;&nbsp;</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</div><div>&nbsp;</div><div>Wir arbeiten ausschließlich unter Einbeziehung unserer AGB’s. Nachzulesen unter: http://www.***REMOVED***.com/allgemeine-verkaufs-und-lieferbedingungen-handel/</div><div>Geschäftsführer: Andreas Atrott - &nbsp;Sitz der Gesellschaft: Hamburg &nbsp;HRB 126 105 - &nbsp;Steuer-Nr. 50 717 01141 - &nbsp;USt-ID Nr. DE 287015650 - &nbsp;www.***REMOVED***.com &nbsp;</div><div>This email is confidential and may be subject to legal privilege. If you are not the intended recipient please notify the sender immediately and delete the email from your computer.</div><div>You should not copy the email, use it for any purpose or disclose its contents to any other person. Please note that any views or opinions presented in this email may be personal to</div><div>the author and do not necessarily represent the views or opinions of Elbtainer. &nbsp;It is the responsibility of the recipient to check this email for the presence of viruses.</div></div><div><br></div>', false, 'Angebot', 'Angebot');

-- Products
INSERT INTO tenant.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Seecontainer der Welt', 'Seecontainer', 1000.00, CURRENT_TIMESTAMP,'NEW',false);
	
INSERT INTO tenant.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Frachtcontainer der Welt', 'Frachtcontainer', 2000.00, CURRENT_TIMESTAMP,'NEW',false);
	
INSERT INTO tenant.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Handelscontainer der Welt', 'Handelscontainer', 3000.00, CURRENT_TIMESTAMP,'USED',false);
	
INSERT INTO tenant.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Wohncontainer der Welt', 'Wohncontainer', 4000.00, CURRENT_TIMESTAMP,'USED',false);
		
INSERT INTO tenant.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Abholcontainer der Welt', 'Abholcontainer', 5000.00, CURRENT_TIMESTAMP,'USED',false);
	
INSERT INTO tenant.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Handelscontainer der Welt', 'Reisecontainer', 3475.30, CURRENT_TIMESTAMP,'USED',false);

-- Vendors	
INSERT INTO tenant.vendor(name, phone,deleted)
    VALUES ('Elbtainer GmbH', '021-5698234',false);
    
 -- Leads
 INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (1, false, '7011 Stuttgart, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-03-26 12:23:00', 1, 1);
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (2, false, '76133 Karlsruhe, Hauptstrasse 55', 300, 'Wichtige Anfrage!', '2016-04-26 12:23:00', 2, 1);

INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (3, false, '10115 Berlin, Hauptstrasse 10', 300, 'Wichtige Anfrage!', '2016-05-25 12:23:00', 3, 1);
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (4, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-06-06 12:23:00', 4, 1);
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (5, false, '10115 Berlin, Hauptstrasse 10', 300, 'Wichtige Anfrage!', '2016-08-30 12:23:00', 3, 1);
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (6, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-16 12:23:00', 4, 1);
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (7, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-25 12:23:00', 2, 1);
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (8, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-26 12:23:00', 2, 1);
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (9, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-25 12:23:00', 4, 1);
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (10, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-26 12:23:00', 2, 1);
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (11, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-26 12:23:00', 2, 1);
   	   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (12, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-24 12:23:00', 4, 1);
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (13, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-08-30 12:23:00', 5, 1);
     	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (14, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-08-30 12:23:00', 3, 1); 
   	
INSERT INTO tenant.lead(id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk)
   	VALUES (15, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-13 12:23:00', 1, 1);

-- Offer
-- INSERT INTO tenant.offer( id, deleted, delivery_address, delivery_costs, message, timestamp, customer_fk, vendor_fk, delivery_date, offer_price)
--    VALUES (1, false, '20113 Hamburg, Einsiedlerweg 1', 300, 'Wichtige Anfrage!', '2016-09-13 12:23:00', 1, 1, '2016-09-13 12:23:00', 2000);

-- Processes
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 1);
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 2 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 3 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 4 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 5 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 6 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 7 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 8 );
        
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 9 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 10 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 11 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 12 );
 
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 13 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 14 );
    
INSERT INTO tenant.process(deleted, status, lead_fk)
    VALUES (false, 'OPEN', 15 );
