package dash.templatemanagement.business;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TemplateCompilationException extends Exception {

	private static final long serialVersionUID = -7549972120802263777L;

	public TemplateCompilationException(String message) {
		super(message);
	}
}
