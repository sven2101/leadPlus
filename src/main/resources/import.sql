-- Customers
INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title,deleted)
    VALUES ('Dorf 123', 'Mustermann Schreinerei GmbH', false, 'andreas.foitzik@live.com', 'Max', 'Mustermann', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);
    
INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title,deleted)
    VALUES ('Dorf 123', 'Mustermann Schreinerei GmbH', false, 'andreas.foitzik@get-net.eu', 'Moritz', 'Gebhardt', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);

INSERT INTO public.customer(address, company, deactivated, email, firstname, lastname, phone, timestamp, title,deleted)
    VALUES ('Dorf 123', 'Mustermann Schreinerei GmbH', false, 'andreas.foitzik@eviarc.com', 'Timo', 'Neumann', '07961/55166', CURRENT_TIMESTAMP, 'MR',false);   
    	

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
	VALUES (false, 'Der beste Seecontainer der Welt', 'Seecontainer', 2000.00, CURRENT_TIMESTAMP,'NEW',false);
	
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Frachtcontainer der Welt', 'Frachtcontainer', 2000.00, CURRENT_TIMESTAMP,'NEW',false);
	
INSERT INTO public.product(deactivated, description, name, price_netto, timestamp,product_state,deleted)
	VALUES (false, 'Der beste Handelscontainer der Welt', 'Handelscontainer', 2000.00, CURRENT_TIMESTAMP,'USED',false);

-- Vendors	
INSERT INTO public.vendor(name, phone,deleted)
    VALUES ('Elbtainer GmbH', '021-5698234',false);
    
-- SMTP	
-- INSERT INTO public.smtp(connection, email, encryption, host, password, port, response_adress, sender, username)
--    VALUES ( false, 'andreas.foitzik@get-net.eu', 1, 'alfa3017.alfahosting-server.de', '***REMOVED***', 25, '' ,'Andreas Foitzik', 'web26262457p2');