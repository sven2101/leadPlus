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

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "Recipient", description = "Recipient")
@Entity
@SQLDelete(sql = "UPDATE recipient SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "recipient")
public class Recipient {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recipient_auto_gen")
	@SequenceGenerator(name = "recipient_auto_gen", sequenceName = "recipient_id_seq", allocationSize = 1)
	@ApiModelProperty(hidden = true)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "email", length = 255, nullable = false)
	private String email;

	@ManyToOne
	@JoinColumn(name = "notification_fk", nullable = false)
	@Where(clause = "deleted <> '1'")
	private Notification notification;

	@Enumerated(EnumType.STRING)
	@NotNull
	@Column(name = "recipientType", length = 3, nullable = false)
	private RecipientType recipientType;

	public Recipient() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Notification getNotification() {
		return notification;
	}

	public void setNotification(Notification notification) {
		this.notification = notification;
	}

	public RecipientType getRecipientType() {
		return recipientType;
	}

	public void setRecipientType(RecipientType recipientType) {
		this.recipientType = recipientType;
	}

}
