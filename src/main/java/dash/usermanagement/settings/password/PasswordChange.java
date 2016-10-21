/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

package dash.usermanagement.settings.password;

public class PasswordChange {

	private String newPassword;
	private String oldPassword;
	private String oldSmtpKey;
	private String newSmtpKey;

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

	public String getNewSmtpKey() {
		return newSmtpKey;
	}

	public void setNewSmtpKey(String newSmtpKey) {
		this.newSmtpKey = newSmtpKey;
	}

}
