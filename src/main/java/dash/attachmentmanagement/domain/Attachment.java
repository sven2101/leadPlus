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

package dash.attachmentmanagement.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import dash.fileuploadmanagement.domain.FileUpload;
import dash.notificationmanagement.domain.Notification;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "Attachment", description = "Attachment")
@Entity
@SQLDelete(sql = "UPDATE attachment SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "attachment")
public class Attachment {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "attachment_auto_gen")
	@SequenceGenerator(name = "attachment_auto_gen", sequenceName = "attachment_id_seq", allocationSize = 1)
	@ApiModelProperty(hidden = true)
	@Column(name = "id", nullable = false)
	private Long id;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "deleted", nullable = false)
	private boolean deleted;

	@ManyToOne
	@JoinColumn(name = "fileUpload_fk", nullable = false)
	@Where(clause = "deleted <> '1'")
	private FileUpload fileUpload;

	@ManyToOne
	@JoinColumn(name = "notification_fk", nullable = false)
	@Where(clause = "deleted <> '1'")
	private Notification notification;

	public Attachment() {
	}

	public Long getId() {
		return id;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public FileUpload getFileUpload() {
		return fileUpload;
	}

	public void setFileUpload(FileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public Notification getNotification() {
		return notification;
	}

	public void setNotification(Notification notification) {
		this.notification = notification;
	}

}
