package dash.notificationmanagement;

import dash.usermanagement.User;

import java.util.List;

/**
 * Created by Andreas on 17.01.2016.
 */

public interface INotificationService {

   void sendNotification(IMessage message);
}
