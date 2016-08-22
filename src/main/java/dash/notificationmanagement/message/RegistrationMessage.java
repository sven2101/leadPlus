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

package dash.notificationmanagement.message;

import org.springframework.context.annotation.Configuration;

import dash.notificationmanagement.business.IMessage;
import dash.usermanagement.domain.User;

@Configuration
public class RegistrationMessage implements IMessage {

	private User recipient;
	private String subject;
	private String content;
	private String message;

	public RegistrationMessage() {
	}

	public RegistrationMessage(User recipient) {
		this.recipient = recipient;
		this.subject = "Registration";
		this.content = "Test";
		this.message = "You registered successfully";
	}

	@Override
	public String getSubject() {
		return this.subject;
	}

	@Override
	public String getContent() {
		return this.content;
	}

	@Override
	public String getMessage() {
		return this.message;
	}

	@Override
	public User getRecipient() {
		return this.recipient;
	}
}
