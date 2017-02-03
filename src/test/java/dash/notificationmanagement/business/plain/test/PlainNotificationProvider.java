package dash.notificationmanagement.business.plain.test;

import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;
import dash.test.BaseConfig;

public class PlainNotificationProvider extends BaseConfig {

	public static Notification createNotificationPLAIN() {
		Notification notification = new Notification();
		notification.setRecipients("andreas.foitzik@gmail.com");

		notification.setSubject(EMAIL_SUBJECT + " PLAIN");
		notification.setContent(EMAIL_TEXT);
		notification.setDeleted(false);
		notification.setNotificationType(NotificationType.INFO);

		return notification;
	}
}
