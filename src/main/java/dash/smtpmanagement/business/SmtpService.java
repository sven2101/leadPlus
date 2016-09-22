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
import java.security.AlgorithmParameters;
import java.security.spec.KeySpec;
import java.util.Properties;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.keygen.BytesKeyGenerator;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.stereotype.Service;

import com.sun.mail.smtp.SMTPMessage;

import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
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
	public void testSmtp(final long id) throws NotFoundException, MessagingException, UnsupportedEncodingException {
		Smtp smtp = smptRepository.findOne(id);
		smtp = decrypt(smtp);
		if (smtp == null) {
			throw new NotFoundException(BECAUSE_OF_OBJECT_IS_NULL);
		}

		final Session emailSession = newSession(smtp);
		Transport transport = emailSession.getTransport("smtp");
		transport.connect();
		SMTPMessage smtpMessage = new SMTPMessage(emailSession);
		smtpMessage.setFrom(new InternetAddress(smtp.getEmail(), "lead+ Test-Mail"));
		smtpMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(smtp.getEmail()));
		smtpMessage.setHeader("Content-Type", "text/html");
		smtpMessage.setSubject("Test");
		smtpMessage.setContent(
				"<html><h3>Dear " + smtp.getSender() + ", </h3>"
						+ "<br/>this is an auto generated Email to verify your SMTP-Connection for lead+. <br/> <br/> Best regards, <br/><br/> Your lead+ Team</html>",
				"text/html");
		smtpMessage.setNotifyOptions(SMTPMessage.NOTIFY_SUCCESS);
		smtpMessage.setReturnOption(1);
		transport.sendMessage(smtpMessage, InternetAddress.parse(smtp.getEmail()));
		transport.close();
	}

	private Session newSession(Smtp smtp) throws UnsupportedEncodingException {
		Properties props = new Properties();
		props.setProperty("mail.smtp.host", smtp.getHost());
		props.setProperty("mail.smtp.port", String.valueOf(smtp.getPort()));
		props.put("mail.smtp.ssl.trust", smtp.getHost());
		props.put("mail.smtp.auth", "true");
		final String mailUser = smtp.getUsername();
		final String mailPassword = new String(smtp.getPassword(), "UTF-8");

		return Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(mailUser, mailPassword);
			}
		});
	}

	@Override
	public Smtp save(final Smtp smtp) throws SaveFailedException, UnsupportedEncodingException {
		if (smtp != null) {
			if (smtp.getPassword() == null || new String(smtp.getPassword(), "UTF-8") == "") {
				Smtp tempSmpt = smptRepository.findOne(smtp.getId());
				smtp.setPassword(tempSmpt.getPassword());
			} else {
				encrypt(smtp);
				decrypt(smtp);
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
		Smtp smpt = smptRepository.findByUser(user);
		if (smpt == null) {
			throw new NotFoundException(BECAUSE_OF_OBJECT_IS_NULL);
		}
		return smpt;
	}

	@Override
	public Smtp encrypt(Smtp smtp) {
		try {

			BytesKeyGenerator generator = KeyGenerators.secureRandom();
			byte[] salt = generator.generateKey();
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(smtp.getUser().getUsername().toCharArray(), salt, 65536, 128);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKey secret = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secret);
			AlgorithmParameters params = cipher.getParameters();
			byte[] iv = params.getParameterSpec(IvParameterSpec.class).getIV();
			byte[] ciphertext = cipher.doFinal(smtp.getPassword());

			smtp.setPassword(ciphertext);
			smtp.setIv(iv);
			smtp.setSalt(salt);

			return smtp;
		} catch (Exception ex) {
			return null;
		}

	}

	@Override
	public Smtp decrypt(Smtp smtp) {
		try {
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(smtp.getUser().getUsername().toCharArray(), smtp.getSalt(), 65536, 128);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKey secret = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, secret, new IvParameterSpec(smtp.getIv()));
			smtp.setPassword(cipher.doFinal(smtp.getPassword()));

			return smtp;
		} catch (Exception ex) {
			return null;
		}

	}
}
