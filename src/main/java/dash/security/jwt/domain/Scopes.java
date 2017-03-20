package dash.security.jwt.domain;

public enum Scopes {
	REFRESH_TOKEN;

	public String authority() {
		return "ROLE_" + this.name();
	}
}
