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

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.attachmentmanagement.business.IAttachmentService;
import dash.attachmentmanagement.domain.Attachment;
import dash.common.EncryptionWrapper;
import dash.common.Encryptor;
import dash.exceptions.NotFoundException;
import dash.exceptions.SMTPdoesntExistsException;
import dash.exceptions.SaveFailedException;
import dash.notificationmanagement.domain.Notification;
import dash.smtpmanagement.business.ISmtpService;
import dash.smtpmanagement.domain.Smtp;

@Service
public class NotificationService implements INotificationService {

	private static final Logger logger = Logger.getLogger(NotificationService.class);

	@Autowired
	private ISmtpService smtpService;

	@Autowired
	private IAttachmentService attachmentService;

	@Override
	public void sendNotification(final long userId, final Notification notification, String smtpKey)
			throws SMTPdoesntExistsException, MessagingException, SaveFailedException, NotFoundException, Exception {
		try {
			Smtp smtp = smtpService.findByUser(userId);
			if (notification != null && notification.getAttachments() != null && notification.getAttachments().size() > 0) {
				for (Attachment attachment : notification.getAttachments()) {
					if (attachment != null) {
						Attachment existingAttachment = attachmentService.getById(attachment.getId());
						notification.addAttachment(existingAttachment);
					}
				}
			}

			if (smtp != null) {
				smtp.setPassword(Encryptor.decrypt(new EncryptionWrapper(smtp.getPassword(), smtp.getSalt(), smtp.getIv()), smtpKey));
				final Session emailSession = newSession(smtp);
				Transport transport = emailSession.getTransport("smtp");
				transport.connect();

				Message msg = new MimeMessage(emailSession);
				try {

					msg.setFrom(new InternetAddress(smtp.getEmail(), smtp.getSender()));
					msg.setRecipient(Message.RecipientType.TO, new InternetAddress(notification.getRecipient()));
					msg.setSubject(notification.getSubject());
					Multipart multipart = new MimeMultipart();

					MimeBodyPart textBodyPart = new MimeBodyPart();
					textBodyPart.setContent(notification.getContent(), "text/html; charset=utf-8");
					multipart.addBodyPart(textBodyPart);

					if (notification.getAttachments() != null && notification.getAttachments().size() > 0) {
						for (Attachment attachment : notification.getAttachments()) {
							if (attachment.getFileUpload().getContent() != null) {
								MimeBodyPart attachmentBodyPart = new MimeBodyPart();
								ByteArrayDataSource ds = new ByteArrayDataSource(attachment.getFileUpload().getContent(),
										attachment.getFileUpload().getMimeType());
								attachmentBodyPart.setDataHandler(new DataHandler(ds));
								attachmentBodyPart.setFileName(attachment.getFileUpload().getFilename());
								multipart.addBodyPart(attachmentBodyPart);
							}
						}
					}
					msg.setContent(multipart);

					Transport.send(msg);

				} catch (MessagingException mex) {
					logger.error(NotificationService.class.getSimpleName(), mex);
					throw mex;
				}

			} else {
				throw new SMTPdoesntExistsException("No valid SMTP Data for this User");
			}
		} catch (Exception ex) {
			throw ex;
			// return;
		}
	}

	private Session newSession(Smtp smtp) throws UnsupportedEncodingException {
		Properties props = new Properties();
		props.setProperty("mail.smtp.host", smtp.getHost());
		props.setProperty("mail.smtp.port", String.valueOf(smtp.getPort()));
		props.put("mail.smtp.ssl.trust", smtp.getHost());
		props.put("mail.smtp.auth", "true");
		final String mailUser = smtp.getUsername();
		final String mailPassword = new String(smtp.getPassword(), "UTF-8");

		return Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(mailUser, mailPassword);
			}
		});
	}

}
