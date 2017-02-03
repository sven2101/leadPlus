package dash.smtpmanagement.rest.test;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import dash.smtpmanagement.domain.Smtp;
import dash.smtpmanagement.domain.SmtpEncryptionType;
import dash.test.BaseConfig;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@Order(value = 3)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
public class SmtpIntegrationTest extends BaseConfig {

	private final static String REST_SMTP = "/api/rest/smtps";
	private final static String REST_SMTP_TEST = REST_SMTP + "/{id}/test";
	private final static String EXTENDED_URI_SAVE = BASE_URI + REST_SMTP;
	private final static String EXTENDED_URI_TEST = BASE_URI + REST_SMTP_TEST;

	@Override
	@Bean
	public TestRestTemplate testRestTemplate() {
		return new TestRestTemplate();
	}

	@Test()
	public void test1() {

		HttpEntity<SmtpContextWrapper> smtp = new HttpEntity<SmtpContextWrapper>(createPayload1(),
				this.getHttpHeaders());
		ResponseEntity<Smtp> response = testRestTemplate().exchange(EXTENDED_URI_SAVE, HttpMethod.POST, smtp,
				Smtp.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
	}

	@Test
	public void test2() {
		UriComponents uri = UriComponentsBuilder.fromHttpUrl(EXTENDED_URI_TEST).buildAndExpand("7");

		HttpEntity<String> smtp = new HttpEntity<String>(SMTP_KEY, this.getHttpHeaders());
		ResponseEntity<Smtp> response = testRestTemplate().exchange(uri.toString(), HttpMethod.POST, smtp, Smtp.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test()
	public void test3() {

		HttpEntity<SmtpContextWrapper> smtp = new HttpEntity<SmtpContextWrapper>(createPayload2(),
				this.getHttpHeaders());
		ResponseEntity<Smtp> response = testRestTemplate().exchange(EXTENDED_URI_SAVE, HttpMethod.POST, smtp,
				Smtp.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
	}

	@Test
	public void test4() {
		UriComponents uri = UriComponentsBuilder.fromHttpUrl(EXTENDED_URI_TEST).buildAndExpand("7");

		HttpEntity<String> smtp = new HttpEntity<String>(SMTP_KEY, this.getHttpHeaders());
		ResponseEntity<String> response = testRestTemplate().exchange(uri.toString(), HttpMethod.POST, smtp,
				String.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	public SmtpContextWrapper createPayload1() {
		SmtpWrapper smtp = new SmtpWrapper();
		smtp.setId(Long.valueOf(7));
		smtp.setSender(SENDER);
		smtp.setHost(GMAIL_SMTP_SERVER);
		smtp.setUsername(GMAIL_EMAIL);
		smtp.setPassword(GMAIL_PASSWORD.getBytes());
		smtp.setEmail(GMAIL_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.TLS);
		smtp.setPort(587);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());
		smtp.setUser(getUserById(2));

		SmtpContextWrapper payload = new SmtpContextWrapper();
		payload.setSmtp(smtp);
		payload.setSmtpKey(SMTP_KEY);

		return payload;
	}

	public SmtpContextWrapper createPayload2() {
		SmtpWrapper smtp = new SmtpWrapper();
		smtp.setId(Long.valueOf(7));
		smtp.setSender(SENDER);
		smtp.setHost(GMAIL_SMTP_SERVER);
		smtp.setUsername(GMAIL_EMAIL);
		smtp.setPassword("test".getBytes());
		smtp.setEmail(GMAIL_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.TLS);
		smtp.setPort(587);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());
		smtp.setUser(getUserById(2));

		SmtpContextWrapper payload = new SmtpContextWrapper();
		payload.setSmtp(smtp);
		payload.setSmtpKey(SMTP_KEY);

		return payload;
	}
}
