package dash.security.jwt;

import org.springframework.security.core.AuthenticationException;

public class ApiTokenDeactivatedException extends AuthenticationException {

	private static final long serialVersionUID = 1994186702692422653L;

	public ApiTokenDeactivatedException(String message) {
		super(message);
	}

}
