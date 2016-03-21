package dash.exceptions;

public class TitleNotFoundException extends RuntimeException {

    /**
     * 
     */
    private static final long serialVersionUID = 5520905786207281118L;

    public TitleNotFoundException(String message){
	super(message);
    }
}
