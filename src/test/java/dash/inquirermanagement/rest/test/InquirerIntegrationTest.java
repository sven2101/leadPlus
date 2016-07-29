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
package dash.inquirermanagement.rest.test;

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
import dash.inquirermanagement.domain.Inquirer;
import dash.inquirermanagement.domain.Title;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class InquirerIntegrationTest extends BaseConfig implements IIntegrationTest {

	private static final String EXTENDED_URI = BASE_URI + "/api/rest/inquirers";

	@Before
	public void setup() {
		headers.clear();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@Override
	@Test
	public void post() {
		Inquirer inquirer = create();
		HttpEntity<Inquirer> entity = new HttpEntity<Inquirer>(inquirer, headers);

		ResponseEntity<Inquirer> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Inquirer.class);
		Inquirer responseInquirer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(inquirer, responseInquirer);
	}

	@Override
	@Test
	public void get() {

		HttpEntity<Inquirer> entityCreateInquirer = new HttpEntity<Inquirer>(create(), headers);

		ResponseEntity<Inquirer> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateInquirer, Inquirer.class);
		Inquirer responseCreateInquirer = responseCreate.getBody();

		HttpEntity<Inquirer> entityGetInquirer = new HttpEntity<Inquirer>(headers);

		ResponseEntity<Inquirer> responseGetInquirer = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetInquirer, Inquirer.class,
				responseCreateInquirer.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetInquirer.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetInquirer.getStatusCode());
		assertEquals(create(), responseGetInquirer.getBody());

	}

	@Override
	@Test
	public void put() {

		Inquirer inquirer = create();
		HttpEntity<Inquirer> entityCreateInquirer = new HttpEntity<Inquirer>(inquirer, headers);

		ResponseEntity<Inquirer> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateInquirer, Inquirer.class);
		Inquirer responseCreateInquirer = responseCreate.getBody();

		inquirer.setFirstname("Hans");
		HttpEntity<Inquirer> entity = new HttpEntity<Inquirer>(inquirer, headers);

		ResponseEntity<Inquirer> response = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.PUT, entity, Inquirer.class,
				responseCreateInquirer.getId());
		Inquirer responseInquirer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(inquirer, responseInquirer);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Inquirer create() {
		Inquirer inquirer = new Inquirer();
		inquirer.setFirstname("Max");
		inquirer.setLastname("Mustermann");
		inquirer.setCompany("Einkauf Mustermann GmbH");
		inquirer.setEmail("max.mustermann@einkauf-mustermann.de");
		inquirer.setPhone("07961/55166");
		inquirer.setTitle(Title.MR);
		return inquirer;
	}

}
