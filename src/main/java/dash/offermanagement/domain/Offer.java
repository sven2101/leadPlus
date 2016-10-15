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
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.common.AbstractWorkflow;
import dash.notificationmanagement.domain.Notification;

@Entity
@SQLDelete(sql = "UPDATE offer SET deleted = '1'WHERE id = ?")
@Where(clause = "deleted <> '1'")
public class Offer extends AbstractWorkflow {

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deliverydate", nullable = true)
	private Calendar deliveryDate;

	@NotNull
	@Column(name = "offerprice", nullable = false)
	private double offerPrice;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "notification_id", nullable = true)
	@Where(clause = "deleted <> '1'")
	private Notification notification;

	public Offer() {

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

	public Notification getNotification() {
		return notification;
	}

	public void setNotification(Notification notification) {
		this.notification = notification;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((deliveryDate == null) ? 0 : deliveryDate.hashCode());
		long temp;
		temp = Double.doubleToLongBits(offerPrice);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		Offer other = (Offer) obj;
		if (deliveryDate == null) {
			if (other.deliveryDate != null)
				return false;
		} else if (!deliveryDate.equals(other.deliveryDate))
			return false;
		if (Double.doubleToLongBits(offerPrice) != Double.doubleToLongBits(other.offerPrice))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Offer [deliveryDate=" + deliveryDate + ", offerPrice=" + offerPrice + "]";
	}

}
