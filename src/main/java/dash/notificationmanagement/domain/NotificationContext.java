package dash.notificationmanagement.domain;

import javax.validation.constraints.NotNull;

public class NotificationContext {

	// @NotNull
	private String smtpKey;

	@NotNull
	private Notification notification;

	public String getSmtpKey() {
		return smtpKey;
	}

	public void setSmtpKey(String smtpKey) {
		this.smtpKey = smtpKey;
	}

	public Notification getNotification() {
		return notification;
	}

	public void setNotification(Notification notification) {
		this.notification = notification;
	}

}
