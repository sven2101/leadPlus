package dash.common;

public class EncryptionWrapper {

	private byte[] ciphertext;
	private byte[] salt;
	private byte[] iv;

	public EncryptionWrapper(final byte[] ciphertext, final byte[] salt, final byte[] iv) {
		this.ciphertext = ciphertext;
		this.salt = salt;
		this.iv = iv;
	}

	public byte[] getCiphertext() {
		return ciphertext;
	}

	public void setCiphertext(byte[] ciphertext) {
		this.ciphertext = ciphertext;
	}

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

}
