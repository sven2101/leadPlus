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

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.salemanagement.domain.Sale;
import dash.usermanagement.domain.User;

@Entity
public class Process {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "lead_fk", nullable = true)
	private Lead lead;

	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "offer_fk", nullable = true)
	private Offer offer;

	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "sale_fk", nullable = true)
	private Sale sale;

	@Enumerated(EnumType.STRING)
	private Status status;

	@OneToOne
	@JoinColumn(name = "processor_fk", nullable = true)
	private User processor;

	public Process() {

	}

	public Process(Lead lead) {
		this.lead = lead;
		this.offer = null;
		this.sale = null;
		this.status = Status.OPEN;
		this.processor = null;
	}

	public Process(Lead lead, Offer offer, Sale sale, Status status, User processor) {
		this.lead = lead;
		this.offer = offer;
		this.sale = sale;
		this.status = status;
		this.processor = processor;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
}
