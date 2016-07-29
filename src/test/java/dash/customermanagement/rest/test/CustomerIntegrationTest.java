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
package dash.customermanagement.rest.test;

import static org.junit.Assert.assertEquals;

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
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class CustomerIntegrationTest extends BaseConfig implements IIntegrationTest {

	private static final String EXTENDED_URI = BASE_URI + "/api/rest/customers";

	@Before
	public void setup() {
		headers.clear();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@Override
	@Test
	public void post() {
		Customer customer = create();
		HttpEntity<Customer> entity = new HttpEntity<Customer>(customer, headers);

		ResponseEntity<Customer> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Customer.class);
		Customer responseCustomer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(customer, responseCustomer);
	}

	@Override
	@Test
	public void get() {
		HttpEntity<Customer> entityCreateCustomer = new HttpEntity<Customer>(create(), headers);

		ResponseEntity<Customer> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateCustomer, Customer.class);
		Customer responseCreateContainer = responseCreate.getBody();

		HttpEntity<Container> entityGetContainer = new HttpEntity<Container>(headers);

		ResponseEntity<Container> responseGetContainer = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetContainer, Container.class,
				responseCreateContainer.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetContainer.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetContainer.getStatusCode());
		assertEquals(create(), responseGetContainer.getBody());
	}

	@Override
	@Test
	public void put() {
		Customer customer = create();
		HttpEntity<Customer> entityCreateCustomer = new HttpEntity<Customer>(customer, headers);

		ResponseEntity<Customer> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateCustomer, Customer.class);
		Customer responseCreateCustomer = responseCreate.getBody();

		customer.setEmail("test@eviarc.com");
		HttpEntity<Customer> entity = new HttpEntity<Customer>(customer, headers);

		ResponseEntity<Customer> response = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.PUT, entity, Customer.class,
				responseCreateCustomer.getId());
		Customer responseCustomer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(customer, responseCustomer);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Customer create() {
		Customer customer = new Customer();
		customer.setAddress("Teststraﬂe 10");
		customer.setCompany("123 GmbH");
		customer.setEmail("test@web.de");
		customer.setFirstname("Andreas");
		customer.setLastname("Mayer");
		customer.setPhone("07961/55166");
		customer.setTitle(Title.MR);
		return customer;
	}

}
