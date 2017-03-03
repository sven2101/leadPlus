package dash.security.jwt;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dash.security.jwt.domain.AccessJwtToken;
import dash.security.jwt.domain.JwtToken;
import dash.security.jwt.domain.Scopes;
import dash.security.jwt.domain.UserContext;
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

	/**
	 * Factory method for issuing new JWT Tokens.
	 * 
	 * @param username
	 * @param roles
	 * @return
	 */
	public AccessJwtToken createAccessJwtToken(UserContext userContext, String tenant, String smtpKey) {
		if (userContext.getUsername() == null && userContext.getUsername() == "")
			throw new IllegalArgumentException("Cannot create JWT Token without username");

		if (userContext.getAuthorities() == null || userContext.getAuthorities().isEmpty())
			throw new IllegalArgumentException("User doesn't have any privileges");

		Claims claims = Jwts.claims().setSubject(userContext.getUsername());
		claims.put("tenant", tenant);
		claims.put("signature", smtpKey == null ? userContext.getSmtpKey() : smtpKey);
		claims.put("scopes", userContext.getAuthorities().stream().map(s -> s.toString()).collect(Collectors.toList()));

		DateTime currentTime = new DateTime();

		String token = Jwts.builder().setClaims(claims).setIssuer(settings.getTokenIssuer())
				.setIssuedAt(currentTime.toDate())
				.setExpiration(currentTime.plusMinutes(settings.getTokenExpirationTime()).toDate())
				.signWith(SignatureAlgorithm.HS512, settings.getTokenSigningKey()).compact();

		return new AccessJwtToken(token, claims);
	}

	public JwtToken createRefreshToken(UserContext userContext, String tenant, String smtpKey) {
		if (userContext.getUsername() == null && userContext.getUsername() == "") {
			throw new IllegalArgumentException("Cannot create JWT Token without username");
		}

		DateTime currentTime = new DateTime();

		Claims claims = Jwts.claims().setSubject(userContext.getUsername());
		claims.put("tenant", tenant);
		claims.put("signature", smtpKey == null ? userContext.getSmtpKey() : smtpKey);
		claims.put("scopes", Arrays.asList(Scopes.REFRESH_TOKEN.authority()));

		String token = Jwts.builder().setClaims(claims).setIssuer(settings.getTokenIssuer())
				.setId(UUID.randomUUID().toString()).setIssuedAt(currentTime.toDate())
				.setExpiration(currentTime.plusMinutes(settings.getRefreshTokenExpTime()).toDate())
				.signWith(SignatureAlgorithm.HS512, settings.getTokenSigningKey()).compact();

		return new AccessJwtToken(token, claims);
	}

	public AccessJwtToken createApiJwtToken(UserContext userContext, String tenant, String smtpKey) {
		if (userContext.getUsername() == null && userContext.getUsername() == "")
			throw new IllegalArgumentException("Cannot create JWT Token without username");

		if (userContext.getAuthorities() == null || userContext.getAuthorities().isEmpty())
			throw new IllegalArgumentException("User doesn't have any privileges");

		Claims claims = Jwts.claims().setSubject("");
		claims.put("tenant", tenant);

		List<String> scopes = new ArrayList<>();
		scopes.add("ROLE_USER");
		claims.put("scopes", scopes);

		DateTime currentTime = new DateTime();

		String token = Jwts.builder().setClaims(claims).setIssuer(settings.getTokenIssuer())
				.setIssuedAt(currentTime.toDate())
				.setExpiration(currentTime.plusMinutes(settings.getApiTokenExpirationTime()).toDate())
				.signWith(SignatureAlgorithm.HS512, settings.getTokenSigningKey()).compact();

		return new AccessJwtToken(token, claims);
	}
}
