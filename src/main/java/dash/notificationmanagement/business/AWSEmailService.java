package dash.notificationmanagement.business;

import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.util.Properties;
import java.util.UUID;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClient;
import com.amazonaws.services.simpleemail.model.RawMessage;
import com.amazonaws.services.simpleemail.model.SendRawEmailRequest;

@Service
public class AWSEmailService {

	private static final Logger logger = Logger.getLogger(AWSEmailService.class);

	private AmazonSimpleEmailServiceClient amazonSimpleEmailServiceClient;

	@Autowired
	public AWSEmailService(AmazonSimpleEmailServiceClient amazonSimpleEmailServiceClient) {
		this.amazonSimpleEmailServiceClient = amazonSimpleEmailServiceClient;
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

		String[] attachmentsFiles = new String[] { "/email/images/Andreas_Foitzik.png", "/email/images/logo.png" };
		StringBuilder sb = new StringBuilder();

		for (String attachmentFileName : attachmentsFiles) {
			String id = UUID.randomUUID().toString();
			sb.append("<img src=\"cid:");
			sb.append(id);
			sb.append("\" alt=\"ATTACHMENT\"/>\n");

			MimeBodyPart attachment = new MimeBodyPart();

			DataSource fds = new FileDataSource(attachmentFileName);
			attachment.setDataHandler(new DataHandler(fds));
			attachment.setHeader("Content-ID", "<" + id + ">");
			attachment.setFileName(fds.getName());

			content.addBodyPart(attachment);
		}

		html.setContent(emailBody, "text/html");
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
}
