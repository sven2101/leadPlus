package dash.notificationmanagement.business;

public class InvalidSmtpServerException extends Exception {

	private static final long serialVersionUID = 4545536061060598365L;

	public InvalidSmtpServerException(String message) {
		super(message);
	}
}
