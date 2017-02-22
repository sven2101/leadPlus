package dash.security.jwt;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

		User user = userService.loadUserByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

		if (!encoder.matches(password, user.getPassword())) {
			throw new BadCredentialsException("Authentication Failed. Username or Password not valid.");
		}

		if (user.getRole() == null)
			throw new InsufficientAuthenticationException("User has no roles assigned");

		List<GrantedAuthority> authorities = Arrays.asList(user.getRole()).stream()
				.map(authority -> new SimpleGrantedAuthority(authority.authority())).collect(Collectors.toList());

		UserContext userContext = UserContext.create(user.getUsername(), authorities);

		return new UsernamePasswordAuthenticationToken(userContext, null, userContext.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}
}
