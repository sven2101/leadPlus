package dash.security.jwt;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import dash.security.jwt.domain.UserContext;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;

/**
 * 
 * @author vladimir.stankovic
 *
 *         Aug 3, 2016
 */
@Component
public class AjaxAuthenticationProvider implements AuthenticationProvider {
	private final BCryptPasswordEncoder encoder;
	private final UserService userService;

	@Autowired
	public AjaxAuthenticationProvider(final UserService userService, final BCryptPasswordEncoder encoder) {
		this.userService = userService;
		this.encoder = encoder;
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		Assert.notNull(authentication, "No authentication data provided");

		String email = (String) authentication.getPrincipal();
		String password = (String) authentication.getCredentials();
		String smtpKey = this.getBasic64Creds(email, password);

		User user = userService.loadUserByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

		if (!encoder.matches(password, user.getPassword())) {
			throw new BadCredentialsException("Authentication Failed. Username or Password not valid.");
		}

		if (user.getRole() == null)
			throw new InsufficientAuthenticationException("User has no roles assigned");

		List<GrantedAuthority> authorities = Arrays.asList(user.getRole()).stream()
				.map(authority -> new SimpleGrantedAuthority(authority.authority())).collect(Collectors.toList());

		UserContext userContext = UserContext.create(user.getUsername(), authorities, smtpKey);

		return new UsernamePasswordAuthenticationToken(userContext, null, userContext.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}

	private String getBasic64Creds(String username, String password) {
		String plainCreds = username + ":";

		byte a[] = plainCreds.getBytes();
		byte b[] = hashPassword(password.toCharArray(), username.getBytes(), 10000, 100);

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		try {
			outputStream.write(a);
			outputStream.write(b);
		} catch (IOException e) {
			e.printStackTrace();
		}

		byte plainCredsBytes[] = outputStream.toByteArray();
		byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
		return encodeURIComponent(new String(base64CredsBytes));
	}

	private byte[] hashPassword(final char[] password, final byte[] salt, final int iterations, final int length) {
		try {
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, 100);
			SecretKey key = skf.generateSecret(spec);
			byte[] res = key.getEncoded();
			System.out.println(new String(res));
			return res;
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			throw new RuntimeException(e);
		}
	}

	public String encodeURIComponent(String component) {
		String result = null;

		try {
			result = URLEncoder.encode(component, "UTF-8").replaceAll("\\%28", "(").replaceAll("\\%29", ")")
					.replaceAll("\\+", "%20").replaceAll("\\%27", "'").replaceAll("\\%21", "!")
					.replaceAll("\\%7E", "~");
		} catch (UnsupportedEncodingException e) {
			result = component;
		}

		return result;
	}
}
