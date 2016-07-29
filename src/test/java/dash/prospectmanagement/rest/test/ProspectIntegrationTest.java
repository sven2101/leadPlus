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
package dash.prospectmanagement.rest.test;

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
import dash.inquirermanagement.domain.Title;
import dash.prospectmanagement.domain.Prospect;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class ProspectIntegrationTest extends BaseConfig implements IIntegrationTest {

	private static final String EXTENDED_URI = BASE_URI + "/api/rest/prospects";

	@Before
	public void setup() {
		headers.clear();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@Override
	@Test
	public void post() {
		Prospect prospect = create();
		HttpEntity<Prospect> entity = new HttpEntity<Prospect>(prospect, headers);

		ResponseEntity<Prospect> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Prospect.class);
		Prospect responseProspect = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(prospect, responseProspect);
	}

	@Override
	@Test
	public void get() {

		HttpEntity<Prospect> entityCreateProspect = new HttpEntity<Prospect>(create(), headers);

		ResponseEntity<Prospect> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateProspect, Prospect.class);
		Prospect responseCreateProspect = responseCreate.getBody();

		HttpEntity<Prospect> entityGetProspect = new HttpEntity<Prospect>(headers);

		ResponseEntity<Prospect> responseGetProspect = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetProspect, Prospect.class,
				responseCreateProspect.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetProspect.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetProspect.getStatusCode());
		assertEquals(create(), responseGetProspect.getBody());
	}

	@Override
	@Test
	public void put() {

		Prospect prospect = create();
		HttpEntity<Prospect> entityCreateProspect = new HttpEntity<Prospect>(prospect, headers);

		ResponseEntity<Prospect> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateProspect, Prospect.class);
		Prospect responseCreateProspect = responseCreate.getBody();

		responseCreateProspect.setEmail("test@eviarc.com");
		HttpEntity<Prospect> entity = new HttpEntity<Prospect>(responseCreateProspect, headers);

		ResponseEntity<Prospect> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.PUT, entity, Prospect.class, responseCreateProspect.getId());
		Prospect responseProspect = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(responseCreateProspect, responseProspect);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Prospect create() {
		Prospect prospect = new Prospect();
		prospect.setAddress("Teststraﬂe 10");
		prospect.setCompany("123 GmbH");
		prospect.setEmail("test@web.de");
		prospect.setFirstname("Andreas");
		prospect.setLastname("Mayer");
		prospect.setPhone("07961/55166");
		prospect.setTitle(Title.MR);
		return prospect;
	}

}
