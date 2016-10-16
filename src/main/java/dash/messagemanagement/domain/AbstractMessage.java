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

import dash.fileuploadmanagement.domain.FileUpload;

public abstract class AbstractMessage {

	protected String recipient;
	protected String subject;
	protected String content;
	protected FileUpload attachment;

	public AbstractMessage(String recipient, String subject, String content, FileUpload attachment) {
		this.recipient = recipient;
		this.subject = subject;
		this.content = content;
		this.attachment = attachment;
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

	public FileUpload getAttachment() {
		return attachment;
	}

}
