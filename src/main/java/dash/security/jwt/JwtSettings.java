package dash.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import dash.security.jwt.domain.JwtToken;

@Configuration
@ConfigurationProperties(prefix = "security.jwt")
@Component
public class JwtSettings {
	/**
	 * {@link JwtToken} will expire after this time.
	 */
	private Integer tokenExpirationTime;

	/**
	 * Token issuer.
	 */
	private String tokenIssuer;

	/**
	 * Key is used to sign {@link JwtToken}.
	 */
	private String tokenSigningKey;

	/**
	 * {@link JwtToken} can be refreshed during this timeframe.
	 */
	private Integer refreshTokenExpTime;

	/**
	 * {@link JwtToken} can be refreshed during this timeframe.
	 */
	private Integer apiTokenExpirationTime;

	public Integer getRefreshTokenExpTime() {
		return refreshTokenExpTime;
	}

	public void setRefreshTokenExpTime(Integer refreshTokenExpTime) {
		this.refreshTokenExpTime = refreshTokenExpTime;
	}

	public Integer getTokenExpirationTime() {
		return tokenExpirationTime;
	}

	public void setTokenExpirationTime(Integer tokenExpirationTime) {
		this.tokenExpirationTime = tokenExpirationTime;
	}

	public Integer getApiTokenExpirationTime() {
		return apiTokenExpirationTime;
	}

	public void setApiTokenExpirationTime(Integer apiTokenExpirationTime) {
		this.apiTokenExpirationTime = apiTokenExpirationTime;
	}

	public String getTokenIssuer() {
		return tokenIssuer;
	}

	public void setTokenIssuer(String tokenIssuer) {
		this.tokenIssuer = tokenIssuer;
	}

	public String getTokenSigningKey() {
		return tokenSigningKey;
	}

	public void setTokenSigningKey(String tokenSigningKey) {
		this.tokenSigningKey = tokenSigningKey;
	}
}
