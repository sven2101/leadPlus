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

import javax.mail.Session;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.fileuploadmanagement.business.IFileUploadService;
import dash.notificationmanagement.domain.Attachment;
import dash.notificationmanagement.domain.Notification;
import dash.smtpmanagement.business.SmtpUtil;
import dash.smtpmanagement.domain.Smtp;
import dash.smtpmanagement.domain.SmtpEncryptionType;

@Service
public class NotificationService implements INotificationService {

	private static final Logger logger = Logger.getLogger(NotificationService.class);

	private IFileUploadService fileUploadService;

	public NotificationService(IFileUploadService fileUploadService) {
		this.fileUploadService = fileUploadService;
	}

	@Override
	public Notification sendNotification(final Smtp smtp, final Notification notification, final String smtpKey)
			throws Exception {

		// SMTP-Access
		String username = smtp.getUsername();
		String emailFrom = smtp.getEmail();
		String senderName = smtp.getSender();
		SmtpEncryptionType smtpEncryptionType = smtp.getEncryption();
		String password;

		// SMTP-Server
		String host = smtp.getHost();
		int port = smtp.getPort();

		// SMTP-Session
		Session session;

		this.setReferenceForAlreadyUploadFiles(notification);

		password = SmtpUtil.decryptPasswordForSmtp(smtp, smtpKey);
		session = SmtpUtil.createSessionWithAuthentication(host, port, smtpEncryptionType, username, password);

		if (smtpEncryptionType == SmtpEncryptionType.PLAIN)
			NotificationUtil.plainTransport(session, notification, emailFrom, senderName, host, port, username,
					password);
		else if (smtpEncryptionType == SmtpEncryptionType.TLS || smtpEncryptionType == SmtpEncryptionType.SSL
				|| smtpEncryptionType == SmtpEncryptionType.STARTTLS)
			NotificationUtil.secureTransport(session, notification, emailFrom, senderName, host, port, username,
					password);

		return notification;

	}

	private void setReferenceForAlreadyUploadFiles(Notification notification) throws NotFoundException {
		try {
			if (notification != null && notification.getAttachments() != null) {
				for (Attachment attachment : notification.getAttachments()) {
					if (attachment != null && attachment.getFileUpload() != null
							&& attachment.getFileUpload().getId() != null) {

						attachment.setFileUpload(fileUploadService.getById(attachment.getFileUpload().getId()));
					}
				}
			}
		} catch (NotFoundException e) {
			logger.error("Couldn't find referenced Attachment.", e);
			throw new NotFoundException("Couldn't find referenced Attachment.");
		}
	}

}
