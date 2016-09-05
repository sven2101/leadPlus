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
package dash.leadmanagement.rest.test;

import static org.junit.Assert.assertEquals;

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
import dash.customermanagement.domain.Title;
import dash.leadmanagement.domain.Lead;
import dash.productmanagement.domain.Product;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;
import dash.vendormanagement.domain.Vendor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
@Ignore
public class LeadIntegrationTest extends BaseConfig implements IIntegrationTest {

	private final static String EXTENDED_URI = BASE_URI + REST_LEADS;

	@Override
	@Test
	public void post() {
		Lead lead = create();
		HttpEntity<Lead> entity = new HttpEntity<Lead>(lead, headers);

		ResponseEntity<Lead> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Lead.class);
		Lead responseLead = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(lead, responseLead);
	}

	@Override
	@Test
	public void get() {

		Lead lead = create();

		HttpEntity<Lead> entityCreateLead = new HttpEntity<Lead>(lead, headers);

		ResponseEntity<Lead> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateLead, Lead.class);
		Lead responseCreateLead = responseCreate.getBody();

		HttpEntity<Lead> entityGetLead = new HttpEntity<Lead>(headers);

		ResponseEntity<Lead> responseGetLead = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetLead, Lead.class,
				responseCreateLead.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetLead.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetLead.getStatusCode());
		assertEquals(responseCreateLead, responseGetLead.getBody());
	}

	@Test
	public void getAll() {

		HttpEntity<Lead> entityGetLeads = new HttpEntity<Lead>(headers);

		ResponseEntity<Object[]> responseGetLeads = restTemplate.exchange(EXTENDED_URI, HttpMethod.GET, entityGetLeads, Object[].class);
		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetLeads.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetLeads.getStatusCode());
	}

	@Override
	@Test
	public void put() {

		Lead lead = create();
		HttpEntity<Lead> entityCreateLead = new HttpEntity<Lead>(lead, headers);

		ResponseEntity<Lead> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateLead, Lead.class);
		Lead responseCreateLead = responseCreate.getBody();

		HttpEntity<Lead> entity = new HttpEntity<Lead>(responseCreateLead, headers);

		ResponseEntity<Lead> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.PUT, entity, Lead.class, responseCreateLead.getId());
		Lead responseLead = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(responseCreateLead, responseLead);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Lead create() {

		Customer customer = new Customer();
		customer.setFirstname("Max");
		customer.setLastname("Mustermann");
		customer.setCompany("Einkauf Mustermann GmbH");
		customer.setEmail("max.mustermann@einkauf-mustermann.de");
		customer.setPhone("07961/55166");
		customer.setTitle(Title.MR);

		Vendor vendor = new Vendor();
		vendor.setName("Karl Neu 2");
		vendor.setPhone("0761331234");

		Product container = new Product();
		container.setName("Kühlcontainer");
		container.setDescription("Dieser Kühlcontainer kühlt am aller besten");
		container.setPriceNetto(1000.00);

		Lead lead = new Lead();
		lead.setCustomer(customer);
		lead.setVendor(vendor);
		lead.setMessage("Test Anfrage");
		lead.setDeliveryAddress("Karlsruhe");

		return lead;
	}

}
