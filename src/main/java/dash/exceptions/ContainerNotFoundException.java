package dash.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ContainerNotFoundException extends Exception {

	private static final long serialVersionUID = 5520905786207281118L;

	public ContainerNotFoundException(String message) {
		super(message);
	}
}
