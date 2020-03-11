
package dash.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import net.minidev.json.JSONObject;

@ResponseStatus(HttpStatus.CONFLICT)
public class APIIntegrationException extends Exception {

	private static final long serialVersionUID = 5520905786207281118L;
	private final JSONObject error;

	public APIIntegrationException(String message) {
		super(message);
		error = new JSONObject();
		error.put("error", message);
	}

	public JSONObject getError() {
		return error;
	}
}
