package dash.notificationmanagement.message;

import dash.notificationmanagement.IMessage;
import dash.usermanagement.User;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Andreas on 17.01.2016.
 */
@Configuration
public class RegistrationMessage implements IMessage {

    private User recipient;
    private String subject;
    private String content;
    private String message;

    public RegistrationMessage(){
    }

    public RegistrationMessage(User recipient){
        this.recipient = recipient;
        this.subject = "Registration";
        this.content = "Test";
        this.message = "You registered successfully";
    }

    public String getSubject(){ 
    	return this.subject; 
    }

    public String getContent(){
        return this.content;
    }

    public String getMessage(){
        return this.message;
    }

    public User getRecipient(){
        return this.recipient;
    }
}
