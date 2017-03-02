package dash.messagemanagement.business;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;

import dash.fileuploadmanagement.domain.FileUpload;
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

		String oldContent = notification.getContent();
		StringBuilder newContentBuilder = new StringBuilder();
		Map<String, String[]> imageMap = new HashMap<>();
		boolean inImage = false;
		StringBuilder currentBase64ImageStringBuilder = new StringBuilder();
		StringBuilder currentBase64HeaderStringBuilder = new StringBuilder();
		for (int i = 0; i < oldContent.length(); i++) {
			char c = oldContent.charAt(i);
			if (inImage) {
				if (c != '"') {
					currentBase64ImageStringBuilder.append(c);
				} else {
					UUID key = UUID.randomUUID();
					String[] fileArray = new String[2];
					fileArray[0] = currentBase64HeaderStringBuilder.toString();
					fileArray[1] = currentBase64ImageStringBuilder.toString();
					imageMap.put(key.toString(), fileArray);
					currentBase64HeaderStringBuilder = new StringBuilder();
					currentBase64ImageStringBuilder = new StringBuilder();
					newContentBuilder.append("src=\"cid:" + key + "\"");
					inImage = false;
				}
				continue;
			}
			if (i + 2 < oldContent.length() && c == 's' && oldContent.charAt(i + 1) == 'r'
					&& oldContent.charAt(i + 2) == 'c') {
				for (; i < oldContent.length() && oldContent.charAt(i) != ','; i++) {
					c = oldContent.charAt(i);
					currentBase64HeaderStringBuilder.append(c);
				}
				inImage = true;
				continue;
			}
			if (!inImage) {
				newContentBuilder.append(c);
			}
		}

		Multipart multipart = MailBuilder.build("", newContentBuilder.toString(), getInlineAttachments(imageMap),
				notification.getAttachments());
		message.setContent(multipart, "text/html; charset=utf-8");
		return message;
	}

	private static Set<Attachment> getInlineAttachments(Map<String, String[]> imageMap) {
		Set<Attachment> attachments = new HashSet<>();
		for (String key : imageMap.keySet()) {
			String[] value = imageMap.get(key);
			Attachment attachment = new Attachment();
			FileUpload file = new FileUpload();
			file.setFilename(key);
			file.setMimeType("image/jpeg");
			file.setContent(org.apache.commons.codec.binary.Base64.decodeBase64(value[1].getBytes()));
			attachment.setFileUpload(file);
			attachments.add(attachment);
		}
		return attachments;
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

}
