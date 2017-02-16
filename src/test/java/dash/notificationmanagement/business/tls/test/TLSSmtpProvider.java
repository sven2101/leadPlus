package dash.notificationmanagement.business.tls.test;

import dash.common.EncryptionWrapper;
import dash.common.Encryptor;
import dash.smtpmanagement.domain.Smtp;
import dash.smtpmanagement.domain.SmtpEncryptionType;
import dash.test.Provider;

public class TLSSmtpProvider extends Provider {

	public static Smtp createGmailTLSSmtp() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(GMAIL_SMTP_SERVER);
		smtp.setUsername(GMAIL_EMAIL);
		smtp.setPassword(GMAIL_PASSWORD.getBytes());
		smtp.setEmail(GMAIL_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.TLS);
		smtp.setPort(587);
		smtp.setVerified(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createAlfahostingTLSSmtp() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(ALFAHOSTING_EMAIL);
		smtp.setUsername(ALFAHOSTING_USERNAME);
		smtp.setPassword(ALFAHOSTING_PASSWORD.getBytes());
		smtp.setEmail(ALFAHOSTING_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.TLS);
		smtp.setPort(25);
		smtp.setVerified(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createNetcupSmtpTLS() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(NETCUP_SMTP_SERVER);
		smtp.setUsername(NETCUP_EMAIL);
		smtp.setPassword(NETCUP_PASSWORD.getBytes());
		smtp.setEmail(NETCUP_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.TLS);
		smtp.setPort(25);
		smtp.setVerified(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}

	public static Smtp createWebTLSSmtp() throws Exception {
		Smtp smtp = new Smtp();
		smtp.setSender(SENDER);
		smtp.setHost(WEB_SMTP_SERVER);
		smtp.setUsername(WEB_EMAIL);
		smtp.setPassword(WEB_PASSWORD.getBytes());
		smtp.setEmail(WEB_EMAIL);
		smtp.setEncryption(SmtpEncryptionType.TLS);
		smtp.setPort(587);
		smtp.setVerified(true);
		smtp.setSalt(USERNAME.getBytes());

		EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), SMTP_KEY);
		smtp.setPassword(encryptionWrapper.getCiphertext());
		smtp.setSalt(encryptionWrapper.getSalt());
		smtp.setIv(encryptionWrapper.getIv());
		return smtp;
	}
}
