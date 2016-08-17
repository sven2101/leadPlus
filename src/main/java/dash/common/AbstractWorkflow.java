package dash.common;

import java.util.Calendar;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.customermanagement.domain.Customer;
import dash.processmanagement.request.Request;
import dash.productmanagement.domain.OrderPosition;
import dash.productmanagement.domain.Product;
import dash.vendormanagement.domain.Vendor;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class AbstractWorkflow implements Request {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private long id;

	@OneToOne
	@JoinColumn(name = "customer_fk", nullable = true)
	private Customer customer;

	private String deliveryAddress;

	@OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, mappedBy = "workflow", fetch = FetchType.LAZY)
	private List<OrderPosition> orderPositions;

	@OneToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "container_fk")
	private Product container;

	private int containerAmount;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = true, columnDefinition = "timestamp")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
	private Calendar timestamp;

	@OneToOne(cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "vendor_fk", nullable = true)
	private Vendor vendor;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<OrderPosition> getOrderPositions() {
		return orderPositions;
	}

	public void setOrderPositions(List<OrderPosition> orderPositions) {
		this.orderPositions = orderPositions;
	}

	public Product getContainer() {
		return container;
	}

	public void setContainer(Product container) {
		this.container = container;
	}

	public int getContainerAmount() {
		return containerAmount;
	}

	public void setContainerAmount(int containerAmount) {
		this.containerAmount = containerAmount;
	}

	public Calendar getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Calendar timestamp) {
		this.timestamp = timestamp;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public double getPrice() {
		int sum = 0;
		for (int i = 0; i < this.orderPositions.size(); i++) {
			OrderPosition temp = this.orderPositions.get(i);
			if (temp != null && temp.getProduct() != null) {
				sum += temp.getAmount() * temp.getProduct().getPriceNetto();
			}
		}
		return sum;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((container == null) ? 0 : container.hashCode());
		result = prime * result + containerAmount;
		result = prime * result + ((customer == null) ? 0 : customer.hashCode());
		result = prime * result + ((deliveryAddress == null) ? 0 : deliveryAddress.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
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
		AbstractWorkflow other = (AbstractWorkflow) obj;
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
		if (deliveryAddress == null) {
			if (other.deliveryAddress != null)
				return false;
		} else if (!deliveryAddress.equals(other.deliveryAddress))
			return false;
		if (id != other.id)
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
		return "AbstractWorkflow [id=" + id + ", customer=" + customer + ", deliveryAddress=" + deliveryAddress
				+ ", orderPositions=" + orderPositions + ", container=" + container + ", containerAmount="
				+ containerAmount + ", timestamp=" + timestamp + ", vendor=" + vendor + "]";
	}

}
