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
import dash.productmanagement.domain.Product;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class ContainerIntegrationTest extends BaseConfig implements IIntegrationTest {

	private final static String EXTENDED_URI = BASE_URI + REST_CONTAINERS;

	@Override
	@Test
	public void post() {
		Product container = create();
		HttpEntity<Product> entity = new HttpEntity<Product>(container, headers);

		ResponseEntity<Product> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Product.class);
		Product responseContainer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(container, responseContainer);
	}

	@Override
	@Test
	public void get() {

		HttpEntity<Product> entityCreateContainer = new HttpEntity<Product>(create(), headers);

		ResponseEntity<Product> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateContainer, Product.class);
		Product responseCreateContainer = responseCreate.getBody();

		HttpEntity<Product> entityGetContainer = new HttpEntity<Product>(headers);

		ResponseEntity<Product> responseGetContainer = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetContainer, Product.class,
				responseCreateContainer.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetContainer.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetContainer.getStatusCode());
		assertEquals(create(), responseGetContainer.getBody());
	}

	@Test
	public void getAll() {

		HttpEntity<Product> entityGetContainers = new HttpEntity<Product>(headers);

		ResponseEntity<Object[]> responseGetContainers = restTemplate.exchange(EXTENDED_URI, HttpMethod.GET, entityGetContainers, Object[].class);
		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetContainers.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetContainers.getStatusCode());
	}

	@Override
	@Test
	public void put() {

		Product container = create();
		HttpEntity<Product> entityCreateContainer = new HttpEntity<Product>(container, headers);

		ResponseEntity<Product> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateContainer, Product.class);
		Product responseCreateContainer = responseCreate.getBody();

		responseCreateContainer.setName("Fußcontainer");
		HttpEntity<Product> entity = new HttpEntity<Product>(responseCreateContainer, headers);

		ResponseEntity<Product> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.PUT, entity, Product.class, responseCreateContainer.getId());
		Product responseContainer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(responseCreateContainer, responseContainer);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Product create() {

		Product container = new Product();
		container.setName("Kühlcontainer");
		container.setDescription("Dieser Kühlcontainer kühlt am aller besten");
		container.setPriceNetto(1000.00);

		return container;
	}
}
