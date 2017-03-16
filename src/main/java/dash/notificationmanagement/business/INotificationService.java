/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

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
