package dash.notificationmanagement.business.ssl.test;

import dash.common.EncryptionWrapper;
import dash.common.Encryptor;
import dash.smtpmanagement.domain.Smtp;
import dash.smtpmanagement.domain.SmtpEncryptionType;
import dash.test.Provider;

public class SSLSmtpProvider extends Provider {

	public static Smtp createNetcupSmtpSSL() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(NETCUP_SMTP_SERVER);
		smtp.setUsername(NETCUP_EMAIL);
		smtp.setPassword(NETCUP_PASSWORD.getBytes());
		smtp.setEmail(NETCUP_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.SSL);
		smtp.setPort(465);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createAlfahostingSmtpSSL() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(ALFAHOSTING_EMAIL);
		smtp.setUsername(ALFAHOSTING_USERNAME);
		smtp.setPassword(ALFAHOSTING_PASSWORD.getBytes());
		smtp.setEmail(ALFAHOSTING_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.SSL);
		smtp.setPort(465);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createGmailSSLSmtp() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(GMAIL_SMTP_SERVER);
		smtp.setUsername(GMAIL_EMAIL);
		smtp.setPassword(GMAIL_PASSWORD.getBytes());
		smtp.setEmail(GMAIL_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.SSL);
		smtp.setPort(465);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createGmxSSLSmtp() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(GMX_SMTP_SERVER);
		smtp.setUsername(GMX_EMAIL);
		smtp.setPassword(GMX_PASSWORD.getBytes());
		smtp.setEmail(GMX_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.SSL);
		smtp.setPort(465);
		smtp.setConnection(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

}
