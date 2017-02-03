package dash.messagemanagement.business;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import javax.activation.DataHandler;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import org.apache.log4j.Logger;

import dash.notificationmanagement.domain.Attachment;
import dash.notificationmanagement.domain.Notification;

public class MessageUtil {

	private static final Logger logger = Logger.getLogger(MessageUtil.class);

	private MessageUtil() {
	}

	public static Message createMessage(Notification notification, Session session, String email, String sender)
			throws MessagingException, UnsupportedEncodingException {

		Message message = new MimeMessage(session);
		message = setRecipients(notification.getRecipients(), notification.getRecipientsCC(),
				notification.getRecipientsBCC(), message, email, sender);
		message.setSentDate(new Date());
		message.setSubject(notification.getSubject());

		MimeBodyPart mimeBodyPart = createMimeBodyPart(notification.getContent());
		Multipart multipart = createMultipart(mimeBodyPart, notification.getAttachments());
		message.setContent(multipart);

		return message;
	}

	private static Message setRecipients(String recipientsTO, String recipientsCC, String recipientsBCC,
			Message message, String emailFrom, String senderName)
			throws UnsupportedEncodingException, MessagingException {
		try {
			if (recipientsTO != null)
				message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientsTO, true));
			if (recipientsCC != null)
				message.addRecipients(Message.RecipientType.BCC, InternetAddress.parse(recipientsCC, true));
			if (recipientsBCC != null)
				message.addRecipients(Message.RecipientType.CC, InternetAddress.parse(recipientsBCC, true));

			message.setFrom(new InternetAddress(emailFrom, senderName));
			message.setReplyTo(InternetAddress.parse(emailFrom, true));

		} catch (AddressException e) {
			logger.error(e.getMessage() + MessageUtil.class.getSimpleName(), e);
			throw new AddressException("Invalid Email Address.");
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage() + MessageUtil.class.getSimpleName(), e);
			throw new UnsupportedEncodingException("Your Personal name cannot be encoded in the given charset.");
		} catch (MessagingException e) {
			logger.error(e.getMessage() + MessageUtil.class.getSimpleName(), e);
			throw new MessagingException("There is an Error in your specified Email-Addresses or in your Send-Name");
		}

		return message;
	}

	private static MimeBodyPart createMimeBodyPart(String content) throws MessagingException {
		MimeBodyPart textBodyPart = new MimeBodyPart();
		if (content != null)
			try {
				textBodyPart.setContent(content, "text/html; charset=utf-8");
			} catch (MessagingException e) {
				logger.error("Couldn't create MimeBodyPart for Email javax.mail.internet.MimeBodyPart", e);
				throw new MessagingException("Couldn't create Email-Content.");
			}
		return textBodyPart;
	}

	private static Multipart createMultipart(MimeBodyPart textBodyPart, List<Attachment> attachments)
			throws MessagingException {

		Multipart multipart = new MimeMultipart();
		try {
			multipart.addBodyPart(textBodyPart);
		} catch (MessagingException e) {
			logger.error("Couldn't add Body Part to Email-Content", e);
			throw new MessagingException("Couldn't add Body Part to Email-Content.");
		}

		if (attachments != null && !attachments.isEmpty()) {
			for (Attachment attachment : attachments) {
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

		return multipart;
	}
}
