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

import org.apache.commons.codec.binary.Base64;
import org.hamcrest.core.IsEqual;
import org.hamcrest.core.IsNot;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.RestTemplate;

import dash.Application;
import dash.containermanagement.domain.Container;
import dash.inquirermanagement.domain.Inquirer;
import dash.inquirermanagement.domain.Title;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.business.ProcessRepository;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.salemanagement.domain.Sale;
import dash.vendormanagement.domain.Vendor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class ProcessIntegrationTest {

	@Autowired
	ProcessRepository processRepository;

	private RestTemplate restTemplate;
	private HttpHeaders headers;

	@Before
	public void setUp() {

		restTemplate = new TestRestTemplate();

		String plainCreds = "test:test";
		byte[] plainCredsBytes = plainCreds.getBytes();
		byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
		String base64Creds = new String(base64CredsBytes);

		headers = new HttpHeaders();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@Test
	public void postProcess() {
		//given
		Process process = createProcess();
		HttpEntity<Process> entity = new HttpEntity<Process>(process, headers);

		//when
		ResponseEntity<Process> response = restTemplate.exchange("http://localhost:8080/api/rest/processes", HttpMethod.POST, entity, Process.class);
		Process responseProcess = response.getBody();

		//then
		//		assertEquals(process, responseProcess);
		assertEquals(process, responseProcess);
	}

	@Test
	public void getProcess() {

		//given
		Process process = createProcess();
		HttpEntity<Process> entity = new HttpEntity<Process>(process, headers);

		//when
		ResponseEntity<Process> response = restTemplate.exchange("http://localhost:8080/api/rest/processes/{id}", HttpMethod.POST, entity, Process.class,
				process.getId());
		Process responseProcess = response.getBody();

		//then
		assertEquals(process, responseProcess);
	}

	@Test
	public void getNotEqualProcess() {

		//given
		Process process = createProcess();
		HttpEntity<Process> entity = new HttpEntity<Process>(process, headers);

		//when
		ResponseEntity<Process> response = restTemplate.exchange("http://localhost:8080/api/rest/processes/{id}", HttpMethod.POST, entity, Process.class, 1);
		Process responseProcess = response.getBody();

		//then
		assertEquals(createNotEqualProcess(), IsNot.not(IsEqual.equalTo(responseProcess)));
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
		vendor.setName("Karl Neu");
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

	private Process createNotEqualProcess() {

		Process process = new Process();

		Inquirer inquirer = new Inquirer();
		inquirer.setFirstname("Moritz");
		inquirer.setLastname("Mustermann");
		inquirer.setCompany("Einkauf Mustermann GmbH");
		inquirer.setEmail("max.mustermann@einkauf-mustermann.de");
		inquirer.setPhone("07961/55166");
		inquirer.setTitle(Title.MR);

		Vendor vendor = new Vendor();
		vendor.setName("Karl Neu");
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
