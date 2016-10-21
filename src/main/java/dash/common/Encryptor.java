package dash.common;

import java.security.AlgorithmParameters;
import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.log4j.Logger;
import org.springframework.security.crypto.keygen.BytesKeyGenerator;
import org.springframework.security.crypto.keygen.KeyGenerators;

public class Encryptor {

	private static final Logger logger = Logger.getLogger(Encryptor.class);

	public static EncryptionWrapper encrypt(byte[] text, String password) throws Exception {
		try {

			BytesKeyGenerator generator = KeyGenerators.secureRandom();
			byte[] salt = generator.generateKey();
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKey secret = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secret);
			AlgorithmParameters params = cipher.getParameters();
			byte[] iv = params.getParameterSpec(IvParameterSpec.class).getIV();
			byte[] ciphertext = cipher.doFinal(text);
			String y = new String(ciphertext, "UTF-8");
			logger.error(y);
			return new EncryptionWrapper(ciphertext, salt, iv);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}

	}

	public static byte[] decrypt(EncryptionWrapper encryptionWrapper, String password) throws Exception {
		try {
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(password.toCharArray(), encryptionWrapper.getSalt(), 65536, 128);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKey secret = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, secret, new IvParameterSpec(encryptionWrapper.getIv()));
			byte[] x = cipher.doFinal(encryptionWrapper.getCiphertext());
			String y = new String(x, "UTF-8");
			logger.error(y);
			return x;

		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}

	}
}
