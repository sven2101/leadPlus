package dash.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "Tenant is invalid")
public class TenantAuthentificationException extends AuthenticationException {

	private static final long serialVersionUID = 3201696999550610713L;

	// ~ Constructors
	// ===================================================================================================

	/**
	 * Constructs a {@code TenantAuthentificationException} with the specified message
	 * and root cause.
	 *
	 * @param msg the detail message
	 * @param t the root cause
	 */
	public TenantAuthentificationException(String msg, Throwable t) {
		super(msg, t);
	}

	/**
	 * Constructs an {@code TenantAuthentificationException} with the specified message
	 * and no root cause.
	 *
	 * @param msg the detail message
	 */
	public TenantAuthentificationException(String msg) {
		super(msg);
	}

}
