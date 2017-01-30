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
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.NoSuchProviderException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.sun.mail.smtp.SMTPTransport;

import dash.common.EncryptionWrapper;
import dash.common.Encryptor;
import dash.exceptions.NotFoundException;
import dash.fileuploadmanagement.business.IFileUploadService;
import dash.notificationmanagement.domain.Attachment;
import dash.notificationmanagement.domain.Notification;
import dash.smtpmanagement.domain.Smtp;

@Service
public class NotificationService implements INotificationService {

	private static final Logger logger = Logger.getLogger(NotificationService.class);

	private IFileUploadService fileUploadService;

	public NotificationService(IFileUploadService fileUploadService) {
		this.fileUploadService = fileUploadService;
	}

	@Override
	public void sendNotification(Smtp smtp, Notification notification, String smtpKey) throws Exception {

		this.setReferenceForAlreadyUploadFiles(notification);

		Session session = this.createSession(smtp);

		if (session != null) {
			SMTPTransport t = getTransport(smtp, session);

			if (t != null) {
				t.connect(smtp.getHost(), smtp.getPort(), smtp.getUsername(),
						new String(this.decryptPasswordForSmtp(smtp, smtpKey), "UTF-8"));
				Message message = this.createMessage(notification, session, smtp.getEmail(), smtp.getSender());
				message.saveChanges();
				t.sendMessage(message, message.getAllRecipients());
				if (t.getLastServerResponse() != "250 OK\n")
					logger.error(NotificationService.class.getSimpleName() + "Couldn't send ... " + message);

				t.close();
			}
		}
	}

	private byte[] decryptPasswordForSmtp(Smtp smtp, String smtpKey) throws Exception {
		Smtp decrypted = smtp;
		decrypted.setPassword(
				Encryptor.decrypt(new EncryptionWrapper(smtp.getPassword(), smtp.getSalt(), smtp.getIv()), smtpKey));
		return decrypted.getPassword();
	}

	/**
	 * @param notification
	 * @throws NotFoundException
	 */
	private void setReferenceForAlreadyUploadFiles(Notification notification) throws NotFoundException {
		if (notification != null && notification.getAttachments() != null) {
			for (Attachment attachment : notification.getAttachments()) {
				if (attachment != null && attachment.getFileUpload() != null
						&& attachment.getFileUpload().getId() != null) {
					attachment.setFileUpload(fileUploadService.getById(attachment.getFileUpload().getId()));
				}
			}
		}
	}

	/**
	 * @param notification
	 * @param session
	 * @param email
	 * @param sender
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws MessagingException
	 */
	private Message createMessage(Notification notification, Session session, String email, String sender)
			throws UnsupportedEncodingException, MessagingException {

		Message msg = this.setRecipients(notification, session, email, sender);

		msg.setSubject(notification.getSubject());

		MimeBodyPart textBodyPart = new MimeBodyPart();
		textBodyPart.setContent(notification.getContent(), "text/html; charset=utf-8");

		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(textBodyPart);

		if (notification.getAttachments() != null && notification.getAttachments().isEmpty()) {
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

		return msg;

	}

	private Message setRecipients(Notification notification, Session session, String email, String sender)
			throws MessagingException, UnsupportedEncodingException {
		InternetAddress[] toList = null;
		InternetAddress[] bccList = null;
		InternetAddress[] ccList = null;

		Message msg = new MimeMessage(session);

		if (notification.getRecipients() != null)
			toList = InternetAddress.parse(notification.getRecipients());
		if (notification.getRecipientsBCC() != null)
			bccList = InternetAddress.parse(notification.getRecipientsBCC());
		if (notification.getRecipientsCC() != null)
			ccList = InternetAddress.parse(notification.getRecipientsCC());

		msg.setFrom(new InternetAddress(email, sender));
		msg.setSentDate(new Date());

		if (toList != null)
			msg.setRecipients(Message.RecipientType.TO, toList);
		if (bccList != null)
			msg.addRecipients(Message.RecipientType.BCC, bccList);
		if (ccList != null)
			msg.addRecipients(Message.RecipientType.CC, ccList);

		return msg;
	}

	/**
	 * @param smtp
	 * @param session
	 * @return
	 * @throws NoSuchProviderException
	 */
	private SMTPTransport getTransport(Smtp smtp, Session session) throws NoSuchProviderException {
		switch (smtp.getEncryption()) {
		case TLS:
			return (SMTPTransport) session.getTransport("smtps");
		case SSL:
			return (SMTPTransport) session.getTransport("smtps");
		case STARTTLS:
			return (SMTPTransport) session.getTransport("smtps");
		default:
			return (SMTPTransport) session.getTransport("smtp");
		}
	}

	/**
	 * @param smtp
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	private Session createSession(Smtp smtp) throws UnsupportedEncodingException {
		Properties props = new Properties();

		switch (smtp.getEncryption()) {
		case TLS:
			props.put("mail.smtps.host", smtp.getHost());
			props.put("mail.smtps.auth", "true");
			props.put("mail.smtps.port", String.valueOf(smtp.getPort()));
			props.put("mail.smtps.starttls.enable", "true");
			props.put("mail.smtps.connectiontimeout", "10000");
			props.put("mail.smtps.timeout", "10000");
			props.put("mail.smtps.sendpartial", "true");
			break;
		case SSL:
			props.put("mail.smtps.socketFactory.port", String.valueOf(smtp.getPort()));
			props.put("mail.smtps.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
			props.put("mail.smtps.port", String.valueOf(smtp.getPort()));
			break;
		case STARTTLS:
			props.put("mail.smtps.starttls.enable", "true");
			break;
		default:
			props.put("mail.smtp.host", smtp.getHost());
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.port", String.valueOf(smtp.getPort()));
			break;
		}

		return Session.getInstance(props, null);
	}

}
