package dash.usermanagement.registration.rest.test;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Ignore;
import org.junit.Test;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import dash.test.BaseConfig;
import dash.usermanagement.registration.domain.Registration;
import dash.usermanagement.registration.domain.Validation;

public class UserIntegrationTest extends BaseConfig {

	private final static String REST_REGISTRATION = "/api/rest/registrations";
	private final static String REST_REGISTRATION_USER_ALREADY_EXISTS = "/unique/email";
	private final static String EXTENDED_URI_REGISTRATION = BASE_URI + REST_REGISTRATION;
	private final static String EXTENDED_URI_REGISTRATION_UNIQUE_EMAIL = BASE_URI + REST_REGISTRATION
			+ REST_REGISTRATION_USER_ALREADY_EXISTS;

	@Override
	@Bean
	public TestRestTemplate testRestTemplate() {
		return new TestRestTemplate();
	}

	@Test
	@Ignore
	public void post() {
		RegistrationWrapper userRegistration = createRegistration();

		HttpEntity<RegistrationWrapper> registration = new HttpEntity<RegistrationWrapper>(userRegistration,
				this.getHttpHeaders());

		ResponseEntity<Registration> response = testRestTemplate().exchange(EXTENDED_URI_REGISTRATION, HttpMethod.POST,
				registration, Registration.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
	}

	@Test
	@Ignore
	public void postEmailAlreadyExists() {
		RegistrationWrapper userRegistration = createRegistration();

		Validation validation = new Validation();
		validation.setValidation(true);

		HttpEntity<RegistrationWrapper> registration = new HttpEntity<RegistrationWrapper>(userRegistration,
				this.getHttpHeaders());

		ResponseEntity<Validation> response = testRestTemplate().exchange(EXTENDED_URI_REGISTRATION_UNIQUE_EMAIL,
				HttpMethod.POST, registration, Validation.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(response.getBody()).isEqualTo(validation);
	}

	public RegistrationWrapper createRegistration() {
		RegistrationWrapper registrationWrapper = new RegistrationWrapper();
		registrationWrapper.setFirstname("Max");
		registrationWrapper.setLastname("Mustermann");
		registrationWrapper.setPassword("test");
		registrationWrapper.setPassword2("test");
		registrationWrapper.setEmail("Max.Mustermann@demo.com");
		return registrationWrapper;
	}
}
