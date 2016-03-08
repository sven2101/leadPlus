package dash.notificationmanagement;

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
    }

    public String getSubject(){ return "Registration"; }

    public String getContent(){
        return "Test";
    }

    public String getMessage(){
        return "Registration";
    }

    public User getRecipient(){
        return this.recipient;
    }
}
