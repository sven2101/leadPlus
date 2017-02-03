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
package dash.tenantmanagement.rest.test;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import dash.licensemanangement.domain.License;
import dash.licensemanangement.domain.LicenseEnum;
import dash.tenantmanagement.domain.Tenant;
import dash.test.BaseConfig;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@Order(value = 1)
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
public class TenantIntegrationTest extends BaseConfig {

	private final static String REST_TENANTS = "/api/rest/tenants";
	private final static String EXTENDED_URI = BASE_URI + REST_TENANTS;

	@Bean
	public TestRestTemplate testRestTemplate() {
		return new TestRestTemplate();
	}

	@Test
	public void post() {
		Tenant tenant = createTenant();
		ResponseEntity<Tenant> response = testRestTemplate().postForEntity(EXTENDED_URI, tenant, Tenant.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
		assertThat(response.getBody()).isEqualTo(tenant);
	}

	public Tenant createTenant() {
		Tenant tenant = new Tenant();
		tenant.setTenantKey("eviarc");
		tenant.setAddress("Karlsruhe");
		tenant.setDescription("Tenant for JUnit Tests");
		tenant.setLicense(createLicense());
		return tenant;
	}

	public License createLicense() {
		License license = new License();
		license.setLicenseType(LicenseEnum.FREE);
		license.setTrial(true);
		return license;
	}

}
