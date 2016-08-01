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
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import dash.Application;
import dash.containermanagement.business.ContainerRepository;
import dash.containermanagement.domain.Container;
import dash.inquirermanagement.domain.Title;
import dash.offermanagement.business.OfferRepository;
import dash.offermanagement.domain.Offer;
import dash.prospectmanagement.business.ProspectRepository;
import dash.prospectmanagement.domain.Prospect;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;
import dash.vendormanagement.business.VendorRepository;
import dash.vendormanagement.domain.Vendor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class OfferIntegrationTest extends BaseConfig implements IIntegrationTest {

	private String EXTENDED_URI = BASE_URI + "/api/rest/offers";

	@Autowired
	private OfferRepository offerRepository;

	@Autowired
	private ContainerRepository containerRepository;

	@Autowired
	private ProspectRepository prospectRepository;

	@Autowired
	private VendorRepository vendorRepository;

	@Before
	public void setup() {
		headers.clear();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@After
	public void after() {
		offerRepository.deleteAll();
		containerRepository.deleteAll();
		prospectRepository.deleteAll();
		vendorRepository.deleteAll();
	}

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

		Container container = new Container();
		container.setName("Fusscontainer");
		container.setDescription("Dieser Container ist 3 Fuss lang. ");
		container.setPriceNetto(200.00);

		Prospect prospect = new Prospect();
		prospect.setTitle(Title.MR);
		prospect.setFirstname("Andreas");
		prospect.setLastname("Foitzik");
		prospect.setCompany("eviarc GmbH");
		prospect.setEmail("test@eviar.com");
		prospect.setPhone("07961/55166");
		prospect.setAddress("Hauptstrasse 10");

		Vendor vendor = new Vendor();
		vendor.setName("***REMOVED***");
		vendor.setPhone("031/7891");

		offer.setContainer(container);
		offer.setContainerAmount(30);
		offer.setDeliveryAddress("Berlin");
		offer.setDeliveryDate(Calendar.getInstance());
		offer.setOfferPrice(200.00);
		offer.setProspect(prospect);
		offer.setTimestamp(Calendar.getInstance());
		offer.setVendor(vendor);
		return offer;
	}

}
