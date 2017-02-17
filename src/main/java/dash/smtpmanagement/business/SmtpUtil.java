package dash.smtpmanagement.business;

import static dash.Constants.MAIL_DEBUG;
import static dash.Constants.MAIL_DEBUG_VALUE;
import static dash.Constants.MAIL_SMTP_AUTH;
import static dash.Constants.MAIL_SMTP_CONNECTION_TIMEOUT;
import static dash.Constants.MAIL_SMTP_DSN_NOTIFY;
import static dash.Constants.MAIL_SMTP_HOST;
import static dash.Constants.MAIL_SMTP_PORT;
import static dash.Constants.MAIL_SMTP_REPORTSUCCESS;
import static dash.Constants.MAIL_SMTP_SEND_PARTIAL;
import static dash.Constants.MAIL_SMTP_SSL_AUTH;
import static dash.Constants.MAIL_SMTP_SSL_CONNECTION_TIMEOUT;
import static dash.Constants.MAIL_SMTP_SSL_DSN_NOTIFY;
import static dash.Constants.MAIL_SMTP_SSL_ENABLE;
import static dash.Constants.MAIL_SMTP_SSL_HOST;
import static dash.Constants.MAIL_SMTP_SSL_PORT;
import static dash.Constants.MAIL_SMTP_SSL_QUITWAIT;
import static dash.Constants.MAIL_SMTP_SSL_REPORTSUCCESS;
import static dash.Constants.MAIL_SMTP_SSL_SEND_PARTIAL;
import static dash.Constants.MAIL_SMTP_SSL_SOCKET_FACTORY_CLASS;
import static dash.Constants.MAIL_SMTP_SSL_SOCKET_FACTORY_PORT;
import static dash.Constants.MAIL_SMTP_SSL_TIMEOUT;
import static dash.Constants.MAIL_SMTP_SSL_TRUST;
import static dash.Constants.MAIL_SMTP_STARTTLS_ENABLE;
import static dash.Constants.MAIL_SMTP_TIMEOUT;
import static dash.Constants.MAIL_TRANSPORT_PROTOCOL;
import static dash.Constants.UTF_8;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;

import org.apache.log4j.Logger;

import dash.common.EncryptionWrapper;
import dash.common.Encryptor;
import dash.smtpmanagement.domain.Smtp;
import dash.smtpmanagement.domain.SmtpEncryptionType;

public class SmtpUtil {

	private static final Logger logger = Logger.getLogger(SmtpUtil.class);

	private SmtpUtil() {
	}

	public static String decryptPasswordForSmtp(Smtp smtp, String smtpKey) throws UnsupportedEncodingException {
		byte[] smtpPassword = null;
		try {
			smtpPassword = Encryptor.decrypt(
					new EncryptionWrapper(smtp.getPassword().clone(), smtp.getSalt().clone(), smtp.getIv().clone()),
					smtpKey);
		} catch (Exception e) {
			logger.error("Couldn't decrypt password.", e);
			throw new UnsupportedEncodingException("Couldn't decrypt password.");
		}

		return new String(smtpPassword, UTF_8);
	}

	public static Session createSessionWithAuthentication(String host, int port, SmtpEncryptionType encryption,
			String username, String password) {
		Properties properties = null;

		if (encryption == SmtpEncryptionType.TLS)
			properties = SmtpUtil.createTLSProperties(host, port);
		else if (encryption == SmtpEncryptionType.STARTTLS)
			properties = SmtpUtil.createSTARTTLSProperties(host, port);
		else if (encryption == SmtpEncryptionType.SSL)
			properties = SmtpUtil.createSSLProperties(host, port);
		else if (encryption == SmtpEncryptionType.PLAIN)
			properties = SmtpUtil.createPLAINProperties(host, port);

		return Session.getInstance(properties, getPasswordAuthentication(username, password));
	}

