package dash.extern.apimanagement.weclapp.domain;

import java.util.List;

public class WeclappContact {

	private List<WeclappAddress> addresses;
	private String company;
	private String email;
	private String fax;
	private String firstName;
	private String lastName;
	private String mobilePhone1;
	private String phone;
	private String salutation;
	private String partyType;

	public WeclappContact() {

	}

	public List<WeclappAddress> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<WeclappAddress> addresses) {
		this.addresses = addresses;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
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

	public String getPartyType() {
		return partyType;
	}

	public void setPartyType(String partyType) {
		this.partyType = partyType;
	}

}
