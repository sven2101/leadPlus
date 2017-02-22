package dash.security.jwt.rest;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import dash.security.jwt.InvalidJwtToken;
import dash.security.jwt.JwtSettings;
import dash.security.jwt.JwtTokenFactory;
import dash.security.jwt.TokenExtractor;
import dash.security.jwt.TokenVerifier;
import dash.security.jwt.WebSecurityConfig;
import dash.security.jwt.domain.JwtToken;
import dash.security.jwt.domain.RawAccessJwtToken;
import dash.security.jwt.domain.RefreshToken;
import dash.security.jwt.domain.UserContext;
import dash.tenantmanagement.business.TenantContext;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;

/**
 * RefreshTokenEndpoint
 * 
 * @author vladimir.stankovic
 *
 *         Aug 17, 2016
 */
@RestController
public class RefreshTokenEndpoint {
	@Autowired
	private JwtTokenFactory tokenFactory;
	@Autowired
	private JwtSettings jwtSettings;
	@Autowired
	private UserService userService;
	@Autowired
	private TokenVerifier tokenVerifier;
	@Autowired
	@Qualifier("jwtHeaderTokenExtractor")
	private TokenExtractor tokenExtractor;

	@RequestMapping(value = "/api/rest/auth/token", method = RequestMethod.GET, produces = {
			MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody JwtToken refreshToken(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		String tokenPayload = tokenExtractor.extract(request.getHeader(WebSecurityConfig.JWT_TOKEN_HEADER_PARAM));

		RawAccessJwtToken rawToken = new RawAccessJwtToken(tokenPayload);
		RefreshToken refreshToken = RefreshToken.create(rawToken, jwtSettings.getTokenSigningKey())
				.orElseThrow(() -> new InvalidJwtToken());

		String tenant = refreshToken.getClaims().getBody().get("tenant", String.class);

		String jti = refreshToken.getJti();
		if (!tokenVerifier.verify(jti)) {
			throw new InvalidJwtToken();
		}
		TenantContext.setTenant(tenant);
		String subject = refreshToken.getSubject();
		User user = userService.loadUserByEmail(subject)
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + subject));

		if (user.getRole() == null)
			throw new InsufficientAuthenticationException("User has no roles assigned");
		List<GrantedAuthority> authorities = Arrays.asList(user.getRole()).stream()
				.map(authority -> new SimpleGrantedAuthority(authority.authority())).collect(Collectors.toList());

		UserContext userContext = UserContext.create(user.getUsername(), authorities);

		return tokenFactory.createAccessJwtToken(userContext, tenant);
	}
}
