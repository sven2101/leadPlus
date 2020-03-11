package dash.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Tenant already Exists")
public class TenantAlreadyExistsException extends Exception {

	private static final long serialVersionUID = 3201696999550610713L;

	public TenantAlreadyExistsException(String msg, Throwable t) {
		super(msg, t);
	}

	public TenantAlreadyExistsException(String msg) {
		super(msg);
	}

}
