package dash.templatemanagement.domain;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.addressmanagement.domain.Address;
import dash.common.HtmlCleaner;
import dash.customermanagement.domain.Customer;
import dash.productmanagement.domain.OrderPosition;
import dash.vendormanagement.domain.Vendor;

public class WorkflowTemplateObject {

	private Long id;

	private Customer customer;

	private String deliveryAddressLine;

	private boolean deleted;

	private double deliveryCosts;

	private String deliveryTerm;

	private String paymentTerm;

	private Double skonto;

	private Address billingAddress;

	private Address deliveryAddress;

	private List<OrderPosition> orderPositions;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm:ss:SSS")
	private Calendar timestamp;

	private Vendor vendor;

	private String message;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
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

	public String getDeliveryDate() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
		if (deliveryDate != null)
			return dateFormat.format(deliveryDate.getTime());
		else
			return null;
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
		return (double) Math.round((this.netPrice * (1 + this.vat / 100)) * 100) / 100;
	}

	public Double getGrossPriceSkonto() {
		return this.getGrossPrice() - this.getSkontoPrice();
	}

	public Double getSkontoPrice() {
		return (double) Math.round((this.getGrossPrice() * (this.skonto / 100)) * 100) / 100;
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

	@Override
	public String toString() {
		return "WorkflowTemplateObject [id=" + id + ", customer=" + customer + ", deliveryAddressLine="
				+ deliveryAddressLine + ", deleted=" + deleted + ", deliveryCosts=" + deliveryCosts + ", deliveryTerm="
				+ deliveryTerm + ", paymentTerm=" + paymentTerm + ", skonto=" + skonto + ", billingAddress="
				+ billingAddress + ", deliveryAddress=" + deliveryAddress + ", orderPositions=" + orderPositions
				+ ", timestamp=" + timestamp + ", vendor=" + vendor + ", message=" + message + ", deliveryDate="
				+ deliveryDate + ", netPrice=" + netPrice + ", vat=" + vat + ", saleTurnover=" + saleTurnover
				+ ", saleProfit=" + saleProfit + ", saleCost=" + saleCost + ", invoiceNumber=" + invoiceNumber + "]";
	}

	public String getDeliveryAddressLine() {
		return deliveryAddressLine;
	}

	public void setDeliveryAddressLine(String deliveryAddressLine) {
		this.deliveryAddressLine = deliveryAddressLine;
	}

	public String getDeliveryTerm() {
		return deliveryTerm;
	}

	public void setDeliveryTerm(String deliveryTerm) {
		this.deliveryTerm = deliveryTerm;
	}

	public String getPaymentTerm() {
		return paymentTerm;
	}

	public void setPaymentTerm(String paymentTerm) {
		this.paymentTerm = paymentTerm;
	}

	public Double getSkonto() {
		return skonto;
	}

	public void setSkonto(Double skonto) {
		this.skonto = skonto;
	}

	public Address getBillingAddress() {
		return billingAddress;
	}

	public void setBillingAddress(Address billingAddress) {
		this.billingAddress = billingAddress;
	}

	public Address getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(Address deliveryAddress) {
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
		result = prime * result + ((billingAddress == null) ? 0 : billingAddress.hashCode());
		result = prime * result + ((customer == null) ? 0 : customer.hashCode());
		result = prime * result + (deleted ? 1231 : 1237);
		result = prime * result + ((deliveryAddress == null) ? 0 : deliveryAddress.hashCode());
		result = prime * result + ((deliveryAddressLine == null) ? 0 : deliveryAddressLine.hashCode());
		long temp;
		temp = Double.doubleToLongBits(deliveryCosts);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((deliveryDate == null) ? 0 : deliveryDate.hashCode());
		result = prime * result + ((deliveryTerm == null) ? 0 : deliveryTerm.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((invoiceNumber == null) ? 0 : invoiceNumber.hashCode());
		result = prime * result + ((message == null) ? 0 : message.hashCode());
		result = prime * result + ((netPrice == null) ? 0 : netPrice.hashCode());
		result = prime * result + ((orderPositions == null) ? 0 : orderPositions.hashCode());
		result = prime * result + ((paymentTerm == null) ? 0 : paymentTerm.hashCode());
		result = prime * result + ((saleCost == null) ? 0 : saleCost.hashCode());
		result = prime * result + ((saleProfit == null) ? 0 : saleProfit.hashCode());
		result = prime * result + ((saleTurnover == null) ? 0 : saleTurnover.hashCode());
		result = prime * result + ((skonto == null) ? 0 : skonto.hashCode());
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
		if (billingAddress == null) {
			if (other.billingAddress != null)
				return false;
		} else if (!billingAddress.equals(other.billingAddress))
			return false;
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
		if (deliveryAddressLine == null) {
			if (other.deliveryAddressLine != null)
				return false;
		} else if (!deliveryAddressLine.equals(other.deliveryAddressLine))
			return false;
		if (Double.doubleToLongBits(deliveryCosts) != Double.doubleToLongBits(other.deliveryCosts))
			return false;
		if (deliveryDate == null) {
			if (other.deliveryDate != null)
				return false;
		} else if (!deliveryDate.equals(other.deliveryDate))
			return false;
		if (deliveryTerm == null) {
			if (other.deliveryTerm != null)
				return false;
		} else if (!deliveryTerm.equals(other.deliveryTerm))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (invoiceNumber == null) {
			if (other.invoiceNumber != null)
				return false;
		} else if (!invoiceNumber.equals(other.invoiceNumber))
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
		if (paymentTerm == null) {
			if (other.paymentTerm != null)
				return false;
		} else if (!paymentTerm.equals(other.paymentTerm))
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
		if (skonto == null) {
			if (other.skonto != null)
				return false;
		} else if (!skonto.equals(other.skonto))
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
