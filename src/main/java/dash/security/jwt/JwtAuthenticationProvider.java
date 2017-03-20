package dash.security.jwt;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import dash.multitenancy.configuration.TenantContext;
import dash.security.jwt.domain.JwtAuthenticationToken;
import dash.security.jwt.domain.RawAccessJwtToken;
import dash.security.jwt.domain.UserContext;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@Component
@SuppressWarnings("unchecked")
public class JwtAuthenticationProvider implements AuthenticationProvider {
	private final JwtSettings jwtSettings;

	@Autowired
	public JwtAuthenticationProvider(JwtSettings jwtSettings) {
		this.jwtSettings = jwtSettings;
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		RawAccessJwtToken rawAccessToken = (RawAccessJwtToken) authentication.getCredentials();

		Jws<Claims> jwsClaims = rawAccessToken.parseClaims(jwtSettings.getTokenSigningKey());
		String subject = jwsClaims.getBody().getSubject();
		List<String> scopes = jwsClaims.getBody().get("scopes", List.class);
		String tenant = jwsClaims.getBody().get("tenant", String.class);
		String smtpKey = jwsClaims.getBody().get("signature", String.class);
		TenantContext.setTenant(tenant);
		List<GrantedAuthority> authorities = scopes.stream().map(authority -> new SimpleGrantedAuthority(authority))
				.collect(Collectors.toList());

		UserContext context = UserContext.create(subject, authorities, smtpKey);

		return new JwtAuthenticationToken(context, context.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (JwtAuthenticationToken.class.isAssignableFrom(authentication));
	}
}
