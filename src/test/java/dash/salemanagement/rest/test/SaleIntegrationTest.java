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
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import dash.Application;
import dash.customermanagement.domain.Customer;
import dash.inquirermanagement.domain.Title;
import dash.productmanagement.domain.Product;
import dash.salemanagement.domain.Sale;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;
import dash.vendormanagement.domain.Vendor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class SaleIntegrationTest extends BaseConfig implements IIntegrationTest {

	private final static String EXTENDED_URI = BASE_URI + REST_SALES;

	@Override
	@Test
	public void post() {
		Sale sale = create();
		HttpEntity<Sale> entity = new HttpEntity<Sale>(sale, headers);

		ResponseEntity<Sale> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Sale.class);
		Sale responseSale = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(sale, responseSale);
	}

	@Override
	@Test
	public void get() {

		Sale sale = create();
		HttpEntity<Sale> entityCreateSale = new HttpEntity<Sale>(sale, headers);

		ResponseEntity<Sale> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateSale, Sale.class);
		Sale responseCreateSale = responseCreate.getBody();

		HttpEntity<Sale> entityGetSale = new HttpEntity<Sale>(headers);

		ResponseEntity<Sale> responseGetSale = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetSale, Sale.class,
				responseCreateSale.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetSale.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetSale.getStatusCode());
		assertEquals(responseCreateSale, responseGetSale.getBody());
	}

	@Test
	public void getAll() {

		HttpEntity<Sale> entityGetSales = new HttpEntity<Sale>(headers);

		ResponseEntity<Object[]> responseGetSales = restTemplate.exchange(EXTENDED_URI, HttpMethod.GET, entityGetSales, Object[].class);
		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetSales.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetSales.getStatusCode());
	}

	@Override
	@Test
	public void put() {

		Sale sale = create();
		HttpEntity<Sale> entityCreateSale = new HttpEntity<Sale>(sale, headers);

		ResponseEntity<Sale> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateSale, Sale.class);
		Sale responseCreateSale = responseCreate.getBody();

		responseCreateSale.setSaleProfit(999.99);
		HttpEntity<Sale> entity = new HttpEntity<Sale>(responseCreateSale, headers);

		ResponseEntity<Sale> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.PUT, entity, Sale.class, responseCreateSale.getId());
		Sale responseSale = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(responseCreateSale, responseSale);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Sale create() {

		Product container = new Product();
		container.setName("Fusscontainer");
		container.setDescription("Guter Container");
		container.setPriceNetto(1000.00);

		Customer customer = new Customer();
		customer.setTitle(Title.MR);
		customer.setFirstname("Andreas");
		customer.setLastname("Foitzik");
		customer.setCompany("123 GmbH");
		customer.setEmail("123@eviarc.com");
		customer.setPhone("07961/55166");
		customer.setAddress("Hauptstrasse 10");

		Vendor vendor = new Vendor();
		vendor.setName("Schreinereitest2 GmbH");
		vendor.setPhone("07961/55166");

		Sale sale = new Sale();
		sale.setContainer(container);
		sale.setContainerAmount(30);
		sale.setCustomer(customer);
		sale.setSaleProfit(1000.00);
		sale.setSaleReturn(1000.00);
		sale.setTimestamp(Calendar.getInstance());
		sale.setTransport("Hamburg");
		sale.setVendor(vendor);

		return sale;
	}

}
