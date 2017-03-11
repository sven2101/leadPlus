package dash.notificationmanagement.business;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.log4j.Logger;
import org.apache.pdfbox.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClient;
import com.amazonaws.services.simpleemail.model.RawMessage;
import com.amazonaws.services.simpleemail.model.SendRawEmailRequest;

import dash.fileuploadmanagement.domain.FileUpload;
import dash.messagemanagement.business.MailBuilder;
import dash.notificationmanagement.domain.Attachment;

@Service
public class AWSEmailService {

	private static final Logger logger = Logger.getLogger(AWSEmailService.class);

	private AmazonSimpleEmailServiceClient amazonSimpleEmailServiceClient;

	@Autowired
	public AWSEmailService(AmazonSimpleEmailServiceClient amazonSimpleEmailServiceClient) {
		this.amazonSimpleEmailServiceClient = amazonSimpleEmailServiceClient;
	}

	public void send(final String fromEmail, final String toEmail, final String subject, final String emailBody)
			throws MessagingException {
		Session session = Session.getDefaultInstance(new Properties());
		MimeMessage message = new MimeMessage(session);
		message.setSubject(subject, "UTF-8");
		message.setFrom(new InternetAddress(fromEmail));
		message.setReplyTo(new Address[] { new InternetAddress(fromEmail) });
		message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
		message.setRecipients(Message.RecipientType.BCC, InternetAddress.parse(fromEmail));

		// Cover wrap
		MimeBodyPart wrap = new MimeBodyPart();

		// Alternative TEXT/HTML content
		MimeMultipart cover = new MimeMultipart("alternative");
		MimeBodyPart html = new MimeBodyPart();
		cover.addBodyPart(html);

		wrap.setContent(cover);

		MimeMultipart content = new MimeMultipart("related");
		message.setContent(content);
		content.addBodyPart(wrap);

		Map<String, String> attachmentsFiles = new HashMap<>();
		attachmentsFiles.put("employee", "src/main/resources/email/images/Andreas_Foitzik.png");
		attachmentsFiles.put("logo", "src/main/resources/email/images/logo.png");

		for (Map.Entry<String, String> entry : attachmentsFiles.entrySet()) {

			MimeBodyPart attachment = new MimeBodyPart();

			DataSource fds = new FileDataSource(entry.getValue());
			attachment.setDataHandler(new DataHandler(fds));
			attachment.setHeader("Content-ID", "<" + entry.getKey() + ">");
			attachment.setFileName(fds.getName());

			content.addBodyPart(attachment);
		}

		html.setContent(emailBody, "text/html; charset=utf-8");
		try {
			// Send the email.
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			message.writeTo(outputStream);
			RawMessage rawMessage = new RawMessage(ByteBuffer.wrap(outputStream.toByteArray()));

			SendRawEmailRequest rawEmailRequest = new SendRawEmailRequest(rawMessage);

			this.amazonSimpleEmailServiceClient.sendRawEmail(rawEmailRequest);
		} catch (Exception e) {
			logger.error("Error connecting to AWS SES.", e);
		}
	}

	public void sendMail(final String fromEmail, final String toEmail, final String subject, final String emailBody)
			throws MessagingException {

		Session session = Session.getDefaultInstance(new Properties());
		MimeMessage message = new MimeMessage(session);
		message.setSubject(subject, "UTF-8");
		message.setFrom(new InternetAddress(fromEmail));
		message.setReplyTo(new Address[] { new InternetAddress(fromEmail) });
		message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
		message.setRecipients(Message.RecipientType.BCC, InternetAddress.parse(fromEmail));

		Multipart email = MailBuilder.build("", emailBody, getInlineAttachments(), null);
		message.setContent(email, "text/html; charset=utf-8");

		try {
			// Send the email.
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			message.writeTo(outputStream);
			RawMessage rawMessage = new RawMessage(ByteBuffer.wrap(outputStream.toByteArray()));

			SendRawEmailRequest rawEmailRequest = new SendRawEmailRequest(rawMessage);

			this.amazonSimpleEmailServiceClient.sendRawEmail(rawEmailRequest);
		} catch (Exception e) {
			logger.error("Error connecting to AWS SES.", e);
		}
	}

	private Set<Attachment> getInlineAttachments() {
		Set<Attachment> attachments = new HashSet<>();

		Map<String, String> attachmentsFiles = new HashMap<>();
		attachmentsFiles.put("employee", "/email/images/Andreas_Foitzik.png");
		attachmentsFiles.put("logo", "/email/images/logo.png");

		try {
			for (Map.Entry<String, String> entry : attachmentsFiles.entrySet()) {
				final InputStream inputStream = this.getClass().getResourceAsStream(entry.getValue());
				Attachment attachment = new Attachment();
				FileUpload file = new FileUpload();
				file.setFilename(entry.getKey());
				file.setMimeType("image/png");

				file.setContent(IOUtils.toByteArray(inputStream));

				attachment.setFileUpload(file);
				attachments.add(attachment);
			}

		} catch (IOException e) {
			logger.error("Cannot find images. ", e);
		}
		return attachments;
	}
}
