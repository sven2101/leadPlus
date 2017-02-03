package dash.notificationmanagement.business;

import java.io.UnsupportedEncodingException;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.Session;

import org.apache.log4j.Logger;

import com.sun.mail.smtp.SMTPTransport;

import dash.messagemanagement.business.MessageUtil;
import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;

public class NotificationUtil {

	private static final Logger logger = Logger.getLogger(NotificationUtil.class);

	private NotificationUtil() {
	}

	public static void plainTransport(Session session, Notification notification, String emailFrom, String senderName,
			String host, int port, String username, String password)
			throws UnsupportedEncodingException, MessagingException {
		SMTPTransport smtpTransport = null;
		try {
			smtpTransport = (SMTPTransport) session.getTransport();
			smtpTransport.connect(host, port, username, password);
		} catch (MessagingException e) {
			logger.error(e.getMessage() + NotificationUtil.class.getSimpleName(), e);
			throw new MessagingException("Couldn't connect to SMTP-Server.");
		}

		sendEmail(smtpTransport, notification, session, emailFrom, senderName);
	}

	public static void secureTransport(Session session, Notification notification, String emailFrom, String senderName,
			String host, int port, String username, String password)
			throws UnsupportedEncodingException, MessagingException {
		SMTPTransport smtpTransport = null;

		try {
			smtpTransport = (SMTPTransport) session.getTransport();
			smtpTransport.connect(host, port, username, password);
		} catch (MessagingException e) {
			logger.error(e.getMessage() + NotificationUtil.class.getSimpleName(), e);
			throw new MessagingException(
					"Couldn't connect to SMTP-Server. Propably Username and Password are not accepted.");
		}

		sendEmail(smtpTransport, notification, session, emailFrom, senderName);
	}

	private static void sendEmail(SMTPTransport transport, Notification notification, Session session, String emailFrom,
			String senderName) throws UnsupportedEncodingException, MessagingException {
		Message message = MessageUtil.createMessage(notification, session, emailFrom, senderName);
		String maximumMessageSize = transport.getExtensionParameter("SIZE");
		if (maximumMessageSize != null && Integer.valueOf(maximumMessageSize) < message.getSize())
			throw new MessagingException("Message Size too large.");

		try {
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
		} catch (SendFailedException e) {
			logger.error(e.getMessage() + NotificationUtil.class.getSimpleName(), e);
			String lastServerResponse = transport.getLastServerResponse();
			int lastReturnCode = transport.getLastReturnCode();
			if (e.getInvalidAddresses() != null && e.getInvalidAddresses().length >= 0)
				throw new SendFailedException("Couldn't send Email to invalid address "
						+ convertInternetAddressToString(e.getInvalidAddresses()) + ". Try to send again.");

			throw new SendFailedException("Couldn't send Email. " + lastReturnCode + " - " + lastServerResponse);
		} catch (MessagingException e) {
			logger.error(e.getMessage() + NotificationUtil.class.getSimpleName(), e);
			throw new MessagingException("Something went wrong during sending a secure encrypted email.");
		}
	}

	private static String convertInternetAddressToString(Address[] addresses) {
		StringBuilder emails = new StringBuilder();
		for (Address address : addresses) {
			emails.append(address.toString() + " ");
		}
		return emails.toString();
	}

	public static Notification createTestNotification(final String recipient, final String senderName) {
		Notification notification = new Notification();
		notification.setRecipients(recipient);
		notification.setSubject("Lead+ Test Notification");
		notification.setContent("<html style='font-family:Arial;'><h3>Dear " + senderName + ", </h3>"
				+ "<br/>this is an auto generated Email to verify your SMTP-Connection for lead+. <br/> <br/> Best regards, <br/><br/> Your lead+ Team</html>");
		notification.setDeleted(false);
		notification.setNotificationType(NotificationType.INFO);

		return notification;
	}
}
