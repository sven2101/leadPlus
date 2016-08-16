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
package dash.processmanagement.rest.test;

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
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.productmanagement.domain.Product;
import dash.salemanagement.domain.Sale;
import dash.statusmanagement.domain.Status;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;
import dash.vendormanagement.domain.Vendor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class ProcessIntegrationTest extends BaseConfig implements IIntegrationTest {

	private final static String EXTENDED_URI = BASE_URI + REST_PROCESSES;

	@Override
	@Test
	public void post() {
		Process process = create();
		HttpEntity<Process> entity = new HttpEntity<Process>(process, headers);

		ResponseEntity<Process> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Process.class);
		Process responseProcess = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(process, responseProcess);
	}

	@Test
	public void getAll() {

		HttpEntity<Process> entityGetProcesses = new HttpEntity<Process>(headers);

		ResponseEntity<Object[]> responseGetProcesses = restTemplate.exchange(EXTENDED_URI, HttpMethod.GET,
				entityGetProcesses, Object[].class);
		assertEquals(ContentType.APPLICATION_JSON.getCharset(),
				responseGetProcesses.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetProcesses.getStatusCode());
	}

	@Override
	@Test
	public void get() {

		HttpEntity<Process> entityCreateProcess = new HttpEntity<Process>(create(), headers);

		ResponseEntity<Process> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST,
				entityCreateProcess, Process.class);
		Process responseCreateProcess = responseCreate.getBody();

		HttpEntity<Process> entityGetProcess = new HttpEntity<Process>(headers);

		ResponseEntity<Process> responseGetProcess = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET,
				entityGetProcess, Process.class, responseCreateProcess.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(),
				responseGetProcess.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetProcess.getStatusCode());
		assertEquals(create(), responseGetProcess.getBody());
	}

	@Override
	@Test
	public void put() {

		Process process = create();
		HttpEntity<Process> entityCreateProcess = new HttpEntity<Process>(process, headers);

		ResponseEntity<Process> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST,
				entityCreateProcess, Process.class);
		Process responseCreateProcess = responseCreate.getBody();

		responseCreateProcess.setStatus(Status.OFFER);

		HttpEntity<Process> entity = new HttpEntity<Process>(responseCreateProcess, headers);

		ResponseEntity<Process> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.PUT, entity, Process.class,
				responseCreateProcess.getId());
		Process responseProcess = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(responseCreateProcess, responseProcess);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Process create() {

		Process process = new Process();

		Customer customer = new Customer();
		customer.setFirstname("Max");
		customer.setLastname("Mustermann");
		customer.setCompany("Einkauf Mustermann GmbH");
		customer.setEmail("max.mustermann@einkauf-mustermann.de");
		customer.setPhone("07961/55166");
		customer.setTitle(Title.MR);

		Vendor vendor = new Vendor();
		vendor.setName("Karl Neu 9");
		vendor.setPhone("0761331234");

		Product container = new Product();
		container.setName("Kühlcontainer");
		container.setDescription("Dieser Kühlcontainer kühlt am aller besten");
		container.setPriceNetto(1000.00);

		Lead lead = new Lead();
		lead.setCustomer(customer);
		lead.setVendor(vendor);
		lead.setContainer(container);
		lead.setContainerAmount(30);
		lead.setMessage("Test Anfrage");
		lead.setDeliveryAddress("Karlsruhe");

		Offer offer = new Offer();
		offer.setVendor(vendor);
		offer.setContainer(container);

		Sale sale = new Sale();
		sale.setVendor(vendor);
		sale.setContainer(container);

		process.setLead(lead);
		process.setOffer(offer);
		process.setSale(sale);
		process.setProcessor(null);
		process.setStatus(Status.OPEN);

		return process;
	}

}
