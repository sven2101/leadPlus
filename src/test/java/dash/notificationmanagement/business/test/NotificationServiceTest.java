package dash.notificationmanagement.business.test;

import static dash.test.Provider.SMTP_KEY;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import dash.fileuploadmanagement.business.IFileUploadService;
import dash.notificationmanagement.business.NotificationService;
import dash.notificationmanagement.business.ssl.test.SSLNotificationProvider;
import dash.notificationmanagement.business.ssl.test.SSLSmtpProvider;
import dash.notificationmanagement.business.starttls.test.STARTTLSNotificationProvider;
import dash.notificationmanagement.business.starttls.test.STARTTLSSmtpProvider;
import dash.notificationmanagement.business.tls.test.TLSNotificationProvider;
import dash.notificationmanagement.business.tls.test.TLSSmtpProvider;
import dash.notificationmanagement.domain.Notification;
import dash.test.BaseConfig;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class NotificationServiceTest extends BaseConfig {

	@MockBean
	private IFileUploadService fileUploadService;

	private NotificationService notificationService;

	public NotificationServiceTest() throws Exception {
		// this.notificationService = new
		// NotificationService(fileUploadService);
	}

	/*
	 * TEST - STARTTLS
	 */
	@Test
	@Ignore
	public void sendNotificationTestAlfahostingSTARTTLS() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(
				STARTTLSSmtpProvider.createAlfahostingSTARTTLSSmtp(),
				STARTTLSNotificationProvider.createNotificationSTARTTLS(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	@Test
	@Ignore
	public void sendNotificationTestLivePort587STARTTLS() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(
				STARTTLSSmtpProvider.createLiveSTARTTLSSmtpPort587(),
				STARTTLSNotificationProvider.createNotificationSTARTTLS(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	@Test
	@Ignore
	public void sendNotificationTestLivePort25STARTTLS() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(
				STARTTLSSmtpProvider.createLiveSTARTTLSSmtpPort25(),
				STARTTLSNotificationProvider.createNotificationSTARTTLS(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	@Test
	@Ignore
	public void sendNotificationTestWebSTARTTLS() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(STARTTLSSmtpProvider.createWebSTARTTLSSmtp(),
				STARTTLSNotificationProvider.createNotificationSTARTTLS(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	@Test
	@Ignore
	public void sendNotificationTestGmxSTARTTLS() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(STARTTLSSmtpProvider.createGmxSTARTTLSSmtp(),
				SSLNotificationProvider.createNotificationSSL(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	/*
	 * TEST - TLS
	 */
	@Test
	@Ignore
	public void sendNotificationTestGmailTLS() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(TLSSmtpProvider.createGmailTLSSmtp(),
				TLSNotificationProvider.createNotificationTLS(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	@Test
	@Ignore
	public void sendNotificationTestAlfahostingTLS() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(TLSSmtpProvider.createAlfahostingTLSSmtp(),
				TLSNotificationProvider.createNotificationTLS(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	@Test
	@Ignore
	public void sendNotificationWebTLS() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(TLSSmtpProvider.createWebTLSSmtp(),
				TLSNotificationProvider.createNotificationTLS(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	@Test
	@Ignore
	public void sendNotificationTestNetcupTLS() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(SSLSmtpProvider.createNetcupSmtpSSL(),
				SSLNotificationProvider.createNotificationSSL(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	/*
	 * TEST - SSL
	 */
	@Test
	@Ignore
	public void sendNotificationTestGmailSSL() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(SSLSmtpProvider.createGmailSSLSmtp(),
				SSLNotificationProvider.createNotificationSSL(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	@Test
	@Ignore
	public void sendNotificationTestNetcupSSL() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(SSLSmtpProvider.createNetcupSmtpSSL(),
				SSLNotificationProvider.createNotificationSSL(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	@Test
	@Ignore
	public void sendNotificationTestAlfahostingSSL() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(SSLSmtpProvider.createAlfahostingSmtpSSL(),
				SSLNotificationProvider.createNotificationSSL(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	@Test
	@Ignore
	public void sendNotificationTestGmxSSL() throws Exception {
		Notification message = notificationService.sendNotificationBySmtp(SSLSmtpProvider.createGmxSSLSmtp(),
				SSLNotificationProvider.createNotificationSSL(), SMTP_KEY);
		assertThat(message).isNotNull();
	}

	/*
	 * TEST - PLAIN
	 */

}
