package dash.smtpmanagement.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import dash.common.EncryptedObject;
import dash.usermanagement.domain.User;

@Entity
@Table(name = "smtp")
@SequenceGenerator(name = "idgen", sequenceName = "smtp_id_seq", allocationSize = 1)
public class Smtp extends EncryptedObject {

	@NotNull
	@Size(max = 255)
	@Column(name = "sender", nullable = false, length = 255)
	private String sender;

	@NotNull
	@Size(max = 255)
	@Column(name = "host", nullable = false, length = 255)
	private String host;

	@NotNull
	@Size(max = 255)
	@Column(name = "username", nullable = false, length = 255)
	private String username;

	@NotNull
	@Size(max = 255)
	@Column(name = "email", length = 255, nullable = false)
	private String email;

	@NotNull
	@Column(name = "encryption", length = 255, nullable = false)
	private SmtpEncryptionType encryption;

	@NotNull
	@Column(name = "port", nullable = false)
	private Integer port;

	@Column(name = "verified", nullable = false)
	private boolean verified;

	@NotNull
	@OneToOne
	@JoinColumn(name = "user_fk", nullable = false)
	private User user;

	@Transient
	@JsonProperty(access = Access.WRITE_ONLY)
	private boolean decrypted;

	public Smtp() {
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public SmtpEncryptionType getEncryption() {
		return encryption;
	}

	public void setEncryption(SmtpEncryptionType encryption) {
		this.encryption = encryption;
	}

	public Integer getPort() {
		return port;
	}

	public void setPort(Integer port) {
		this.port = port;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean connection) {
		this.verified = connection;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public boolean isDecrypted() {
		return decrypted;
	}

	public void setDecrypted(boolean decrypted) {
		this.decrypted = decrypted;
	}

	public boolean isSmtpPasswordNull() {
		return this.password == null;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + (decrypted ? 1231 : 1237);
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((encryption == null) ? 0 : encryption.hashCode());
		result = prime * result + ((host == null) ? 0 : host.hashCode());
		result = prime * result + ((port == null) ? 0 : port.hashCode());
		result = prime * result + ((sender == null) ? 0 : sender.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		result = prime * result + (verified ? 1231 : 1237);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		Smtp other = (Smtp) obj;
		if (decrypted != other.decrypted)
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (encryption != other.encryption)
			return false;
		if (host == null) {
			if (other.host != null)
				return false;
		} else if (!host.equals(other.host))
			return false;
		if (port == null) {
			if (other.port != null)
				return false;
		} else if (!port.equals(other.port))
			return false;
		if (sender == null) {
			if (other.sender != null)
				return false;
		} else if (!sender.equals(other.sender))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		if (verified != other.verified)
			return false;
		return true;
	}

}
