package dash.smtpmanagement.rest.test;

import dash.smtpmanagement.domain.SmtpEncryptionType;
import dash.usermanagement.domain.User;

public class SmtpWrapper {

	private Long id;
	private String sender;
	private String host;
	private String username;
	private byte[] password;
	private String email;
	private SmtpEncryptionType encryption;
	private int port;
	private boolean connection;
	private byte[] salt;
	private User user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public byte[] getPassword() {
		return password;
	}

	public void setPassword(byte[] password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public SmtpEncryptionType getEncryption() {
		return encryption;
	}

	public void setEncryption(SmtpEncryptionType encryption) {
		this.encryption = encryption;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public boolean isConnection() {
		return connection;
	}

	public void setConnection(boolean connection) {
		this.connection = connection;
	}

	public byte[] getSalt() {
		return salt;
	}

	public void setSalt(byte[] salt) {
		this.salt = salt;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
