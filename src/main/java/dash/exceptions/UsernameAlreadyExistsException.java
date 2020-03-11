
package dash.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UsernameAlreadyExistsException extends RuntimeException {

	private static final long serialVersionUID = 5520905786207281118L;

	public UsernameAlreadyExistsException(String message) {
		super(message);
	}
}
