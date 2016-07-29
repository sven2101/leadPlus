/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
package dash.salemanagement.rest.test;

import static org.junit.Assert.assertEquals;

import java.util.Calendar;

import org.apache.http.entity.ContentType;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import dash.Application;
import dash.containermanagement.domain.Container;
import dash.customermanagement.domain.Customer;
import dash.inquirermanagement.domain.Title;
import dash.salemanagement.domain.Sale;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;
import dash.vendormanagement.domain.Vendor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class SaleIntegrationTest extends BaseConfig implements IIntegrationTest {

	private static final String EXTENDED_URI = BASE_URI + "/api/rest/sales";

	@Before
	public void setup() {
		headers.clear();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@Override
	@Test
	public void post() {
		Sale sale = create();
		HttpEntity<Sale> entity = new HttpEntity<Sale>(sale, headers);

		ResponseEntity<Sale> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Sale.class);
		Sale responseContainer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(sale, responseContainer);
	}

	@Override
	@Test
	public void get() {

		HttpEntity<Sale> entityCreateSale = new HttpEntity<Sale>(create(), headers);

		ResponseEntity<Sale> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateSale, Sale.class);
		Sale responseCreateSale = responseCreate.getBody();

		HttpEntity<Sale> entityGetSale = new HttpEntity<Sale>(headers);

		ResponseEntity<Sale> responseGetContainer = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetSale, Sale.class,
				responseCreateSale.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetContainer.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetContainer.getStatusCode());
		assertEquals(create(), responseGetContainer.getBody());
	}

	@Override
	@Test
	public void put() {

		Sale sale = create();
		HttpEntity<Sale> entityCreateSale = new HttpEntity<Sale>(sale, headers);

		ResponseEntity<Sale> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateSale, Sale.class);
		Sale responseCreateSale = responseCreate.getBody();

		sale.setSaleProfit(999.99);
		HttpEntity<Sale> entity = new HttpEntity<Sale>(sale, headers);

		ResponseEntity<Sale> response = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.PUT, entity, Sale.class, responseCreateSale.getId());
		Sale responseSale = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(sale, responseSale);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Sale create() {

		Sale sale = new Sale();
		sale.setContainer(new Container("Fuﬂcontainer", "Guter Container", 1000.00));
		sale.setContainerAmount(30);
		sale.setCustomer(new Customer(Title.MR, "Andreas", "Foitzik", "123 GmbH", "test@eviarc.com", "07961/55166", "Hauptstrasse 10"));
		sale.setSaleProfit(1000.00);
		sale.setSaleReturn(1000.00);
		sale.setTimestamp(Calendar.getInstance());
		sale.setTransport("Hamburg");
		sale.setVendor(new Vendor("Anbieter GmbH", "07961/55166"));

		return sale;
	}

}
