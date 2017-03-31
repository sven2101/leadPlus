package dash.security.jwt;

public interface TokenVerifier {
	public boolean verify(String jti);
}
