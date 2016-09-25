package dash.salemanagement.domain;

import javax.persistence.Entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import dash.common.AbstractWorkflow;

@Entity
@SQLDelete(sql = "UPDATE sale SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
public class Sale extends AbstractWorkflow {

	private double saleTurnover;
	private double profit;
	private double cost;

	public Sale() {

	}

	public double getSaleTurnover() {
		return saleTurnover;
	}

	public void setSaleTurnover(double saleTurnover) {
		this.saleTurnover = saleTurnover;
	}

	public double getProfit() {
		return profit;
	}

	public void setProfit(double profit) {
		this.profit = profit;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		long temp;
		temp = Double.doubleToLongBits(profit);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(saleTurnover);
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
		Sale other = (Sale) obj;
		if (Double.doubleToLongBits(profit) != Double.doubleToLongBits(other.profit))
			return false;
		if (Double.doubleToLongBits(saleTurnover) != Double.doubleToLongBits(other.saleTurnover))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Sale [saleTurnover=" + saleTurnover + ", saleProfit=" + profit + "]";
	}

}
