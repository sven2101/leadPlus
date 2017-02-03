package dash.notificationmanagement.business.starttls.test;

import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;
import dash.test.BaseConfig;

public class STARTTLSNotificationProvider extends BaseConfig {

	public static Notification createNotificationSTARTTLS() {
		Notification notification = new Notification();
		notification.setRecipients(EMAIL_RECIPIENTS);

		notification.setSubject(EMAIL_SUBJECT + " STARTTLS");
		notification.setContent(EMAIL_TEXT);
		notification.setDeleted(false);
		notification.setNotificationType(NotificationType.INFO);

		return notification;
	}
}
