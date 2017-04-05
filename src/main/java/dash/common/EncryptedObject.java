package dash.common;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

public abstract class EncryptedObject {

	@Id
	protected Long id;

	@JsonIgnore
	@Column(name = "salt", nullable = false)
	private byte[] salt;

	@JsonIgnore
	@Column(name = "iv", nullable = false)
	private byte[] iv;

	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "password", nullable = false)
	private byte[] password;

	@Transient
	@JsonProperty(access = Access.WRITE_ONLY)
	private boolean decrypted;

	public byte[] getSalt() {
		return salt;
	}

	public void setSalt(byte[] salt) {
		this.salt = salt;
	}

	public byte[] getIv() {
		return iv;
	}

	public void setIv(byte[] iv) {
		this.iv = iv;
	}

	public byte[] getPassword() {
		return password;
	}

	public void setPassword(byte[] password) {
		this.password = password;
	}

	public boolean isDecrypted() {
		return decrypted;
	}

	public void setDecrypted(boolean decrypted) {
		this.decrypted = decrypted;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (decrypted ? 1231 : 1237);
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + Arrays.hashCode(iv);
		result = prime * result + Arrays.hashCode(password);
		result = prime * result + Arrays.hashCode(salt);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EncryptedObject other = (EncryptedObject) obj;
		if (decrypted != other.decrypted)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (!Arrays.equals(iv, other.iv))
			return false;
		if (!Arrays.equals(password, other.password))
			return false;
		if (!Arrays.equals(salt, other.salt))
			return false;
		return true;
	}

}
