package dash.common;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import dash.consistencymanagement.domain.ConsistencyObject;

@MappedSuperclass
public abstract class EncryptedObject extends ConsistencyObject {

	@JsonIgnore
	@Column(name = "salt", nullable = false)
	private byte[] salt;

	@JsonIgnore
	@Column(name = "iv", nullable = false)
	private byte[] iv;

	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "password", nullable = false)
	protected byte[] password;

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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + (decrypted ? 1231 : 1237);
		result = prime * result + Arrays.hashCode(iv);
		result = prime * result + Arrays.hashCode(password);
		result = prime * result + Arrays.hashCode(salt);
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
		EncryptedObject other = (EncryptedObject) obj;
		if (decrypted != other.decrypted)
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
