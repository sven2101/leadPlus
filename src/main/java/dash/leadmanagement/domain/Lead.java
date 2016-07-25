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

package dash.leadmanagement.domain;

import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.containermanagement.domain.Container;
import dash.inquirermanagement.domain.Inquirer;
import dash.processmanagement.domain.Status;
import dash.processmanagement.request.Request;
import dash.vendormanagement.domain.Vendor;

@Entity
public class Lead implements Request {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@OneToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "inquirer_fk", nullable = true)
	private Inquirer inquirer;

	@OneToOne
	@JoinColumn(name = "vendor_fk")
	private Vendor vendor;

	@OneToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "container_fk")
	private Container container;

	private int containerAmount;
	private String destination;

	@Column(nullable = true, columnDefinition = "timestamptz")
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
	private Calendar timestamp;

	@Column(length = 4096)
	private String message;

	public Lead() {
	}

	public Lead(Inquirer inquirer, Vendor vendor, Container container, int containerAmount, String destination, String message, Status status,
			Calendar timestamp) {
		super();
		this.inquirer = inquirer;
		this.vendor = vendor;
		this.container = container;
		this.containerAmount = containerAmount;
		this.destination = destination;
		this.timestamp = timestamp;
		this.message = message;
	}

	public Long getId() {
		return this.id;
	}

	public Inquirer getInquirer() {
		return inquirer;
	}

	public void setInquirer(Inquirer inquirer) {
		this.inquirer = inquirer;
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public int getContainerAmount() {
		return containerAmount;
	}

	public void setContainerAmount(int containerAmount) {
		this.containerAmount = containerAmount;
	}

	public double getLeadPrice() {
		return this.containerAmount * this.container.getPriceNetto();
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void setTimestamp(Calendar timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public Calendar getTimestamp() {
		return timestamp;
	}

	public Container getContainer() {
		return this.container;
	}

	public void setContainer(Container container) {
		this.container = container;
	}
}
