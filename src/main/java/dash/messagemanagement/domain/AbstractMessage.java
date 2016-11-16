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
package dash.messagemanagement.domain;

import java.util.List;

import dash.attachmentmanagement.domain.Attachment;
import dash.notificationmanagement.domain.NotificationType;

public abstract class AbstractMessage {

	protected String recipient;
	protected String subject;
	protected String content;
	protected List<Attachment> attachments;
	protected NotificationType notificationType;

	public AbstractMessage(String recipient, String subject, String content, List<Attachment> attachments, NotificationType notificationType) {
		this.recipient = recipient;
		this.subject = subject;
		this.content = content;
		this.attachments = attachments;
		this.notificationType = notificationType;
	}

	public String getRecipient() {
		return recipient;
	}

	public String getSubject() {
		return subject;
	}

	public String getContent() {
		return content;
	}

	public List<Attachment> getAttachments() {
		return attachments;
	}

	public NotificationType getNotificationType() {
		return notificationType;
	}

	public void setNotificationType(NotificationType notificationType) {
		this.notificationType = notificationType;
	}
}
