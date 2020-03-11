package dash.test;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.h2.server.web.WebServlet;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import dash.usermanagement.domain.User;

/**
 * defines Base-Configurations for testing
 *
 */
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
public abstract class BaseConfig {

	@Bean
	public ServletRegistrationBean h2servletRegistration() {
		ServletRegistrationBean registration = new ServletRegistrationBean(new WebServlet());
		registration.addUrlMappings("/console/*");
		return registration;
	}

	// REST-API Endpoints
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

	protected final static String BASIC_HEADER = "***REMOVED***";

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
