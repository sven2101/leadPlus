package dash.common;

public class FailedToEncryptCipherTextException extends Exception {

	private static final long serialVersionUID = 6721658675189687192L;

	public FailedToEncryptCipherTextException(String message, StackTraceElement[] stackTraceElements) {
		super(message);
		super.setStackTrace(stackTraceElements);
	}

}
