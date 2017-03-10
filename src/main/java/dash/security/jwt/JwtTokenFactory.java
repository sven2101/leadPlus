package dash.security.jwt;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dash.common.Encryptor;
import dash.security.jwt.domain.AccessJwtToken;
import dash.security.jwt.domain.ApiJwtToken;
import dash.security.jwt.domain.JwtToken;
import dash.security.jwt.domain.Scopes;
import dash.security.jwt.domain.TokenType;
import dash.security.jwt.domain.UserContext;
import dash.tenantmanagement.business.TenantService;
import dash.tenantmanagement.domain.Tenant;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * Factory class that should be always used to create {@link JwtToken}.
 * 
 * @author vladimir.stankovic
 *
 *         May 31, 2016
 */
@Component
public class JwtTokenFactory {
	private final JwtSettings settings;

	@Autowired
	public JwtTokenFactory(JwtSettings settings) {
		this.settings = settings;
	}

	@Autowired
	private UserService userService;

	@Autowired
	private TenantService tenantService;

	/**
	 * Factory method for issuing new JWT Tokens.
	 * 
	 * @param username
	 * @param roles
	 * @return
	 */
	public AccessJwtToken createAccessJwtToken(UserContext userContext, String tenant, String smtpKey) {
		if (userContext.getUsername() == null && userContext.getUsername() == "") {
			throw new IllegalArgumentException("Cannot create JWT Token without username");
		}
		if (userContext.getAuthorities() == null || userContext.getAuthorities().isEmpty()) {
			throw new IllegalArgumentException("User doesn't have any privileges");
		}
		if (tenant == null) {
			throw new IllegalArgumentException("Cannot create JWT Token without tenant");
		}

		Claims claims = Jwts.claims().setSubject(userContext.getUsername());
		claims.put("tenant", tenant);
		claims.put("signature", smtpKey == null ? userContext.getSmtpKey() : smtpKey);
		claims.put("scopes", userContext.getAuthorities().stream().map(s -> s.toString()).collect(Collectors.toList()));
		claims.put("tokenType", TokenType.ACCESS);

		DateTime currentTime = new DateTime();

		String token = Jwts.builder().setClaims(claims).setIssuer(settings.getTokenIssuer())
				.setId(UUID.randomUUID().toString()).setIssuedAt(currentTime.toDate())
				.setExpiration(currentTime.plusMinutes(settings.getTokenExpirationTime()).toDate())
				.signWith(SignatureAlgorithm.HS512, settings.getTokenSigningKey()).compact();

		return new AccessJwtToken(token, claims);
	}

	public JwtToken createRefreshToken(UserContext userContext, String tenantKey, String smtpKey) {
		if (userContext.getUsername() == null && userContext.getUsername() == "") {
			throw new IllegalArgumentException("Cannot create JWT Token without username");
		}
		if (tenantKey == null) {
			throw new IllegalArgumentException("Cannot create JWT Token without tenant");
		}

		DateTime currentTime = new DateTime();

		Claims claims = Jwts.claims().setSubject(userContext.getUsername());
		claims.put("tenant", tenantKey);
		claims.put("signature", smtpKey == null ? userContext.getSmtpKey() : smtpKey);
		claims.put("scopes", Arrays.asList(Scopes.REFRESH_TOKEN.authority()));
		claims.put("tokenType", TokenType.REFRESH);

		User user = userService.getUserByEmail(userContext.getUsername());
		Tenant tenant = tenantService.getTenantByName(tenantKey);
		claims.put("userSignature",
				Encryptor.hashTextPBKDF2(
						tenant.getJwtTokenVersion() + user.getPassword().substring(user.getPassword().length() / 2),
						user.getEmail(), 300));

		String token = Jwts.builder().setClaims(claims).setIssuer(settings.getTokenIssuer())
				.setId(UUID.randomUUID().toString()).setIssuedAt(currentTime.toDate())
				.setExpiration(currentTime.plusMinutes(settings.getRefreshTokenExpTime()).toDate())
				.signWith(SignatureAlgorithm.HS512, settings.getTokenSigningKey()).compact();

		return new AccessJwtToken(token, claims);
	}

	public ApiJwtToken createApiJwtToken(String username, String tenant) {
		if (username == null) {
			throw new IllegalArgumentException("Cannot create JWT Token without username");
		}
		if (tenant == null) {
			throw new IllegalArgumentException("Cannot create JWT Token without tenant");
		}
		Claims claims = Jwts.claims().setSubject(username);
		claims.put("tenant", tenant);
		List<String> scopes = new ArrayList<>();
		scopes.add("ROLE_API");
		claims.put("scopes", scopes);
		claims.put("tokenType", TokenType.API);
		DateTime currentTime = new DateTime();
		String apiTokenId = UUID.randomUUID().toString();
		String token = Jwts.builder().setClaims(claims).setIssuer(settings.getTokenIssuer())
				.setIssuedAt(currentTime.toDate()).setId(apiTokenId)
				.setExpiration(currentTime.plusMinutes(settings.getApiTokenExpirationTime()).toDate())
				.signWith(SignatureAlgorithm.HS512, settings.getTokenSigningKey()).compact();

		return new ApiJwtToken(token, claims, apiTokenId);
	}
}
