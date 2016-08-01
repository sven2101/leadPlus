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
package dash.containermanagement.rest.test;

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
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class ContainerIntegrationTest extends BaseConfig implements IIntegrationTest {

	private String EXTENDED_URI = BASE_URI + "/api/rest/containers";

	@Before
	public void setup() {
		headers.clear();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@Override
	@Test
	public void post() {
		Container container = create();
		HttpEntity<Container> entity = new HttpEntity<Container>(container, headers);

		ResponseEntity<Container> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Container.class);
		Container responseContainer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(container, responseContainer);
	}

	@Override
	@Test
	public void get() {

		HttpEntity<Container> entityCreateContainer = new HttpEntity<Container>(create(), headers);

		ResponseEntity<Container> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateContainer, Container.class);
		Container responseCreateContainer = responseCreate.getBody();

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

		Container container = create();
		HttpEntity<Container> entityCreateContainer = new HttpEntity<Container>(container, headers);

		ResponseEntity<Container> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateContainer, Container.class);
		Container responseCreateContainer = responseCreate.getBody();

		responseCreateContainer.setName("Fußcontainer");
		HttpEntity<Container> entity = new HttpEntity<Container>(responseCreateContainer, headers);

		ResponseEntity<Container> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.PUT, entity, Container.class, responseCreateContainer.getId());
		Container responseContainer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(responseCreateContainer, responseContainer);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Container create() {

		Container container = new Container();
		container.setName("Kühlcontainer");
		container.setDescription("Dieser Kühlcontainer kühlt am aller besten");
		container.setPriceNetto(1000.00);

		return container;
	}
}
