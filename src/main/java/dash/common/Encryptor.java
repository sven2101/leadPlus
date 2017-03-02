package dash.common;

import java.security.AlgorithmParameters;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.keygen.BytesKeyGenerator;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.stereotype.Component;

@Component
public class Encryptor {

	private static String smtpSecret;

	@Value("${security.smtp.secret}")
	public void setSmtpSecret(String smtpSecret) {
		Encryptor.smtpSecret = smtpSecret;
	}

	public static EncryptionWrapper encrypt(byte[] text, String password) throws Exception {
		try {
			String tempPassword = password + smtpSecret;
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			digest.update(tempPassword.getBytes("UTF-8"));
			byte[] hash = digest.digest();

			BytesKeyGenerator generator = KeyGenerators.secureRandom();
			byte[] salt = generator.generateKey();
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(new String(hash, "UTF-16").toCharArray(), salt, 65536, 128);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKey secret = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secret);
			AlgorithmParameters params = cipher.getParameters();
			byte[] iv = params.getParameterSpec(IvParameterSpec.class).getIV();
			byte[] ciphertext = cipher.doFinal(text);
			return new EncryptionWrapper(ciphertext, salt, iv);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}

	}

	public static byte[] decrypt(EncryptionWrapper encryptionWrapper, String password) throws Exception {
		try {
			String tempPassword = password + smtpSecret;
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			digest.update(tempPassword.getBytes("UTF-8"));
			byte[] hash = digest.digest();

			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(new String(hash, "UTF-16").toCharArray(), encryptionWrapper.getSalt(), 65536,
					128);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKey secret = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, secret, new IvParameterSpec(encryptionWrapper.getIv()));
			return cipher.doFinal(encryptionWrapper.getCiphertext());

		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}

	public static String hashTextPBKDF2(String text, String salt) {
		byte b[] = hashPassword(text.toCharArray(), salt.getBytes(), 10000, 100);
		byte[] base64CredsBytes = Base64.encodeBase64(b);
		return new String(base64CredsBytes);
	}

	private static byte[] hashPassword(final char[] text, final byte[] salt, final int iterations, final int length) {
		try {
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			PBEKeySpec spec = new PBEKeySpec(text, salt, iterations, length);
			SecretKey key = skf.generateSecret(spec);
			byte[] res = key.getEncoded();
			return res;
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			throw new RuntimeException(e);
		}
	}
}
