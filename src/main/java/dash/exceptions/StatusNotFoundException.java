package dash.exceptions;

public class StatusNotFoundException extends RuntimeException {

    /**
     * 
     */
    private static final long serialVersionUID = 5520905786207281118L;

    public StatusNotFoundException(String message){
	super(message);
    }
}
