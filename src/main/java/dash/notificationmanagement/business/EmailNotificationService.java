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

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sun.mail.smtp.SMTPMessage;

@Service
public class EmailNotificationService implements INotificationService {

	@Value("${mail.from}")
	private String mailFrom;

	@Value("${mail.smtp.host}")
	private String smtpHost;

	@Value("${mail.smtp.port}")
	private String smtpPort;

	@Value("${mail.smtp.auth}")
	private String needsAuth = "false";

	@Value("${mail.login.username}")
	private String mailUser;

	@Value("${mail.login.password}")
	private String mailPassword;

	@Override
	public void sendNotification(IMessage message) {
		doSendEmail(message);
	}

	public void doSendEmail(IMessage message) {

		try {
			final Session emailSession = newSession();
			Transport transport = emailSession.getTransport("smtp");
			transport.connect();
			SMTPMessage smtpMessage = new SMTPMessage(emailSession);
			smtpMessage.setFrom(new InternetAddress(this.mailFrom));
			smtpMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(message.getRecipient().getEmail()));
			smtpMessage.setHeader("Content-Type", "text/html");
			smtpMessage.setSubject(message.getSubject());
			smtpMessage.setContent(message.getContent(), "text/html");
			smtpMessage.setNotifyOptions(SMTPMessage.NOTIFY_SUCCESS);
			smtpMessage.setReturnOption(1);
			transport.sendMessage(smtpMessage, InternetAddress.parse(message.getRecipient().getEmail()));
			transport.close();
		} catch (MessagingException me) {

		}

	}

	private Session newSession() {
		Properties props = new Properties();
		props.setProperty("mail.smtp.host", this.smtpHost);
		props.setProperty("mail.smtp.port", this.smtpPort);
		final String mailUser = this.mailUser;
		final String mailPassword = this.mailPassword;

		return Session.getDefaultInstance(props, Boolean.valueOf(this.needsAuth) == false ? null : new javax.mail.Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(mailUser, mailPassword);
			}
		});
	}

}
