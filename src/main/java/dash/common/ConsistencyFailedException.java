package dash.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ConsistencyFailedException extends Exception {
	
	private static final long serialVersionUID = -1433032719815174586L;

	public ConsistencyFailedException(String message) {
		super(message);
	}
}
