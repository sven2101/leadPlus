package dash.common;

import java.util.ArrayList;
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.customermanagement.domain.Customer;
import dash.processmanagement.request.Request;
import dash.productmanagement.domain.OrderPosition;
import dash.vendormanagement.domain.Vendor;
import io.swagger.annotations.ApiModelProperty;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class AbstractWorkflow implements Request {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workflow_auto_gen")
	@SequenceGenerator(name = "workflow_auto_gen", sequenceName = "workflow_id_seq", allocationSize = 1)
	@ApiModelProperty(hidden = true)
	@Column(name = "id", nullable = false)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "customer_fk", nullable = true)
	@Where(clause = "deleted <> '1'")
	private Customer customer;

	@Size(max = 255)
	@Column(name = "deliveryaddress", length = 255, nullable = true)
	private String deliveryAddress;

	@NotNull
	@ApiModelProperty(hidden = true)
	@Column(name = "deleted", nullable = false)
	private boolean deleted;

	@NotNull
	@Digits(integer = 10, fraction = 4)
	@Column(name = "deliverycosts", nullable = false)
	private double deliveryCosts;

	@OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, mappedBy = "workflow", fetch = FetchType.LAZY)
	@Where(clause = "deleted <> '1'")
	private List<OrderPosition> orderPositions;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm:ss:SSS")
	@ApiModelProperty(hidden = true)
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "timestamp", nullable = true)
	private Calendar timestamp;

	@ApiModelProperty(hidden = true)
	@OneToOne(cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "vendor_fk", nullable = true)
	@Where(clause = "deleted <> '1'")
	private Vendor vendor;

	@Size(max = 4096)
	@Column(length = 4096, nullable = true)
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = HtmlCleaner.cleanHtml(message);
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public double getDeliveryCosts() {
		return deliveryCosts;
	}

	public void setDeliveryCosts(double deliveryCosts) {
		this.deliveryCosts = deliveryCosts;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public List<OrderPosition> getOrderPositions() {
		return orderPositions;
	}

	public void setOrderPositions(List<OrderPosition> orderPositions) {
		if (orderPositions == null) {
			this.orderPositions = new ArrayList<>();
			return;
		}
		this.orderPositions = orderPositions;
	}

	@Override
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((customer == null) ? 0 : customer.hashCode());
		result = prime * result + (deleted ? 1231 : 1237);
		result = prime * result + ((deliveryAddress == null) ? 0 : deliveryAddress.hashCode());
		long temp;
		temp = Double.doubleToLongBits(deliveryCosts);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		AbstractWorkflow other = (AbstractWorkflow) obj;
		if (customer == null) {
			if (other.customer != null)
				return false;
		} else if (!customer.equals(other.customer))
			return false;
		if (deleted != other.deleted)
			return false;
		if (deliveryAddress == null) {
			if (other.deliveryAddress != null)
				return false;
		} else if (!deliveryAddress.equals(other.deliveryAddress))
			return false;
		if (Double.doubleToLongBits(deliveryCosts) != Double.doubleToLongBits(other.deliveryCosts))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
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
		return "AbstractWorkflow [id=" + id + ", customer=" + customer + ", deliveryAddress=" + deliveryAddress
				+ ", deleted=" + deleted + ", deliveryCosts=" + deliveryCosts + ", orderPositions=" + orderPositions
				+ ", timestamp=" + timestamp + ", vendor=" + vendor + ", message=" + message + "]";
	}

}
