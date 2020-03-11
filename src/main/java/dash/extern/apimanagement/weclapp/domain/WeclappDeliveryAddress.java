package dash.extern.apimanagement.weclapp.domain;

import dash.customermanagement.domain.Customer;

public class WeclappDeliveryAddress extends WeclappAddress {

	private String street1;
	private String state;
	private String city;
	private String invoiceAddress;
	private String deliveryAddress;

	public WeclappDeliveryAddress(Customer customer) {
		super(customer);
		this.street1 = customer.getDeliveryAddress().getStreet();
		this.state = customer.getDeliveryAddress().getState();
		this.city = customer.getDeliveryAddress().getCity();
		this.invoiceAddress = "false";
		this.deliveryAddress = "true";
	}

	public String getInvoiceAddress() {
		return invoiceAddress;
	}

	public void setInvoiceAddress(String invoiceAddress) {
		this.invoiceAddress = invoiceAddress;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public String getStreet1() {
		return street1;
	}

	public void setStreet1(String street1) {
		this.street1 = street1;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

}
