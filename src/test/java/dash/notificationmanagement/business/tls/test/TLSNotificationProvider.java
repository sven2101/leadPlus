package dash.notificationmanagement.business.tls.test;

import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;
import dash.test.Provider;

public class TLSNotificationProvider extends Provider {

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
