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
import dash.inquirermanagement.domain.Inquirer;
import dash.inquirermanagement.domain.Title;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.salemanagement.domain.Sale;
import dash.test.BaseConfig;
import dash.vendormanagement.domain.Vendor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class ProcessIntegrationTest extends BaseConfig {

	private static final String EXTENDED_URI = BASE_URI + "/api/rest/processes";

	@Before
	public void setup() {
		headers.clear();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@Test
	public void postProcess() {
		Process process = createProcess();
		HttpEntity<Process> entity = new HttpEntity<Process>(process, headers);

		ResponseEntity<Process> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Process.class);
		Process responseProcess = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(process, responseProcess);
	}

	@Test
	public void getProcess() {

		HttpEntity<Process> entityCreateProcess = new HttpEntity<Process>(createProcess(), headers);

		ResponseEntity<Process> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateProcess, Process.class);
		Process responseCreateProcess = responseCreate.getBody();

		HttpEntity<Process> entityGetProcess = new HttpEntity<Process>(headers);

		ResponseEntity<Process> responseGetProcess = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetProcess, Process.class,
				responseCreateProcess.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetProcess.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetProcess.getStatusCode());
		assertEquals(createProcess(), responseGetProcess.getBody());
	}

	@Test
	public void updateProcess() {

		Process process = createProcess();
		HttpEntity<Process> entityCreateProcess = new HttpEntity<Process>(process, headers);

		ResponseEntity<Process> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateProcess, Process.class);
		Process responseCreateProcess = responseCreate.getBody();

		process.setStatus(Status.OFFER);

		HttpEntity<Process> entity = new HttpEntity<Process>(process, headers);

		ResponseEntity<Process> response = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.PUT, entity, Process.class, responseCreateProcess.getId());
		Process responseProcess = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(process, responseProcess);
	}

	@Ignore
	public void deleteProcess() {

	}

	private Process createProcess() {

		Process process = new Process();

		Inquirer inquirer = new Inquirer();
		inquirer.setFirstname("Max");
		inquirer.setLastname("Mustermann");
		inquirer.setCompany("Einkauf Mustermann GmbH");
		inquirer.setEmail("max.mustermann@einkauf-mustermann.de");
		inquirer.setPhone("07961/55166");
		inquirer.setTitle(Title.MR);

		Vendor vendor = new Vendor();
		vendor.setName("Karl Neu 10");
		vendor.setPhone("0761331234");

		Container container = new Container();
		container.setName("Kühlcontainer");
		container.setDescription("Dieser Kühlcontainer kühlt am aller besten");
		container.setPriceNetto(1000.00);

		Lead lead = new Lead();
		lead.setInquirer(inquirer);
		lead.setVendor(vendor);
		lead.setContainer(container);
		lead.setContainerAmount(30);
		lead.setMessage("Test Anfrage");
		lead.setDestination("Karlsruhe");

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
