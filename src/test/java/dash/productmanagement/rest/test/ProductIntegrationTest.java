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
package dash.productmanagement.rest.test;

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
@Ignore
public class ProductIntegrationTest extends BaseConfig implements IIntegrationTest {

	private final static String EXTENDED_URI = BASE_URI + REST_CONTAINERS;

	@Override
	@Test
	public void post() {
		Product product = create();
		HttpEntity<Product> entity = new HttpEntity<Product>(product, headers);

		ResponseEntity<Product> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Product.class);
		Product responseProduct = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(product, responseProduct);
	}

	@Override
	@Test
	public void get() {

		HttpEntity<Product> entityCreateProduct = new HttpEntity<Product>(create(), headers);

		ResponseEntity<Product> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateProduct, Product.class);
		Product responseCreateProduct = responseCreate.getBody();

		HttpEntity<Product> entityGetProduct = new HttpEntity<Product>(headers);

		ResponseEntity<Product> responseGetProduct = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetProduct, Product.class,
				responseCreateProduct.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetProduct.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetProduct.getStatusCode());
		assertEquals(create(), responseGetProduct.getBody());
	}

	@Test
	public void getAll() {

		HttpEntity<Product> entityGetProduct = new HttpEntity<Product>(headers);

		ResponseEntity<Object[]> responseGetProduct = restTemplate.exchange(EXTENDED_URI, HttpMethod.GET, entityGetProduct, Object[].class);
		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetProduct.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetProduct.getStatusCode());
	}

	@Override
	@Test
	public void put() {

		Product product = create();
		HttpEntity<Product> entityCreateProduct = new HttpEntity<Product>(product, headers);

		ResponseEntity<Product> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateProduct, Product.class);
		Product responseCreateProduct = responseCreate.getBody();

		responseCreateProduct.setName("Fußcontainer");
		HttpEntity<Product> entity = new HttpEntity<Product>(responseCreateProduct, headers);

		ResponseEntity<Product> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.PUT, entity, Product.class, responseCreateProduct.getId());
		Product responseContainer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(responseCreateProduct, responseContainer);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Product create() {

		Product product = new Product();
		product.setName("Kühlcontainer");
		product.setDescription("Dieser Kühlcontainer kühlt am aller besten");
		product.setNetPrice(1000.00);

		return product;
	}
}
