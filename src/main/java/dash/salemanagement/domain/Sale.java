package dash.salemanagement.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import dash.common.AbstractWorkflow;

@Entity
@SQLDelete(sql = "UPDATE sale SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "sale")
public class Sale extends AbstractWorkflow {

	@NotNull
	@Digits(integer = 10, fraction = 4)
	@Column(name = "saleturnover", nullable = false)
	private Double saleTurnover;

	@NotNull
	@Digits(integer = 10, fraction = 4)
	@Column(name = "saleprofit", nullable = false)
	private Double saleProfit;

	@NotNull
	@Digits(integer = 10, fraction = 4)
	@Column(name = "salecost", nullable = false)
	private Double saleCost;
	
	@Column(name = "invoicenumber")
	private String invoiceNumber;

	public Sale() {
	}

	public Double getSaleTurnover() {
		return saleTurnover;
	}

	public void setSaleTurnover(Double saleTurnover) {
		this.saleTurnover = saleTurnover;
	}

	public Double getSaleProfit() {
		return saleProfit;
	}

	public void setSaleProfit(Double saleProfit) {
		this.saleProfit = saleProfit;
	}

	public Double getSaleCost() {
		return saleCost;
	}

	public void setSaleCost(Double saleCost) {
		this.saleCost = saleCost;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((invoiceNumber == null) ? 0 : invoiceNumber.hashCode());
		result = prime * result + ((saleCost == null) ? 0 : saleCost.hashCode());
		result = prime * result + ((saleProfit == null) ? 0 : saleProfit.hashCode());
		result = prime * result + ((saleTurnover == null) ? 0 : saleTurnover.hashCode());
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
		Sale other = (Sale) obj;
		if (invoiceNumber == null) {
			if (other.invoiceNumber != null)
				return false;
		} else if (!invoiceNumber.equals(other.invoiceNumber))
			return false;
		if (saleCost == null) {
			if (other.saleCost != null)
				return false;
		} else if (!saleCost.equals(other.saleCost))
			return false;
		if (saleProfit == null) {
			if (other.saleProfit != null)
				return false;
		} else if (!saleProfit.equals(other.saleProfit))
			return false;
		if (saleTurnover == null) {
			if (other.saleTurnover != null)
				return false;
		} else if (!saleTurnover.equals(other.saleTurnover))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Sale [saleTurnover=" + saleTurnover + ", saleProfit=" + saleProfit + ", saleCost=" + saleCost
				+ ", invoiceNumber=" + invoiceNumber + "]";
	}

}
