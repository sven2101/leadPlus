package dash.notificationmanagement.rest.test;

import static dash.test.Provider.EMAIL_RECIPIENTS;
import static dash.test.Provider.EMAIL_SUBJECT;
import static dash.test.Provider.EMAIL_TEXT;
import static dash.test.Provider.SMTP_KEY;
import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.net.URISyntaxException;

import javax.mail.MessagingException;

import org.junit.Ignore;
import org.junit.Test;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationContext;
import dash.notificationmanagement.domain.NotificationType;
import dash.test.BaseConfig;

public class NotificationIntegrationTest extends BaseConfig {

	private final static String REST_NOTIFICATIONS = "/api/rest/users/{userId}/notifications/send";
	private final static String EXTENDED_URI_NOTIFICATIONS = BASE_URI + REST_NOTIFICATIONS;

	@Override
	@Bean
	public TestRestTemplate testRestTemplate() {
		return new TestRestTemplate();
	}

	@Test
	@Ignore
	public void sendNotification() throws URISyntaxException, IOException, InterruptedException, MessagingException {

		UriComponents uri = UriComponentsBuilder.fromHttpUrl(EXTENDED_URI_NOTIFICATIONS).buildAndExpand("2");

		HttpEntity<NotificationContext> notification = new HttpEntity<NotificationContext>(createPayload(),
				getHttpHeaders());

		ResponseEntity<Notification> response = testRestTemplate().exchange(uri.toUriString(), HttpMethod.POST,
				notification, Notification.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	private NotificationContext createPayload() {
		Notification notification = new Notification();
		notification.setRecipients(EMAIL_RECIPIENTS);
		notification.setRecipientsBCC(EMAIL_RECIPIENTS);
		notification.setRecipientsCC(EMAIL_RECIPIENTS);

		notification.setSubject(EMAIL_SUBJECT);
		notification.setContent(EMAIL_TEXT);
		notification.setDeleted(false);
		notification.setNotificationType(NotificationType.INFO);

		NotificationContext payload = new NotificationContext();
		payload.setNotification(notification);
		payload.setSmtpKey(SMTP_KEY);
		return payload;
	}

}
