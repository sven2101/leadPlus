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

package dash.usermanagement.registration.domain;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Registration {

	@NotNull
	@Size(min = 2, max = 30)
	private String username;

	@NotNull
	@Size(min = 2, max = 50)
	private String email;

	@NotNull
	@Size(min = 2, max = 30)
	private String password;

	@NotNull
	@Size(min = 2, max = 30)
	private String password2;

	public Registration() {

	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword2() {
		return password2;
	}

	public void setPassword2(String password2) {
		this.password2 = password2;
	}

	@Override
	public String toString() {
		return "Registration [username=" + username + ", email=" + email + ", password=" + password + ", password2=" + password2 + "]";
	}

}
