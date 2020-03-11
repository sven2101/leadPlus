
package dash.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class SMTPdoesntExistsException extends NotFoundException {

	private static final long serialVersionUID = 5520905786207281118L;

	public SMTPdoesntExistsException(String message) {
		super(message);
	}
}
