package dash.notificationmanagement;

import dash.usermanagement.User;

/**
 * Created by Andreas on 17.01.2016.
 */
public interface IMessage {

    String getSubject();
    String getMessage();
    String getContent();
    User getRecipient();
}