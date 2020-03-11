
package dash.usermanagement.settings.password;

public class PasswordChange {

	private String newPassword;
	private String oldPassword;
	private String oldSmtpKey;

	public PasswordChange() {
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getOldSmtpKey() {
		return oldSmtpKey;
	}

	public void setOldSmtpKey(String oldSmtpKey) {
		this.oldSmtpKey = oldSmtpKey;
	}

}
