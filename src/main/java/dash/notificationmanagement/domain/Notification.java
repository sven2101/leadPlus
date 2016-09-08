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
package dash.notificationmanagement.domain;

import dash.filemanagement.domain.File;

public class Notification {

	private String recipient;
	private String subject;
	private String content;
	private File attachement;

	public Notification(String recipient, String subject, String content, File attachement) {
		this.recipient = recipient;
		this.subject = subject;
		this.content = content;
		this.attachement = attachement;
	}

	public String getRecipient() {
		return recipient;
	}

	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public File getAttachement() {
		return attachement;
	}

	public void setAttachement(File attachement) {
		this.attachement = attachement;
	}

	@Override
	public String toString() {
		return "Notification [recipient=" + recipient + ", subject=" + subject + ", content=" + content + ", attachement=" + attachement + "]";
	}

}
