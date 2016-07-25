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

package dash.offermanagement.domain;

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
import dash.processmanagement.request.Request;
import dash.prospectmanagement.domain.Prospect;
import dash.vendormanagement.domain.Vendor;

@Entity
public class Offer implements Request {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@OneToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "prospect_fk", nullable = true)
	private Prospect prospect;

	@OneToOne
	@JoinColumn(name = "vendor_fk")
	private Vendor vendor;

	@OneToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "container_fk")
	private Container container;

	private int containerAmount;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = true, columnDefinition = "timestamptz")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
	private Calendar timestamp;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = true, columnDefinition = "timestamptz")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
	private Calendar deliveryDate;

	private double offerPrice;
	private String deliveryAddress;

	public Offer() {

	}

	public Offer(Prospect prospect, Vendor vendor, Container container, int containerAmount, Calendar timestamp, double offerPrice, Calendar deliveryDate,
			String deliveryAddress) {
		this.prospect = prospect;
		this.vendor = vendor;
		this.container = container;
		this.containerAmount = containerAmount;
		this.timestamp = timestamp;
		this.offerPrice = offerPrice;
		this.deliveryDate = deliveryDate;
		this.deliveryAddress = deliveryAddress;
	}

	public long getId() {
		return id;
	}

	public Prospect getProspect() {
		return prospect;
	}

	public void setProspect(Prospect prospect) {
		this.prospect = prospect;
	}

	@Override
	public Calendar getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Calendar timestamp) {
		this.timestamp = timestamp;
	}

	public double getOfferPrice() {
		return offerPrice;
	}

	public void setOfferPrice(double price) {
		this.offerPrice = price;
	}

	public Calendar getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Calendar deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public Container getContainer() {
		return this.container;
	}

	public void setContainer(Container container) {
		this.container = container;
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public int getContainerAmount() {
		return this.containerAmount;
	}

	public void setContainerAmount(int containerAmount) {
		this.containerAmount = containerAmount;
	}

}
