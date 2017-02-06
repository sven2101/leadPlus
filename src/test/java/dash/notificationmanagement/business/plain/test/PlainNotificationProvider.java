package dash.notificationmanagement.business.plain.test;

import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;
import dash.test.Provider;

public class PlainNotificationProvider extends Provider {

	public static Notification createNotificationPLAIN() {
		Notification notification = new Notification();
		notification.setRecipients(EMAIL_RECIPIENTS);

		notification.setSubject(EMAIL_SUBJECT + " PLAIN");
		notification.setContent(EMAIL_TEXT);
		notification.setDeleted(false);
		notification.setNotificationType(NotificationType.INFO);

		return notification;
	}
}
