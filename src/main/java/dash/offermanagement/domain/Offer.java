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

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import dash.common.AbstractWorkflow;

@Entity
@SQLDelete(sql = "UPDATE offer SET deleted = '1'WHERE id = ?")
@Where(clause = "deleted <> '1'")
public class Offer extends AbstractWorkflow {

	@NotNull
	@Digits(integer = 10, fraction = 4)
	@Column(name = "net_price", nullable = false)
	private Double netPrice;

	@NotNull
	@Digits(integer = 4, fraction = 2)
	@Column(name = "vat", nullable = false)
	private Double vat;

	public Offer() {
	}

	public Double getNetPrice() {
		return netPrice;
	}

	public void setNetPrice(Double price) {
		this.netPrice = price;
	}
	
	public Double getVat() {
		return vat;
	}

	public void setVat(Double vat) {
		this.vat = vat;
	}

	public Double getGrossPrice() {
		return this.netPrice * (1 + this.vat / 100);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((netPrice == null) ? 0 : netPrice.hashCode());
		result = prime * result + ((vat == null) ? 0 : vat.hashCode());
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
		if (netPrice == null) {
			if (other.netPrice != null)
				return false;
		} else if (!netPrice.equals(other.netPrice))
			return false;
		if (vat == null) {
			if (other.vat != null)
				return false;
		} else if (!vat.equals(other.vat))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Offer [netPrice=" + netPrice + ", vat=" + vat + "]";
	}

}
