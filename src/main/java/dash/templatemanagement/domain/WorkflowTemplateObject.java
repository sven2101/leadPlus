package dash.templatemanagement.domain;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.common.HtmlCleaner;
import dash.customermanagement.domain.Customer;
import dash.productmanagement.domain.OrderPosition;
import dash.vendormanagement.domain.Vendor;

public class WorkflowTemplateObject {

	private Long id;

	private Customer customer;

	private String deliveryAddress;

	private boolean deleted;

	private double deliveryCosts;

	private List<OrderPosition> orderPositions;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm:ss:SSS")
	private Calendar timestamp;

	private Vendor vendor;

	private String message;

	private Calendar deliveryDate;

	private Double netPrice;

	private Double vat;

	private Double saleTurnover;

	private Double saleProfit;

	private Double saleCost;

	private String invoiceNumber;

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

	public WorkflowTemplateObject() {
	}

	public Double getNetPrice() {
		return netPrice;
	}

	public void setNetPrice(Double price) {
		this.netPrice = price;
	}

	public Calendar getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Calendar deliveryDate) {
		this.deliveryDate = deliveryDate;
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
		result = prime * result + ((deliveryDate == null) ? 0 : deliveryDate.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((message == null) ? 0 : message.hashCode());
		result = prime * result + ((netPrice == null) ? 0 : netPrice.hashCode());
		result = prime * result + ((orderPositions == null) ? 0 : orderPositions.hashCode());
		result = prime * result + ((timestamp == null) ? 0 : timestamp.hashCode());
		result = prime * result + ((vat == null) ? 0 : vat.hashCode());
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
		WorkflowTemplateObject other = (WorkflowTemplateObject) obj;
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
		if (deliveryDate == null) {
			if (other.deliveryDate != null)
				return false;
		} else if (!deliveryDate.equals(other.deliveryDate))
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
		if (netPrice == null) {
			if (other.netPrice != null)
				return false;
		} else if (!netPrice.equals(other.netPrice))
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
		if (vat == null) {
			if (other.vat != null)
				return false;
		} else if (!vat.equals(other.vat))
			return false;
		if (vendor == null) {
			if (other.vendor != null)
				return false;
		} else if (!vendor.equals(other.vendor))
			return false;
		return true;
	}

}
