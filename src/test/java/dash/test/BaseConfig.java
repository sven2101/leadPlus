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

import static org.assertj.core.api.Assertions.assertThat;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import dash.usermanagement.domain.User;

/**
 * defines Base-Configurations for testing
 *
 */
public abstract class BaseConfig extends Credentials {

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
	protected final static String USERNAME = "admin@eviarc.com";
	protected final static String PASSWORD = "test";
	protected final static String SMTP_KEY = "P2lewq2NYKlAXhdu4pPAhzWktz3n5RpcstQlJXcEeTQ%3D";
	// SMTP KEY: P2lewq2NYKlAXhdu4pPAhzWktz3n5RpcstQlJXcEeTQ=
	// SMTP KEY: P2lewq2NYKlAXhdu4pPAhzWktz3n5RpcstQlJXcEeTQ%3D
	// SMTP VALUE: P2lewq2NYKlAXhdu4pPAhzWktz3n5RpcstQlJXcEeTQ%253D
	// http://demo.leadplus.localhost:8080/api/rest/notifications/users/2/notifications/send/P2lewq2NYKlAXhdu4pPAhzWktz3n5RpcstQlJXcEeTQ%253D
	protected final static String BASIC_HEADER = "YWRtaW5AZXZpYXJjLmNvbTorNVJvOEMvbWFqSEJtalNDUDVIazUwakRjYncyYUFxSHZ3MHRoZ05jc2pRPQ==";

	// defining credentials for Smtp-Testing
	protected final static String USER_PASSWORD = "abcdef123";
	protected final static String USER_NAME = "hascode";
	protected final static String EMAIL_USER_ADDRESS = "hascode@localhost";
	protected final static String EMAIL_TO = "someone@localhost.com";
	protected final static String EMAIL_SUBJECT = "Test E-Mail";
	protected final static String EMAIL_TEXT = "This is a test e-mail.";

	protected final static String EMAIL_RECIPIENTS = "eviarc.com@gmail.com, eviarc@web.de, eviarc@gmx.de";

	@Bean
	public TestRestTemplate testRestTemplate() {
		return new TestRestTemplate();
	}

	public HttpHeaders getHttpHeaders() {
		final HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.add("X-TenantID", "demo.leadplus.me");
		headers.add("Authorization", "Basic " + BASIC_HEADER);
		return headers;
	}

	public static String encodeURIComponent(String s) {
		String result;

		try {
			result = URLEncoder.encode(s, "UTF-8").replaceAll("\\+", "%20").replaceAll("\\%21", "!")
					.replaceAll("\\%27", "'").replaceAll("\\%28", "(").replaceAll("\\%29", ")")
					.replaceAll("\\%7E", "~");
		} catch (UnsupportedEncodingException e) {
			result = s;
		}

		return result;
	}

	public String getBasic64Creds(String username, String password) {
		String plainCreds = username + ":";

		byte a[] = plainCreds.getBytes();
		byte b[] = hashPassword(password.toCharArray(), username.getBytes(), 10000, 44);

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		try {
			outputStream.write(a);
			outputStream.write(b);
		} catch (IOException e) {
			e.printStackTrace();
		}

		byte plainCredsBytes[] = outputStream.toByteArray();
		byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
		return new String(base64CredsBytes);
	}

	protected byte[] hashPassword(final char[] password, final byte[] salt, final int iterations, final int length) {
		try {
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, length);
			SecretKey key = skf.generateSecret(spec);
			byte[] res = key.getEncoded();
			System.out.println(new String(res));
			return res;
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			throw new RuntimeException(e);
		}
	}

	protected User getUserById(final long id) {
		HttpEntity<Object> authenticate = new HttpEntity<>(this.getHttpHeaders());

		ResponseEntity<User> response = testRestTemplate().exchange(BASE_URI + "/users/2", HttpMethod.GET, authenticate,
				User.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
		return response.getBody();
	}
}
