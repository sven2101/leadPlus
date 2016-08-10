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
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.inquirermanagement.domain.Inquirer;
import dash.processmanagement.request.Request;
import dash.productmanagement.domain.OrderPosition;
import dash.productmanagement.domain.Product;
import dash.vendormanagement.domain.Vendor;

@Entity
public class Lead implements Request {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@OneToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "inquirer_fk", nullable = true)
	private Inquirer inquirer;

	@OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, mappedBy = "lead", fetch = FetchType.EAGER)
	private List<OrderPosition> orderPositions;

	@OneToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "vendor_fk", nullable = true)
	private Vendor vendor;

	@OneToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "container_fk", nullable = true)
	private Product container;

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

	public Product getContainer() {
		return container;
	}

	public void setContainer(Product container) {
		this.container = container;
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
		int sum = 0;
		for (int i = 0; i < this.orderPositions.size(); i++) {
			OrderPosition temp = this.orderPositions.get(i);
			if (temp != null && temp.getProduct() != null) {
				sum += temp.getAmount() * temp.getProduct().getPriceNetto();
			}
		}
		return sum;
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

	public List<OrderPosition> getOrderPositions() {
		return orderPositions;
	}

	public void setOrderPositions(List<OrderPosition> orderPositions) {
		this.orderPositions = orderPositions;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((container == null) ? 0 : container.hashCode());
		result = prime * result + containerAmount;
		result = prime * result + ((destination == null) ? 0 : destination.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((inquirer == null) ? 0 : inquirer.hashCode());
		result = prime * result + ((message == null) ? 0 : message.hashCode());
		result = prime * result + ((orderPositions == null) ? 0 : orderPositions.hashCode());
		result = prime * result + ((timestamp == null) ? 0 : timestamp.hashCode());
		result = prime * result + ((vendor == null) ? 0 : vendor.hashCode());
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
		Lead other = (Lead) obj;
		if (container == null) {
			if (other.container != null)
				return false;
		} else if (!container.equals(other.container))
			return false;
		if (containerAmount != other.containerAmount)
			return false;
		if (destination == null) {
			if (other.destination != null)
				return false;
		} else if (!destination.equals(other.destination))
			return false;
		if (id != other.id)
			return false;
		if (inquirer == null) {
			if (other.inquirer != null)
				return false;
		} else if (!inquirer.equals(other.inquirer))
			return false;
		if (message == null) {
			if (other.message != null)
				return false;
		} else if (!message.equals(other.message))
			return false;
		if (orderPositions == null) {
			if (other.orderPositions != null)
				return false;
		} else if (!orderPositions.equals(other.orderPositions))
			return false;
		if (timestamp == null) {
			if (other.timestamp != null)
				return false;
		} else if (!timestamp.equals(other.timestamp))
			return false;
		if (vendor == null) {
			if (other.vendor != null)
				return false;
		} else if (!vendor.equals(other.vendor))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Lead [id=" + id + ", inquirer=" + inquirer + ", orderPositions=" + orderPositions + ", vendor=" + vendor
				+ ", container=" + container + ", containerAmount=" + containerAmount + ", destination=" + destination
				+ ", timestamp=" + timestamp + ", message=" + message + "]";
	}

}
