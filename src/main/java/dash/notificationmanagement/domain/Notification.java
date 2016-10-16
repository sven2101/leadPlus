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

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dash.fileuploadmanagement.domain.FileUpload;
import dash.processmanagement.domain.Process;
import io.swagger.annotations.ApiModelProperty;

@Entity
@SQLDelete(sql = "UPDATE notification SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "notification")
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_auto_gen")
	@SequenceGenerator(name = "notification_auto_gen", sequenceName = "notification_id_seq")
	@Column(name = "id", nullable = false)
	private Long id;

	@NotNull
	@Size(max = 255)
	@Column(name = "recipient", length = 255, nullable = false)
	private String recipient;

	@NotNull
	@Size(max = 255)
	@Column(name = "subject", length = 255, nullable = false)
	private String subject;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "deleted", nullable = false)
	private boolean deleted;

	@NotNull
	@Size(max = 30000)
	@Column(name = "content", length = 30000, nullable = false)
	private String content;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "attachment_id", nullable = true)
	private FileUpload attachment;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "process_id", nullable = false)
	@Where(clause = "deleted <> '1'")
	private Process process;

	@Enumerated(EnumType.STRING)
	@NotNull
	@Column(name = "notificationtype", length = 255)
	private NotificationType notificationType;

	public Notification() {
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public Long getId() {
		return id;
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

	public FileUpload getAttachment() {
		return attachment;
	}

	public void setAttachment(FileUpload attachment) {
		this.attachment = attachment;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public NotificationType getNotificationType() {
		return notificationType;
	}

	public void setNotificationType(NotificationType notificationType) {
		this.notificationType = notificationType;
	}

	public Process getProcess() {
		return process;
	}

	public void setProcess(Process process) {
		this.process = process;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((attachment == null) ? 0 : attachment.hashCode());
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result + (deleted ? 1231 : 1237);
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((notificationType == null) ? 0 : notificationType.hashCode());
		result = prime * result + ((recipient == null) ? 0 : recipient.hashCode());
		result = prime * result + ((subject == null) ? 0 : subject.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Notification other = (Notification) obj;
		if (attachment == null) {
			if (other.attachment != null)
				return false;
		} else if (!attachment.equals(other.attachment))
			return false;
		if (content == null) {
			if (other.content != null)
				return false;
		} else if (!content.equals(other.content))
			return false;
		if (deleted != other.deleted)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (notificationType != other.notificationType)
			return false;
		if (recipient == null) {
			if (other.recipient != null)
				return false;
		} else if (!recipient.equals(other.recipient))
			return false;
		if (subject == null) {
			if (other.subject != null)
				return false;
		} else if (!subject.equals(other.subject))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Notification [id=" + id + ", recipient=" + recipient + ", subject=" + subject + ", deleted=" + deleted
				+ ", content=" + content + ", attachment=" + attachment + ", notificationType=" + notificationType
				+ "]";
	}

}
