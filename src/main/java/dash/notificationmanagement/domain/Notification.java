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

import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;

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
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import dash.common.HtmlCleaner;
import dash.processmanagement.domain.Process;
import dash.usermanagement.domain.User;
import io.swagger.annotations.ApiModelProperty;

@Entity
@SQLDelete(sql = "UPDATE notification SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "notification")
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_auto_gen")
	@SequenceGenerator(name = "notification_auto_gen", sequenceName = "notification_id_seq", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm:ss:SSS")
	@ApiModelProperty(hidden = true)
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "timestamp", nullable = true)
	private Calendar timestamp;

	@NotNull
	@Size(max = 255)
	@Column(name = "recipients", length = 255, nullable = false)
	private String recipients;

	@Size(max = 255)
	@Column(name = "recipients_cc", length = 255, nullable = false)
	private String recipientsCC;

	@Size(max = 255)
	@Column(name = "recipients_bcc", length = 255, nullable = false)
	private String recipientsBCC;

	@NotNull
	@Size(max = 255)
	@Column(name = "subject", length = 255, nullable = false)
	private String subject;

	@ManyToOne
	@JoinColumn(name = "sender_fk", nullable = false)
	private User sender;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "deleted", nullable = false)
	private boolean deleted;

	@NotNull
	@Size(max = 30000)
	@Column(name = "content", length = 30000, nullable = false)
	private String content;

	@OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, mappedBy = "notification")
	@Where(clause = "deleted <> '1'")
	private Set<Attachment> attachments;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "process_fk", nullable = false)
	private Process process;

	@Enumerated(EnumType.STRING)
	@NotNull
	@Column(name = "notificationtype", length = 255, nullable = false)
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
		this.content = HtmlCleaner.cleanHtml(content);
	}

	public Set<Attachment> getAttachments() {
		return attachments;
	}

	public void setAttachments(Set<Attachment> attachments) {
		if (attachments == null) {
			this.attachments = new HashSet<>();
			return;
		}
		this.attachments = attachments;
	}

	public void addAttachment(Attachment attachment) {
		this.attachments.add(attachment);
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

	public String getRecipientsCC() {
		return recipientsCC;
	}

	public void setRecipientsCC(String recipientsCC) {
		this.recipientsCC = formatEmails(recipientsCC);
	}

	public String getRecipientsBCC() {
		return recipientsBCC;
	}

	public void setRecipientsBCC(String recipientsBCC) {
		this.recipientsBCC = formatEmails(recipientsBCC);
	}

	public String getRecipients() {
		return recipients;
	}

	public void setRecipients(String recipients) {
		this.recipients = formatEmails(recipients);
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public Calendar getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Calendar timestamp) {
		this.timestamp = timestamp;
	}

	public Long getProcessId() {
		return this.process.getId();
	}

	private String formatEmails(String emails) {
		if (emails == null || "".equals(emails)) {
			return null;
		}
		String result = "";
		for (String email : emails.split(",")) {
			if (email.trim().length() > 0) {
				result += email.trim() + ",";
			}
		}
		if ("".equals(result)) {
			return null;
		}
		return result.substring(0, result.length() - 1);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((attachments == null) ? 0 : attachments.hashCode());
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result + (deleted ? 1231 : 1237);
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((notificationType == null) ? 0 : notificationType.hashCode());
		result = prime * result + ((recipients == null) ? 0 : recipients.hashCode());
		result = prime * result + ((recipientsBCC == null) ? 0 : recipientsBCC.hashCode());
		result = prime * result + ((recipientsCC == null) ? 0 : recipientsCC.hashCode());
		result = prime * result + ((sender == null) ? 0 : sender.hashCode());
		result = prime * result + ((subject == null) ? 0 : subject.hashCode());
		result = prime * result + ((timestamp == null) ? 0 : timestamp.hashCode());
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
		if (attachments == null) {
			if (other.attachments != null)
				return false;
		} else if (!attachments.equals(other.attachments))
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
		if (recipients == null) {
			if (other.recipients != null)
				return false;
		} else if (!recipients.equals(other.recipients))
			return false;
		if (recipientsBCC == null) {
			if (other.recipientsBCC != null)
				return false;
		} else if (!recipientsBCC.equals(other.recipientsBCC))
			return false;
		if (recipientsCC == null) {
			if (other.recipientsCC != null)
				return false;
		} else if (!recipientsCC.equals(other.recipientsCC))
			return false;
		if (sender == null) {
			if (other.sender != null)
				return false;
		} else if (!sender.equals(other.sender))
			return false;
		if (subject == null) {
			if (other.subject != null)
				return false;
		} else if (!subject.equals(other.subject))
			return false;
		if (timestamp == null) {
			if (other.timestamp != null)
				return false;
		} else if (!timestamp.equals(other.timestamp))
			return false;
		return true;
	}

}
