package dash.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DontMatchException extends RuntimeException {

	private static final long serialVersionUID = 5520905786207281118L;

	public DontMatchException(String message) {
		super(message);
	}
}
