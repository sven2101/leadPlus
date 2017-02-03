package dash.notificationmanagement.business.starttls.test;

import dash.common.EncryptionWrapper;
import dash.common.Encryptor;
import dash.smtpmanagement.domain.Smtp;
import dash.smtpmanagement.domain.SmtpEncryptionType;
import dash.test.BaseConfig;

public class STARTTLSSmtpProvider extends BaseConfig {

	public static Smtp createAlfahostingSTARTTLSSmtp() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(ALFAHOSTING_EMAIL);
		smtp.setUsername(ALFAHOSTING_USERNAME);
		smtp.setPassword(ALFAHOSTING_PASSWORD.getBytes());
		smtp.setEmail(ALFAHOSTING_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.STARTTLS);
		smtp.setPort(587);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createLiveSTARTTLSSmtpPort587() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(OUTLOOK_SMTP_SERVER);
		smtp.setUsername(OUTLOOK_EMAIL);
		smtp.setPassword(OUTLOOK_PASSWORD.getBytes());
		smtp.setEmail(OUTLOOK_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.STARTTLS);
		smtp.setPort(587);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createWebSTARTTLSSmtp() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(WEB_SMTP_SERVER);
		smtp.setUsername(WEB_EMAIL);
		smtp.setPassword(WEB_PASSWORD.getBytes());
		smtp.setEmail(WEB_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.STARTTLS);
		smtp.setPort(587);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createLiveSTARTTLSSmtpPort25() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(OUTLOOK_SMTP_SERVER);
		smtp.setUsername(OUTLOOK_EMAIL);
		smtp.setPassword(OUTLOOK_PASSWORD.getBytes());
		smtp.setEmail(OUTLOOK_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.STARTTLS);
		smtp.setPort(25);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createGmxSTARTTLSSmtp() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(GMX_SMTP_SERVER);
		smtp.setUsername(GMX_EMAIL);
		smtp.setPassword(GMX_PASSWORD.getBytes());
		smtp.setEmail(GMX_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.STARTTLS);
		smtp.setPort(587);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createFalseSTARTTLSSmtp() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost("asdfasd.asdjkfhaks.smtp");
		smtp.setUsername("asdfasdf");
		smtp.setPassword("asdfasdf".getBytes());
		smtp.setEmail("asdfasdf@asdfasdf");
		smtp.setEncryption(SmtpEncryptionType.STARTTLS);
		smtp.setPort(587);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}
}
