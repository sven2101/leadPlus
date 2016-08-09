package dash.salemanagement.domain;

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

import dash.customermanagement.domain.Customer;
import dash.processmanagement.request.Request;
import dash.productmanagement.domain.Product;
import dash.vendormanagement.domain.Vendor;

@Entity
public class Sale implements Request {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@OneToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "customer_fk")
	private Customer customer;

	@OneToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "container_fk")
	private Product container;

	@OneToOne(cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "vendor_fk")
	private Vendor vendor;

	private int containerAmount;
	private String transport;
	private double saleReturn;
	private double saleProfit;

	@Column(nullable = true, columnDefinition = "timestamptz")
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
	private Calendar timestamp;

	public Sale() {

	}

	public long getId() {
		return this.id;
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
	public Calendar getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Calendar timestamp) {
		this.timestamp = timestamp;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Product getContainer() {
		return this.container;
	}

	public void setContainer(Product container) {
		this.container = container;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((container == null) ? 0 : container.hashCode());
		result = prime * result + containerAmount;
		result = prime * result + ((customer == null) ? 0 : customer.hashCode());
		long temp;
		temp = Double.doubleToLongBits(saleProfit);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(saleReturn);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((timestamp == null) ? 0 : timestamp.hashCode());
		result = prime * result + ((transport == null) ? 0 : transport.hashCode());
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
		Sale other = (Sale) obj;
		if (container == null) {
			if (other.container != null)
				return false;
		} else if (!container.equals(other.container))
			return false;
		if (containerAmount != other.containerAmount)
			return false;
		if (customer == null) {
			if (other.customer != null)
				return false;
		} else if (!customer.equals(other.customer))
			return false;
		if (Double.doubleToLongBits(saleProfit) != Double.doubleToLongBits(other.saleProfit))
			return false;
		if (Double.doubleToLongBits(saleReturn) != Double.doubleToLongBits(other.saleReturn))
			return false;
		if (timestamp == null) {
			if (other.timestamp != null)
				return false;
		} else if (!timestamp.equals(other.timestamp))
			return false;
		if (transport == null) {
			if (other.transport != null)
				return false;
		} else if (!transport.equals(other.transport))
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
		return "Sale [id=" + id + ", customer=" + customer + ", container=" + container + ", vendor=" + vendor
				+ ", containerAmount=" + containerAmount + ", transport=" + transport + ", saleReturn=" + saleReturn
				+ ", saleProfit=" + saleProfit + ", timestamp=" + timestamp + "]";
	}

}
