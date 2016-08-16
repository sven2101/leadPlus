package dash.salemanagement.domain;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import dash.common.AbstractWorkflow;
import dash.customermanagement.domain.Customer;

@Entity
public class Sale extends AbstractWorkflow {

	private String transport;
	private double saleReturn;
	private double saleProfit;

	public Sale() {

	}

	public String getTransport() {
		return transport;
	}

	public void setTransport(String transport) {
		this.transport = transport;
	}

	public double getSaleReturn() {
		return saleReturn;
	}

	public void setSaleReturn(double saleReturn) {
		this.saleReturn = saleReturn;
	}

	public double getSaleProfit() {
		return saleProfit;
	}

	public void setSaleProfit(double saleProfit) {
		this.saleProfit = saleProfit;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();	
		long temp;
		temp = Double.doubleToLongBits(saleProfit);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(saleReturn);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((transport == null) ? 0 : transport.hashCode());
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
		if (Double.doubleToLongBits(saleProfit) != Double.doubleToLongBits(other.saleProfit))
			return false;
		if (Double.doubleToLongBits(saleReturn) != Double.doubleToLongBits(other.saleReturn))
			return false;
		if (transport == null) {
			if (other.transport != null)
				return false;
		} else if (!transport.equals(other.transport))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Sale [transport=" + transport + ", saleReturn=" + saleReturn
				+ ", saleProfit=" + saleProfit + "]";
	}

}
