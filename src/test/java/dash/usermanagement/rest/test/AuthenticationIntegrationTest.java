package dash.usermanagement.rest.test;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import dash.test.BaseConfig;
import dash.usermanagement.domain.User;

public class AuthenticationIntegrationTest extends BaseConfig {

	private final static String REST_USERS_ALL = "/user";
	private final static String EXTENDED_URI_USER_ALL = BASE_URI + REST_USERS_ALL;

	@Override
	@Bean
	public TestRestTemplate testRestTemplate() {
		return new TestRestTemplate();
	}

	@Test
	public void authenticate() {
		HttpEntity<Object> authenticate = new HttpEntity<>(this.getHttpHeaders());

		ResponseEntity<User> response = testRestTemplate().exchange(EXTENDED_URI_USER_ALL, HttpMethod.GET, authenticate,
				User.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

}
