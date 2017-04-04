package dash.extern.apimanagement.weclapp.domain;

import dash.customermanagement.domain.Customer;

public abstract class WeclappAddress {

	private String company;
	private String firstName;
	private String lastName;
	private String countryCode;

	public WeclappAddress(Customer customer) {
		this.company = customer.getCompany();
		this.firstName = customer.getFirstname();
		this.lastName = customer.getLastname();
		this.countryCode = "DE";
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
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

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

}
