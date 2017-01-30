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
package dash.test;

import org.apache.commons.codec.binary.Base64;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

/**
 * defines Base-Configurations for testing
 *
 */
public class BaseConfig {

	// defining REST-API Endpoints
	protected final static String BASE_URI = "http://localhost:8080";

	protected final static String REST_COMMENTS = "/api/rest/comments";
	protected final static String REST_CONTAINERS = "/api/rest/containers";
	protected final static String REST_CUSTOMERS = "/api/rest/customers";
	protected final static String REST_INQUIRERS = "/api/rest/inquirers";
	protected final static String REST_LEADS = "/api/rest/leads";
	protected final static String REST_OFFERS = "/api/rest/offers";
	protected final static String REST_PROCESSES = "/api/rest/processes";
	protected final static String REST_PROSPECTS = "/api/rest/prospects";
	protected final static String REST_SALES = "/api/rest/sales";
	protected final static String REST_VENDORS = "/api/rest/vendors";

	// defining credentials for tests
	protected final static String USERNAME = "andreas.foitzik@eviarc.com";
	protected final static String PASSWORD = "test";

	// defining credentials for Smtp-Testing
	protected final static String USER_PASSWORD = "abcdef123";
	protected final static String USER_NAME = "hascode";
	protected final static String EMAIL_USER_ADDRESS = "hascode@localhost";
	protected final static String EMAIL_TO = "someone@localhost.com";
	protected final static String EMAIL_SUBJECT = "Test E-Mail";
	protected final static String EMAIL_TEXT = "This is a test e-mail.";

	public HttpHeaders getHttpHeaders() {
		final HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.add("X-TenantID", "demo.leadplus.me");
		return headers;
	}

	public String getBasic64Creds(String username, String password) {
		String plainCreds = username + ":" + password;
		byte[] plainCredsBytes = plainCreds.getBytes();
		byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
		return new String(base64CredsBytes);
	}
}
