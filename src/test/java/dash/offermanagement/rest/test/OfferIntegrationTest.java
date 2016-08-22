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
package dash.offermanagement.rest.test;

import static org.junit.Assert.assertEquals;

import java.util.Calendar;

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
import dash.offermanagement.domain.Offer;
import dash.productmanagement.domain.Product;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;
import dash.vendormanagement.domain.Vendor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
@Ignore
public class OfferIntegrationTest extends BaseConfig implements IIntegrationTest {

	private final static String EXTENDED_URI = BASE_URI + REST_OFFERS;

	@Override
	@Ignore
	public void post() {
		Offer offer = create();
		HttpEntity<Offer> entity = new HttpEntity<Offer>(offer, headers);

		ResponseEntity<Offer> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Offer.class);
		Offer responseOffer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(offer, responseOffer);
	}

	@Override
	@Test
	public void get() {

		Offer offer = create();

		HttpEntity<Offer> entityCreateOffer = new HttpEntity<Offer>(offer, headers);

		ResponseEntity<Offer> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateOffer, Offer.class);
		Offer responseCreateOffer = responseCreate.getBody();

		HttpEntity<Offer> entityGetOffer = new HttpEntity<Offer>(headers);

		ResponseEntity<Offer> responseGetOffer = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetOffer, Offer.class,
				responseCreateOffer.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetOffer.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetOffer.getStatusCode());
		assertEquals(responseCreateOffer, responseGetOffer.getBody());
	}

	@Test
	public void getAll() {

		HttpEntity<Offer> entityGetOffers = new HttpEntity<Offer>(headers);

		ResponseEntity<Object[]> responseGetOffers = restTemplate.exchange(EXTENDED_URI, HttpMethod.GET, entityGetOffers, Object[].class);
		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetOffers.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetOffers.getStatusCode());
	}

	@Override
	@Test
	public void put() {

		Offer offer = create();
		HttpEntity<Offer> entityCreateOffer = new HttpEntity<Offer>(offer, headers);

		ResponseEntity<Offer> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateOffer, Offer.class);
		Offer responseCreateOffer = responseCreate.getBody();

		responseCreateOffer.setContainerAmount(10);
		HttpEntity<Offer> entity = new HttpEntity<Offer>(responseCreateOffer, headers);

		ResponseEntity<Offer> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.PUT, entity, Offer.class, responseCreateOffer.getId());
		Offer responseOffer = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(responseCreateOffer, responseOffer);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Offer create() {
		Offer offer = new Offer();

		Product container = new Product();
		container.setName("Fusscontainer");
		container.setDescription("Dieser Container ist 3 Fuss lang. ");
		container.setPriceNetto(200.00);

		Customer customer = new Customer();
		customer.setTitle(Title.MR);
		customer.setFirstname("Andreas");
		customer.setLastname("Foitzik");
		customer.setCompany("eviarc GmbH");
		customer.setEmail("test@eviar.com");
		customer.setPhone("07961/55166");
		customer.setAddress("Hauptstrasse 10");

		Vendor vendor = new Vendor();
		vendor.setName("***REMOVED***");
		vendor.setPhone("031/7891");

		offer.setContainer(container);
		offer.setContainerAmount(30);
		offer.setDeliveryAddress("Berlin");
		offer.setDeliveryDate(Calendar.getInstance());
		offer.setOfferPrice(200.00);
		offer.setCustomer(customer);
		offer.setTimestamp(Calendar.getInstance());
		offer.setVendor(vendor);
		return offer;
	}

}