	private static Authenticator getPasswordAuthentication(String username, String password) {
		return new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		};
	}

	public static Properties createPLAINProperties(String host, int port) {
		Properties properties = new Properties();
		properties.put(MAIL_DEBUG, MAIL_DEBUG_VALUE);
		properties.put(MAIL_TRANSPORT_PROTOCOL, "smtp");
		properties.put(MAIL_SMTP_HOST, host);
		properties.put(MAIL_SMTP_AUTH, "true");
		properties.put(MAIL_SMTP_PORT, String.valueOf(port));
		properties.put(MAIL_SMTP_CONNECTION_TIMEOUT, "10000");
		properties.put(MAIL_SMTP_TIMEOUT, "10000");
		properties.put(MAIL_SMTP_DSN_NOTIFY, "NEVER");
		properties.put(MAIL_SMTP_SEND_PARTIAL, "true");
		properties.put(MAIL_SMTP_REPORTSUCCESS, "false");

		return properties;
	}

	public static Properties createTLSProperties(String host, int port) {
		Properties properties = new Properties();
		properties.put(MAIL_DEBUG, MAIL_DEBUG_VALUE);
		properties.put(MAIL_SMTP_HOST, host);
		properties.put(MAIL_SMTP_AUTH, "true");
		properties.put(MAIL_SMTP_PORT, String.valueOf(port));
		properties.put(MAIL_SMTP_CONNECTION_TIMEOUT, "10000");
		properties.put(MAIL_SMTP_TIMEOUT, "10000");
		properties.put(MAIL_SMTP_SEND_PARTIAL, "true");
		properties.put(MAIL_SMTP_DSN_NOTIFY, "NEVER");
		properties.put(MAIL_SMTP_STARTTLS_ENABLE, "true");
		properties.put(MAIL_SMTP_REPORTSUCCESS, "false");

		return properties;
	}

	public static Properties createSTARTTLSProperties(String host, int port) {
		Properties properties = new Properties();
		properties.put(MAIL_DEBUG, MAIL_DEBUG_VALUE);
		properties.put(MAIL_SMTP_HOST, host);
		properties.put(MAIL_SMTP_AUTH, "true");
		properties.put(MAIL_SMTP_PORT, String.valueOf(port));
		properties.put(MAIL_SMTP_CONNECTION_TIMEOUT, "10000");
		properties.put(MAIL_SMTP_TIMEOUT, "10000");
		properties.put(MAIL_SMTP_SEND_PARTIAL, "true");
		properties.put(MAIL_SMTP_DSN_NOTIFY, "NEVER");
		properties.put(MAIL_SMTP_STARTTLS_ENABLE, "true");
		properties.put(MAIL_SMTP_REPORTSUCCESS, "false");

		return properties;
	}

	public static Properties createSSLProperties(String host, int port) {
		Properties properties = new Properties();
		properties.put(MAIL_DEBUG, MAIL_DEBUG_VALUE);
		properties.put(MAIL_TRANSPORT_PROTOCOL, "smtps");
		properties.put(MAIL_SMTP_SSL_ENABLE, "true");
		properties.put(MAIL_SMTP_SSL_QUITWAIT, "false");
		properties.put(MAIL_SMTP_SSL_SOCKET_FACTORY_PORT, port);
		properties.put(MAIL_SMTP_SSL_SOCKET_FACTORY_CLASS, "javax.net.ssl.SSLSocketFactory");
		properties.put(MAIL_SMTP_SSL_PORT, String.valueOf(port));
		properties.put(MAIL_SMTP_SSL_HOST, host);
		properties.put(MAIL_SMTP_SSL_AUTH, "true");
		properties.put(MAIL_SMTP_SSL_CONNECTION_TIMEOUT, "10000");
		properties.put(MAIL_SMTP_SSL_TIMEOUT, "10000");
		properties.put(MAIL_SMTP_SSL_SEND_PARTIAL, "true");
		properties.put(MAIL_SMTP_SSL_DSN_NOTIFY, "NEVER");
		properties.put(MAIL_SMTP_SSL_TRUST, host);
		properties.put(MAIL_SMTP_SSL_REPORTSUCCESS, "false");

		return properties;
	}

}
