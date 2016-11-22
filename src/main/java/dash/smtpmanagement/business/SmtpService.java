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

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sun.mail.smtp.SMTPMessage;

import dash.common.EncryptionWrapper;
import dash.common.Encryptor;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.smtpmanagement.domain.Encryption;
import dash.smtpmanagement.domain.Smtp;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;

@Service
public class SmtpService implements ISmtpService {

	private static final Logger logger = Logger.getLogger(SmtpService.class);

	@Autowired
	private SmtpRepository smptRepository;

	@Autowired
	private UserService userService;

	@Override
	public void testSmtp(final long id, String smtpKey) throws Exception {
		Smtp smtp = smptRepository.findOne(id);
		smtp.setPassword(Encryptor.decrypt(new EncryptionWrapper(smtp.getPassword(), smtp.getSalt(), smtp.getIv()), smtpKey));

		Session emailSession;
		Transport transport = null;

		try {
			emailSession = newSession(smtp);
			transport = emailSession.getTransport("smtp");
			transport.connect();
			SMTPMessage smtpMessage = new SMTPMessage(emailSession);
			smtpMessage.setFrom(new InternetAddress(smtp.getEmail(), "lead+ Test-Mail"));
			smtpMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(smtp.getEmail()));
			smtpMessage.setHeader("Content-Type", "text/html");
			smtpMessage.setSubject("Test");
			smtpMessage.setContent(
					"<html style='font-family:Arial;'><h3>Dear " + smtp.getSender() + ", </h3>"
							+ "<br/>this is an auto generated Email to verify your SMTP-Connection for lead+. <br/> <br/> Best regards, <br/><br/> Your lead+ Team</html>",
					"text/html");
			smtpMessage.setNotifyOptions(SMTPMessage.NOTIFY_SUCCESS);
			smtpMessage.setReturnOption(1);

			transport.sendMessage(smtpMessage, InternetAddress.parse(smtp.getEmail()));
		} catch (Exception ex) {
			throw ex;
		} finally {
			if (transport != null)
				transport.close();

			emailSession = null;
		}
	}

	public Session newSession(Smtp smtp) throws UnsupportedEncodingException {
		Properties props = new Properties();
		String mailUser = smtp.getUsername();
		String mailPassword = new String(smtp.getPassword(), "UTF-8");

		if (smtp.getEncryption() == Encryption.TLS) {
			props.setProperty("mail.smtp.host", smtp.getHost());
			props.setProperty("mail.smtp.port", String.valueOf(smtp.getPort()));
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.ssl.trust", smtp.getHost());
			if (smtp.getPort() == 587)
				props.put("mail.smtp.starttls.enable", "true");
		} else if (smtp.getEncryption() == Encryption.SSL) {
			props.put("mail.smtp.host", smtp.getHost());
			props.put("mail.smtp.socketFactory.port", String.valueOf(smtp.getPort()));
			props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.port", String.valueOf(smtp.getPort()));
		}

		return Session.getInstance(props, new javax.mail.Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(mailUser, mailPassword);
			}
		});
	}

	@Override
	public Smtp save(final Smtp smtp, String smtpKey) throws Exception {
		if (smtp != null) {
			if (smtp.getPassword() == null || new String(smtp.getPassword(), "UTF-8") == "") {
				Smtp tempSmpt = smptRepository.findOne(smtp.getId());
				smtp.setPassword(tempSmpt.getPassword());
				smtp.setSalt(tempSmpt.getSalt());
				smtp.setIv(tempSmpt.getIv());
			} else {
				EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), smtpKey);
				smtp.setPassword(encryptionWrapper.getCiphertext());
				smtp.setSalt(encryptionWrapper.getSalt());
				smtp.setIv(encryptionWrapper.getIv());
			}
			return smptRepository.save(smtp);
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(SAVE_FAILED_EXCEPTION + SmtpService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

	@Override
	public Smtp findByUser(long id) throws NotFoundException {
		User user = userService.getById(id);
		Smtp smtp = smptRepository.findByUser(user);
		if (smtp == null) {
			throw new NotFoundException(BECAUSE_OF_OBJECT_IS_NULL);
		}
		return smtp;
	}

}
