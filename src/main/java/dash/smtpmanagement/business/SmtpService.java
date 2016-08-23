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

package dash.smtpmanagement.business;

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.SAVE_FAILED_EXCEPTION;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sun.mail.smtp.SMTPMessage;

import dash.exceptions.SaveFailedException;
import dash.smtpmanagement.domain.Smtp;

@Service
public class SmtpService implements ISmtpService {

	private static final Logger logger = Logger.getLogger(SmtpService.class);

	@Autowired
	private SmtpRepository smtpRepository;

	@Override
	public boolean testConnection(final Smtp smtp) {

		try {
			final Session emailSession = newSession(smtp);
			Transport transport = emailSession.getTransport("smtp");
			transport.connect();
			SMTPMessage smtpMessage = new SMTPMessage(emailSession);
			smtpMessage.setFrom(new InternetAddress(smtp.getEmail()));
			smtpMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse("andreas.foitzik@live.com"));
			smtpMessage.setHeader("Content-Type", "text/html");
			smtpMessage.setSubject("Test");
			smtpMessage.setContent("test test test", "text/html");
			smtpMessage.setNotifyOptions(SMTPMessage.NOTIFY_SUCCESS);
			smtpMessage.setReturnOption(1);
			transport.sendMessage(smtpMessage, InternetAddress.parse("andreas.foitzik@live.com"));
			transport.close();
		} catch (MessagingException me) {
			logger.error("Problem sending email", me);
			return false;
		}

		return true;
	}

	private Session newSession(Smtp smtp) {
		Properties props = new Properties();
		props.setProperty("mail.smtp.host", smtp.getHost());
		props.setProperty("mail.smtp.port", String.valueOf(smtp.getPort()));
		props.put("mail.smtp.ssl.trust", smtp.getHost());
		props.put("mail.smtp.auth", "true");
		final String mailUser = smtp.getUsername();
		final String mailPassword = smtp.getPassword();

		return Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(mailUser, mailPassword);
			}
		});
	}

	@Override
	public Smtp save(final Smtp smtp) throws SaveFailedException {
		if (smtp != null) {
			return smtpRepository.save(smtp);
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(SAVE_FAILED_EXCEPTION + SmtpService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

}
