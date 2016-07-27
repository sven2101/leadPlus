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
package dash.vendormanagement.rest.test;

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
import dash.test.BaseConfig;
import dash.vendormanagement.domain.Vendor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class VendorIntegrationTest extends BaseConfig {

	private static final String EXTENDED_URI = BASE_URI + "/api/rest/vendors";

	@Before
	public void setup() {
		headers.clear();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@Test
	public void postVendor() {
		Vendor vendor = createVendor1();
		HttpEntity<Vendor> entity = new HttpEntity<Vendor>(vendor, headers);

		ResponseEntity<Vendor> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Vendor.class);
		Vendor responseVendor = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(vendor, responseVendor);
	}

	@Test
	public void getProcess() {

		HttpEntity<Vendor> entityCreateVendor = new HttpEntity<Vendor>(createVendor5(), headers);

		ResponseEntity<Vendor> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateVendor, Vendor.class);
		Vendor responseCreateVendor = responseCreate.getBody();

		HttpEntity<Vendor> entityGetVendor = new HttpEntity<Vendor>(headers);

		ResponseEntity<Vendor> responseGetVendor = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetVendor, Vendor.class,
				responseCreateVendor.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetVendor.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetVendor.getStatusCode());
		assertEquals(createVendor5(), responseGetVendor.getBody());
	}

	@Test
	public void updateVendor() {

		Vendor vendor = createVendor6();
		HttpEntity<Vendor> entityCreateVendor = new HttpEntity<Vendor>(vendor, headers);

		ResponseEntity<Vendor> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateVendor, Vendor.class);
		Vendor responseCreateVendor = responseCreate.getBody();

		vendor.setName("Uwe");

		HttpEntity<Vendor> entity = new HttpEntity<Vendor>(vendor, headers);

		ResponseEntity<Vendor> response = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.PUT, entity, Vendor.class, responseCreateVendor.getId());
		Vendor responseVendor = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(vendor, responseVendor);
	}

	@Ignore
	public void deleteProcess() {

	}

	private Vendor createVendor1() {

		Vendor vendor = new Vendor();
		vendor.setName("Karl Neu 3");
		vendor.setPhone("0761331234");

		return vendor;
	}

	private Vendor createVendor5() {

		Vendor vendor = new Vendor();
		vendor.setName("Karl Neu 5");
		vendor.setPhone("0761331234");

		return vendor;
	}

	private Vendor createVendor6() {

		Vendor vendor = new Vendor();
		vendor.setName("Karl Neu 6");
		vendor.setPhone("0761331234");

		return vendor;
	}

}
