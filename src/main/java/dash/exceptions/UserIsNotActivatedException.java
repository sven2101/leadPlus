package dash.exceptions;

public class UserIsNotActivatedException extends Exception {

    /**
     * 
     */
    private static final long serialVersionUID = 5520905786207281118L;

    public UserIsNotActivatedException(String message){
	super(message);
    }
}
