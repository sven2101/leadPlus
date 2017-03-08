package dash.addressmanagement.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "address")
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "address_auto_gen")
	@SequenceGenerator(name = "address_auto_gen", sequenceName = "address_id_seq", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Size(max = 10)
	@Column(name = "number", nullable = false)
	private String number;

	@Size(max = 255)
	@Column(name = "street", length = 255, nullable = true)
	private String street;

	@Size(max = 255)
	@Column(name = "city", length = 255, nullable = true)
	private String city;

	@Size(max = 255)
	@Column(name = "state", length = 255, nullable = true)
	private String state;

	@Size(max = 255)
	@Column(name = "zip", length = 255, nullable = true)
	private String zip;

	@Size(max = 255)
	@Column(name = "country", length = 255, nullable = true)
	private String country;

	public Address() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}
