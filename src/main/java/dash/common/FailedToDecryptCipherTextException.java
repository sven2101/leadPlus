package dash.common;

public class FailedToDecryptCipherTextException extends Exception {

	private static final long serialVersionUID = -8602268267335408386L;

	public FailedToDecryptCipherTextException(String message, StackTraceElement[] stackTraceElements) {
		super(message);
		super.setStackTrace(stackTraceElements);
	}

}
