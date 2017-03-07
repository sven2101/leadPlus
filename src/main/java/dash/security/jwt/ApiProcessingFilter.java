package dash.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.RequestMatcher;

import dash.security.jwt.domain.JwtAuthenticationToken;
import dash.security.jwt.domain.RawAccessJwtToken;
import dash.sourcemanagement.business.SourceService;
import dash.sourcemanagement.domain.Source;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

/**
 * Performs validation of provided JWT Token.
 * 
 * @author vladimir.stankovic
 *
 *         Aug 5, 2016
 */
public class ApiProcessingFilter extends AbstractAuthenticationProcessingFilter {
	private final AuthenticationFailureHandler failureHandler;
	private final TokenExtractor tokenExtractor;
	private final JwtSettings jwtSettings;
	private final SourceService sourceService;

	@Autowired
	public ApiProcessingFilter(AuthenticationFailureHandler failureHandler, TokenExtractor tokenExtractor,
			RequestMatcher matcher, JwtSettings jwtSettings, SourceService sourceService) {
		super(matcher);
		this.failureHandler = failureHandler;
		this.tokenExtractor = tokenExtractor;
		this.jwtSettings = jwtSettings;
		this.sourceService = sourceService;

	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {
		String tokenPayload = request.getHeader(WebSecurityConfig.JWT_TOKEN_HEADER_PARAM);
		RawAccessJwtToken rawToken = new RawAccessJwtToken(tokenExtractor.extract(tokenPayload));
		Jws<Claims> jwsClaims = rawToken.parseClaims(jwtSettings.getTokenSigningKey());
		String tokenId = jwsClaims.getBody().getId();
		String subject = jwsClaims.getBody().getSubject();
		if (tokenId == null) {
			throw new InsufficientAuthenticationException("tokenId is null");
		}
		if (subject == null) {
			throw new InsufficientAuthenticationException("subject is null");
		}

		Source source = sourceService.getByName(subject);
		if (tokenId == null || !tokenId.equals(source.getTokenId())) {
			throw new ApiTokenDeactivatedException("Apitoken deactivated");
		}
		JwtAuthenticationToken token = new JwtAuthenticationToken(rawToken);
		return getAuthenticationManager().authenticate(token);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		SecurityContext context = SecurityContextHolder.createEmptyContext();
		context.setAuthentication(authResult);
		SecurityContextHolder.setContext(context);

		chain.doFilter(request, response);
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		SecurityContextHolder.clearContext();
		failureHandler.onAuthenticationFailure(request, response, failed);
	}
}
