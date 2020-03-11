package dash.security.jwt.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.jsonwebtoken.Claims;

public final class ApiJwtToken implements JwtToken {
	private final String rawToken;
	@JsonIgnore
	private Claims claims;

	@JsonIgnore
	private String id;

	public ApiJwtToken(final String token, Claims claims, String id) {
		this.rawToken = token;
		this.claims = claims;
		this.id = id;
	}

	public String getToken() {
		return this.rawToken;
	}

	public Claims getClaims() {
		return claims;
	}

	public String getId() {
		return id;
	}

}