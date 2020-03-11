package dash.smtpmanagement.domain;

/**
 * How to secure the connection to an SMTP server.
 */
public enum SmtpEncryptionType {

	/**
	 * The connection will be established using SSL/TLS right from the start. If
	 * this mode is used, the SMTP client needs to be configured to connect to
	 * the dedicated port at which the server listens for SSL/TLS connections.
	 */
	SSL, TLS,

	/**
	 * A plain-text connection will be established and be switched to TLS. SMTP
	 * servers supporting this mode listen on a single port only instead of
	 * opening a second secured port like in the case of {@link #SSL_TLS}. An
	 * SMTP client using this transport security should require the switch to
	 * TLS and should not continue if the plain-text connection cannot be
	 * switched to TLS.
	 */
	STARTTLS, PLAIN
}
