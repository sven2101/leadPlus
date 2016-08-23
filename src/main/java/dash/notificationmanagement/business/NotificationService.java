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

import org.springframework.stereotype.Service;

import com.sun.mail.smtp.SMTPMessage;

import dash.notificationmanagement.domain.IMessage;
import dash.usermanagement.domain.User;

@Service
public class NotificationService implements INotificationService {

	@Override
	public void sendNotification(IMessage message, User user) {
		doSendEmail(message, user);
	}

	public void doSendEmail(IMessage message, User user) {

		try {
			System.out.println("SMTP - Sending");
			final Session emailSession = newSession(user);
			Transport transport = emailSession.getTransport("smtp");
			transport.connect();
			SMTPMessage smtpMessage = new SMTPMessage(emailSession);
			smtpMessage.setFrom(new InternetAddress(user.getSmtp().getEmail()));
			smtpMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(message.getRecipient().getEmail()));
			smtpMessage.setHeader("Content-Type", "text/html");
			smtpMessage.setSubject(message.getSubject());
			smtpMessage.setContent(message.getContent(), "text/html");
			smtpMessage.setNotifyOptions(SMTPMessage.NOTIFY_SUCCESS);
			smtpMessage.setReturnOption(1);
			transport.sendMessage(smtpMessage, InternetAddress.parse(message.getRecipient().getEmail()));
			transport.close();
			System.out.println("SMTP - DONE");
		} catch (MessagingException me) {

		}

	}

	private Session newSession(User user) {
		Properties props = new Properties();
		props.setProperty("mail.smtp.host", user.getSmtp().getHost());
		props.setProperty("mail.smtp.port", String.valueOf(user.getSmtp().getPort()));
		final String mailUser = user.getSmtp().getUsername();
		final String mailPassword = user.getSmtp().getPassword();

		return Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(mailUser, mailPassword);
			}
		});
	}

}
