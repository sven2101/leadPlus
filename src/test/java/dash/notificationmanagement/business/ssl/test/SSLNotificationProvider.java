package dash.notificationmanagement.business.ssl.test;

import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;
import dash.test.Provider;

public class SSLNotificationProvider extends Provider {

	public static Notification createNotificationSSL() {
		Notification notification = new Notification();
		notification.setRecipients(EMAIL_RECIPIENTS);

		notification.setSubject(EMAIL_SUBJECT + " SSL");
		notification.setContent(EMAIL_TEXT);
		notification.setDeleted(false);
		notification.setNotificationType(NotificationType.INFO);

		return notification;
	}
}
