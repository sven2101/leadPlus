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

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.common.AbstractWorkflow;
import dash.fileuploadmanagement.domain.FileUpload;

@Entity
public class Offer extends AbstractWorkflow {

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = true, columnDefinition = "timestamptz")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
	private Calendar deliveryDate;

	private double offerPrice;

	@OneToOne
	private FileUpload offer;

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

	public FileUpload getOffer() {
		return offer;
	}

	public void setOffer(FileUpload offer) {
		this.offer = offer;
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
