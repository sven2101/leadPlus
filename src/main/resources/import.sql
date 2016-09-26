-- Customers
INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title, deleted)
    VALUES ('76133 Karlsruhe, Hauptstrasse 55 ', 'Eviarc GmbH', false, 'andreas.foitzik@eviarc.com', 'Max', 'Mustermann', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);
    
INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title,deleted)
    VALUES ('7011 Stuttgart, Einsiedlerweg 1', 'Containerbasis.de', false, 'samuel@clions.de', 'Samuel', 'Ilg', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);

INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title,deleted)
    VALUES ('10115 Berlin, Hauptstrasse 10', 'Mustermann Schreinerei GmbH', false, 'andreas.foitzik@live.com', 'Timo', 'Neumann', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);   
   
-- User
INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username, picture)
    VALUES ('andreas.atrott@***REMOVED***.com', true, 'Andreas', 'DE', 'Atrott', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'SUPERADMIN', 'andreas.atrott', null);

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username, picture)
    VALUES ('lars.graulo@***REMOVED***.com', true, 'Lars', 'DE', 'Graulo', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'lars.graulo', null);

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username, picture)
    VALUES ('philipp.manzow@***REMOVED***.com', true, 'Philipp', 'DE', 'Manzow', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'philipp.manzow', null);

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username, picture)
    VALUES ('kristina.evtuhova@***REMOVED***.com', true, 'Kristina', 'DE', 'Evtuhova', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'kristina.evtuhova', null);

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username, picture)
    VALUES ('samuel.ilg@***REMOVED***.com', true, 'Samuel', 'DE', 'Ilg', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'samuel.ilg', null);

INSERT INTO public."user"(email, enabled, firstname, language, lastname, password, role, username, picture)
    VALUES ('jana.reusch@***REMOVED***.com', true, 'Jana', 'DE', 'Reusch', '$2a$10$qHeCPYEWNlaQs3HAmXZ3NOXbu8Mc0lpM9xp1xVAeX9.NYrK5GjqOu', 'USER', 'jana.reusch', null);

-- SMTP	
-- INSERT INTO public.smtp(connection, email, encryption, host, password, port, response_adress, sender, username, user)
--    VALUES ( false, 'andreas.foitzik@get-net.eu', 1, 'alfa3017.alfahosting-server.de', '***REMOVED***', 25, '' ,'Andreas Foitzik', 'web26262457p2', 1);  

-- Templates
INSERT INTO public.template(content, deactivated, description, name)
    VALUES ('<h1 style="font-family: &quot;open sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; color: rgb(103, 106, 108);">Welcome our beloved leader!</h1>
<p style="color: red;">Titel: &lt;#if titel??&gt;${titel}&lt;#else&gt;Titel&lt;/#if&gt;</p>
<br><p>Vorname: &lt;#if firstname??&gt;${firstname}&lt;#else&gt;Vorname&lt;/#if&gt;</p>
<br><p>Nachname: &lt;#if lastname??&gt;${lastname} &lt;#else&gt;Nachname&lt;/#if&gt;</p>
<br><p>deliveryAddress: &lt;#if deliveryAddress??&gt;${deliveryAddress}&lt;#else&gt;deliveryAddress&lt;/#if&gt;</p>
<br><p>offerPrice: &lt;#if offerPrice??&gt;${offerPrice} &lt;#else&gt;offerPrice&lt;/#if&gt;</p>
<br><p>deliveryDate: &lt;#if deliveryDate??&gt;${deliveryDate}&lt;#else&gt;deliveryDate&lt;/#if&gt;</p>
<div><br></div>', false, 'Angebot Template', 'Container-Angebot-Vorlage');
    
INSERT INTO public.template(content, deactivated, description, name)
    VALUES ('<title>Angebot</title><h3 style="font-family: &quot;open sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;"><span style="font-family: inherit; font-size: 13px; color: inherit;">&nbsp;&lt;#if titel=="MR"&gt;Sehr geehrter Herr&nbsp;</span><span style="color: inherit; font-family: inherit; font-size: 13px;">${lastname}&lt;#else&gt;Sehr geehrte Frau&nbsp;</span><span style="color: inherit; font-family: inherit; font-size: 13px;">${lastname}&lt;/#if&gt;,</span></h3><h1><p style="font-size: 13px;">Ihre Waren wird voraussichtlich am&nbsp;&lt;#if deliveryDate!="null"&gt;${deliveryDate}&lt;#else&gt;<span style="color: rgb(255, 0, 0); font-weight: bold;">00.00.000</span>&lt;/#if&gt;&nbsp;in&nbsp;&lt;#if deliveryAddress!="null"&gt;${deliveryAddress}&lt;#else&gt;<span style="color: rgb(255, 0, 0); font-weight: bold;">_______ </span>&lt;/#if&gt; eintreffen.</p><p style="font-size: 13px;">Der offene Rechnungsbetrag:&nbsp;&lt;#if offerPrice!="null"&gt;${offerPrice} &lt;#else&gt;<span style="color: rgb(255, 0, 0); font-weight: bold;">0</span>&lt;/#if&gt;<span style="color: inherit; font-family: inherit;">&nbsp;â‚¬</span></p><p style="font-size: 13px;">Mit freundlichen GrÃ¼ÃŸen</p></h1> <br><br>', false, 'Verkauf Template', 'Container-Verkauf-Vorlage');
    
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

-- Products
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Seecontainer der Welt', 'Seecontainer', 1000.00, CURRENT_TIMESTAMP,'NEW',false);
	
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Frachtcontainer der Welt', 'Frachtcontainer', 2000.00, CURRENT_TIMESTAMP,'NEW',false);
	
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Handelscontainer der Welt', 'Handelscontainer', 3000.00, CURRENT_TIMESTAMP,'USED',false);
	
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Wohncontainer der Welt', 'Wohncontainer', 4000.00, CURRENT_TIMESTAMP,'USED',false);
		
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Abholcontainer der Welt', 'Abholcontainer', 5000.00, CURRENT_TIMESTAMP,'USED',false);
	
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Handelscontainer der Welt', 'Reisecontainer', 3475.30, CURRENT_TIMESTAMP,'USED',false);

-- Vendors	
INSERT INTO public.vendor(name, phone,deleted)
    VALUES ('Elbtainer GmbH', '021-5698234',false);
    
