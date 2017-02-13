package dash.notificationmanagement.business;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmailSendFailedException extends Exception {

	private static final long serialVersionUID = -296407934626827784L;

	public EmailSendFailedException(String message) {
		super(message);
	}

}
