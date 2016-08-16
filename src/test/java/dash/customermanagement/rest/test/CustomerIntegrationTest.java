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
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class CustomerIntegrationTest extends BaseConfig implements IIntegrationTest {

	private final static String EXTENDED_URI = BASE_URI + REST_CUSTOMERS;

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
		Customer customer = create();
		HttpEntity<Customer> entityCreateCustomer = new HttpEntity<Customer>(customer, headers);

		ResponseEntity<Customer> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateCustomer, Customer.class);
		Customer responseCreateCustomer = responseCreate.getBody();

		HttpEntity<Customer> entityGetCustomer = new HttpEntity<Customer>(headers);

		ResponseEntity<Customer> responseGetCustomer = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetCustomer, Customer.class,
				responseCreateCustomer.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetCustomer.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetCustomer.getStatusCode());
		assertEquals(customer, responseGetCustomer.getBody());
	}

	@Test
	public void getAll() {

		HttpEntity<Customer> entityGetCustomers = new HttpEntity<Customer>(headers);

		ResponseEntity<Object[]> responseGetCustomers = restTemplate.exchange(EXTENDED_URI, HttpMethod.GET, entityGetCustomers, Object[].class);
		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetCustomers.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetCustomers.getStatusCode());
	}

	@Override
	@Test
	public void put() {
		Customer customer = create();
		HttpEntity<Customer> entityCreateCustomer = new HttpEntity<Customer>(customer, headers);

		ResponseEntity<Customer> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateCustomer, Customer.class);
		Customer responseCreateCustomer = responseCreate.getBody();

		responseCreateCustomer.setEmail("test@eviarc.com");
		HttpEntity<Customer> entity = new HttpEntity<Customer>(responseCreateCustomer, headers);

		ResponseEntity<Customer> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.PUT, entity, Customer.class, responseCreateCustomer.getId());
		Customer responseCustomer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(responseCreateCustomer, responseCustomer);
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
