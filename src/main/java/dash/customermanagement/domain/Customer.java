/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

package dash.customermanagement.domain;

import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.addressmanagement.domain.Address;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "Customer", description = "Customer")
@Entity
@SQLDelete(sql = "UPDATE customer SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "customer")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_auto_gen")
	@SequenceGenerator(name = "customer_auto_gen", sequenceName = "customer_id_seq", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(name = "title", length = 255, nullable = true)
	private Title title;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "deleted", nullable = false)
	private boolean deleted;

	@NotNull
	@Size(max = 255)
	@Column(name = "firstname", length = 255, nullable = false)
	private String firstname;

	@NotNull
	@Size(max = 255)
	@Column(name = "lastname", length = 255, nullable = false)
	private String lastname;

	@Size(max = 255)
	@Column(name = "company", length = 255, nullable = true)
	private String company;

	@Size(max = 255)
	@Column(name = "email", length = 255, nullable = true, unique = true)
	private String email;

	@Size(max = 255)
	@Column(name = "phone", length = 255, nullable = true)
	private String phone;

	@Size(max = 20)
	@Column(name = "fax", length = 20, nullable = true)
	private String fax;

	@Size(max = 20)
	@Column(name = "mobile", length = 20, nullable = true)
	private String mobile;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "deactivated", nullable = false)
	private boolean deactivated;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "realcustomer", nullable = false)
	private boolean realCustomer;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm:ss:SSS")
	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "timestamp", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar timestamp;

	@ApiModelProperty(hidden = true)
	@Size(max = 255)
	@Column(name = "customernumber")
	private String customerNumber;

	@OneToOne(cascade = { CascadeType.ALL }, orphanRemoval = true)
	@JoinColumn(name = "billing_address_fk", nullable = true)
	private Address billingAddress;
	
	@OneToOne(cascade = { CascadeType.ALL }, orphanRemoval = true)
	@JoinColumn(name = "delivery_address_fk", nullable = true)
	private Address deliveryAddress;


	public Customer() {
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isDeactivated() {
		return deactivated;
	}

	public void setDeactivated(boolean deactivated) {
		this.deactivated = deactivated;
	}

	public Long getId() {
		return id;
	}

	public Title getTitle() {
		return title;
	}

	public void setTitle(Title title) {
		this.title = title;
	}

	@ApiModelProperty(value = "firstname", dataType = "java.lang.String", required = true)
	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	@ApiModelProperty(value = "firstname", dataType = "java.lang.String", required = true)
	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Calendar getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Calendar timestamp) {
		this.timestamp = timestamp;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(String customerNumber) {
		this.customerNumber = customerNumber;
	}

	public boolean isRealCustomer() {
		return realCustomer;
	}

	public void setRealCustomer(boolean realCustomer) {
		this.realCustomer = realCustomer;
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


}
