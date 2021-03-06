package dash.extern.apimanagement.weclapp.domain;

import java.util.ArrayList;
import java.util.List;

import dash.customermanagement.domain.Customer;
import dash.customermanagement.domain.Title;

public class WeclappCustomer {

	private List<WeclappAddress> addresses;
	private String currencyId;
	private String currencyName;
	private String email;
	private String firstName;
	private String lastName;
	private String fax;
	private String mobilePhone1;
	private String phone;
	private String salutation;
	private String company;
	private String partyType;
	private List<WeclappContact> contacts;

	public WeclappCustomer(Customer customer, WeclappDeliveryAddress weclappDeliveryAddress,
			WeclappInvoiceAddress weclappInvoiceAddress) {
		this.currencyId = "248";
		this.currencyName = "EUR";
		this.firstName = customer.getFirstname();
		this.lastName = customer.getLastname();
		this.addresses = new ArrayList<>();
		if (weclappDeliveryAddress != null)
			this.addresses.add(weclappDeliveryAddress);
		if (weclappInvoiceAddress != null)
			this.addresses.add(weclappInvoiceAddress);

		if (customer.getTitle() != null && customer.getTitle().equals(Title.MS))
			this.salutation = "MR";
		if (customer.getTitle() != null && customer.getTitle().equals(Title.MS))
			this.salutation = "MRS";

		if (customer.getCompany() != null) {
			this.company = customer.getCompany();
			this.partyType = "ORGANIZATION";
		} else {
			this.partyType = "PERSON";
			this.company = "Privat";
		}

		this.contacts = new ArrayList<>();
		WeclappContact contact = new WeclappContact();
		contact.setAddresses(this.addresses);
		contact.setCompany(customer.getCompany() == null ? "Privat" : customer.getCompany());
		contact.setFirstName(customer.getFirstname());
		contact.setLastName(customer.getLastname());
		contact.setFax(customer.getFax());
		contact.setMobilePhone1(customer.getMobile());
		contact.setPhone(customer.getPhone());
		contact.setEmail(customer.getEmail());
		contact.setPartyType("PERSON");
		this.contacts.add(contact);
	}

	public List<WeclappAddress> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<WeclappAddress> addresses) {
		this.addresses = addresses;
	}

	public String getCurrencyId() {
		return currencyId;
	}

	public void setCurrencyId(String currencyId) {
		this.currencyId = currencyId;
	}

	public String getCurrencyName() {
		return currencyName;
	}

	public void setCurrencyName(String currencyName) {
		this.currencyName = currencyName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getMobilePhone1() {
		return mobilePhone1;
	}

	public void setMobilePhone1(String mobilePhone1) {
		this.mobilePhone1 = mobilePhone1;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getSalutation() {
		return salutation;
	}

	public void setSalutation(String salutation) {
		this.salutation = salutation;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getPartyType() {
		return partyType;
	}

	public void setPartyType(String partyType) {
		this.partyType = partyType;
	}

	public List<WeclappContact> getContacts() {
		return contacts;
	}

	public void setContacts(List<WeclappContact> contacts) {
		this.contacts = contacts;
	}

}
