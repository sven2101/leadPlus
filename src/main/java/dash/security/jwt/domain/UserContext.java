package dash.security.jwt.domain;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;

public class UserContext {
	private final String username;
	private final List<GrantedAuthority> authorities;
	private final String smtpKey;

	private UserContext(String username, List<GrantedAuthority> authorities, String smtpKey) {
		this.username = username;
		this.authorities = authorities;
		this.smtpKey = smtpKey;
	}

	public static UserContext create(String username, List<GrantedAuthority> authorities, String smtpKey) {
		if (username == null || username == "")
			throw new IllegalArgumentException("Username is blank: " + username);
		return new UserContext(username, authorities, smtpKey);
	}

	public String getUsername() {
		return username;
	}

	public List<GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public String getSmtpKey() {
		return smtpKey;
	}

}
