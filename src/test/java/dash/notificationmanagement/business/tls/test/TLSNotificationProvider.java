package dash.notificationmanagement.business.tls.test;

import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;
import dash.test.BaseConfig;

public class TLSNotificationProvider extends BaseConfig {

	public static Notification createNotificationTLS() {
		Notification notification = new Notification();
		notification.setRecipients(EMAIL_RECIPIENTS);

		notification.setSubject(EMAIL_SUBJECT + " TLS");
		notification.setContent(EMAIL_TEXT);
		notification.setDeleted(false);
		notification.setNotificationType(NotificationType.INFO);

		return notification;
	}
}
