
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

	public Double getNetPricesAndDelivery() {
		if (this.netPrice != null) {
			return this.netPrice + this.getDeliveryCosts();
		}
		return null;
	}

	public Double getGrossPrice() {
		if (this.getNetPricesAndDelivery() != null && this.vat != null) {
			return (double) Math.round((this.getNetPricesAndDelivery() * (1 + this.vat / 100)) * 100) / 100;
		}
		return null;
	}

	public Double getGrossPriceSkonto() {
		if (this.getGrossPrice() != null && this.getSkontoPrice() != null) {
			return this.getGrossPrice() - this.getSkontoPrice();
		}
		return null;
	}

	public Double getSkontoPrice() {
		if (this.getGrossPrice() != null && this.getSkonto() != null) {
			return (double) Math.round((this.getGrossPrice() * (this.getSkonto() / 100)) * 100) / 100;
		}
		return null;
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
