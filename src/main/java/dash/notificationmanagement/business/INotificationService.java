
package dash.notificationmanagement.business;

import java.util.List;

import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationContext;
import dash.smtpmanagement.domain.Smtp;

public interface INotificationService {

	List<Notification> getNotificationsBySenderId(final Long userId);

	Notification sendNotification(Long processId, Long userId, NotificationContext notificationContext)
			throws NotFoundException, SaveFailedException, EmailSendFailedException;

	Notification sendNotificationBySmtp(Smtp smtp, Notification notification, String smtpKey) throws Exception;

}
