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

package dash.processmanagement.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import dash.commentmanagement.domain.Comment;
import dash.common.AbstractWorkflow;
import dash.leadmanagement.domain.Lead;
import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;
import dash.offermanagement.domain.Offer;
import dash.salemanagement.domain.Sale;
import dash.sourcemanagement.domain.Source;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.domain.User;

@Entity
@SQLDelete(sql = "UPDATE process SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "process")
public class Process {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "process_auto_gen")
	@SequenceGenerator(name = "process_auto_gen", sequenceName = "process_id_seq", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "deleted", nullable = false)
	private boolean deleted;

	@OneToOne(cascade = { CascadeType.ALL }, orphanRemoval = true)
	@JoinColumn(name = "lead_fk", nullable = true)
	@Where(clause = "deleted <> '1'")
	private Lead lead;

	@OneToOne(cascade = { CascadeType.ALL }, orphanRemoval = true)
	@JoinColumn(name = "offer_fk", nullable = true)
	@Where(clause = "deleted <> '1'")
	private Offer offer;

	@OneToOne(cascade = { CascadeType.ALL }, orphanRemoval = true)
	@JoinColumn(name = "sale_fk", nullable = true)
	@Where(clause = "deleted <> '1'")
	private Sale sale;

	@OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, mappedBy = "process", fetch = FetchType.LAZY)
	@Where(clause = "deleted <> '1'")
	@JsonManagedReference("process-comments")
	private Set<Comment> comments;

	@Enumerated(EnumType.STRING)
	@NotNull
	@Column(name = "status", length = 255)
	private Status status;

	@OneToOne
	@JoinColumn(name = "processor_fk", nullable = true)
	@Where(clause = "deleted <> '1'")
	private User processor;

	@OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, mappedBy = "process", fetch = FetchType.LAZY)
	@Where(clause = "deleted <> '1'")
	@JsonManagedReference("process-notifications")
	private Set<Notification> notifications;

	@ManyToOne
	@JoinColumn(name = "source_fk", nullable = true)
	@Where(clause = "deleted <> '1'")
	private Source source;

	@OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, mappedBy = "process", fetch = FetchType.LAZY)
	@Where(clause = "deleted <> '1'")
	@JsonManagedReference("process-formerProcessors")
	private Set<Processor> formerProcessors;

	public Process(Lead lead) {
		this.lead = lead;
		this.offer = null;
		this.sale = null;
		this.status = Status.OPEN;
		this.processor = null;
	}

	public int getFollowUpAmount() {
		if (getNotifications() == null) {
			return 0;
		}
		int amount = 0;
		for (Notification notification : getNotifications()) {
			if (notification.getNotificationType() == NotificationType.FOLLOWUP) {
				amount++;
			}
		}
		return amount;
	}

	public Process() {
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

	public Lead getLead() {
		return lead;
	}

	public void setLead(Lead lead) {
		this.lead = lead;
	}

	public Offer getOffer() {
		return offer;
	}

	public void setOffer(Offer offer) {
		this.offer = offer;
	}

	public Sale getSale() {
		return sale;
	}

	public void setSale(Sale sale) {
		this.sale = sale;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public User getProcessor() {
		return processor;
	}

	public void setProcessor(User processor) {
		this.processor = processor;
	}

	public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(Set<Comment> comments) {
		if (comments == null) {
			this.comments = new HashSet<>();
			return;
		}
		this.comments = comments;
	}

	public Set<Notification> getNotifications() {
		return notifications;
	}

	public void setNotifications(Set<Notification> notifications) {
		if (notifications == null) {
			this.notifications = new HashSet<>();
			return;
		}
		this.notifications = notifications;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Source getSource() {
		return source;
	}

	public void setSource(Source source) {
		this.source = source;
	}

	public Set<Processor> getFormerProcessors() {
		return formerProcessors;
	}

	public void setFormerProcessors(Set<Processor> formerProcessors) {
		this.formerProcessors = formerProcessors;
	}

	@JsonIgnore
	public AbstractWorkflow getWorkflowUnitBasedOnStatus() {
		if (status == Status.OPEN || status == Status.INCONTACT) {
			return lead;
		} else if (status == Status.OFFER || status == Status.FOLLOWUP) {
			return offer;
		} else if (status == Status.DONE || status == Status.SALE) {
			return sale;
		}
		if (offer == null) {
			return lead;
		}
		if (sale == null) {
			return offer;
		}
		return sale;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((comments == null) ? 0 : comments.hashCode());
		result = prime * result + (deleted ? 1231 : 1237);
		result = prime * result + ((formerProcessors == null) ? 0 : formerProcessors.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((lead == null) ? 0 : lead.hashCode());
		result = prime * result + ((notifications == null) ? 0 : notifications.hashCode());
		result = prime * result + ((offer == null) ? 0 : offer.hashCode());
		result = prime * result + ((processor == null) ? 0 : processor.hashCode());
		result = prime * result + ((sale == null) ? 0 : sale.hashCode());
		result = prime * result + ((source == null) ? 0 : source.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
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
		Process other = (Process) obj;
		if (comments == null) {
			if (other.comments != null)
				return false;
		} else if (!comments.equals(other.comments))
			return false;
		if (deleted != other.deleted)
			return false;
		if (formerProcessors == null) {
			if (other.formerProcessors != null)
				return false;
		} else if (!formerProcessors.equals(other.formerProcessors))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (lead == null) {
			if (other.lead != null)
				return false;
		} else if (!lead.equals(other.lead))
			return false;
		if (notifications == null) {
			if (other.notifications != null)
				return false;
		} else if (!notifications.equals(other.notifications))
			return false;
		if (offer == null) {
			if (other.offer != null)
				return false;
		} else if (!offer.equals(other.offer))
			return false;
		if (processor == null) {
			if (other.processor != null)
				return false;
		} else if (!processor.equals(other.processor))
			return false;
		if (sale == null) {
			if (other.sale != null)
				return false;
		} else if (!sale.equals(other.sale))
			return false;
		if (source == null) {
			if (other.source != null)
				return false;
		} else if (!source.equals(other.source))
			return false;
		if (status != other.status)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Process [id=" + id + ", deleted=" + deleted + ", lead=" + lead + ", offer=" + offer + ", sale=" + sale
				+ ", comments=" + comments + ", status=" + status + ", processor=" + processor + ", notifications="
				+ notifications + ", source=" + source + "]";
	}

}
