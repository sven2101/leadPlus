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
package dash.tenantmanagement.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import dash.licensemanangement.domain.License;
import dash.usermanagement.registration.domain.Registration;

@Entity
@Table(name = "tenant", schema = "public")
public class Tenant {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tenant_auto_gen")
	@SequenceGenerator(name = "tenant_auto_gen", sequenceName = "public.tenant_id_seq", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private long id;

	@NotNull
	@Pattern(regexp = "[a-z]*", message = "Invalid Tenant Key")
	@Column(name = "tenantkey", unique = true, length = 50, nullable = false)
	private String tenantKey;

	@Column(name = "description", length = 255)
	private String description;

	@Column(name = "address", length = 255)
	private String address;

	@Column(name = "jwt_token_version", length = 50)
	private String jwtTokenVersion;

	@Column(name = "enabled", nullable = false)
	private boolean enabled;

	@OneToOne(cascade = { CascadeType.ALL }, orphanRemoval = true)
	@JoinColumn(name = "license_fk", nullable = false)
	@Where(clause = "deleted <> '1'")
	private License license;

	@Transient
	@JsonProperty(access = Access.WRITE_ONLY)
	private Registration registration;

	public Tenant() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTenantKey() {
		return tenantKey;
	}

	public void setTenantKey(String tenantKey) {
		this.tenantKey = tenantKey.toLowerCase();
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public License getLicense() {
		return license;
	}

	public void setLicense(License license) {
		this.license = license;
	}

	public Registration getRegistration() {
		return registration;
	}

	public void setRegistration(Registration registration) {
		this.registration = registration;
	}

	public String getJwtTokenVersion() {
		return jwtTokenVersion;
	}

	public void setJwtTokenVersion(String jwtTokenVersion) {
		this.jwtTokenVersion = jwtTokenVersion;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + (enabled ? 1231 : 1237);
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((jwtTokenVersion == null) ? 0 : jwtTokenVersion.hashCode());
		result = prime * result + ((license == null) ? 0 : license.hashCode());
		result = prime * result + ((registration == null) ? 0 : registration.hashCode());
		result = prime * result + ((tenantKey == null) ? 0 : tenantKey.hashCode());
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
		Tenant other = (Tenant) obj;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (enabled != other.enabled)
			return false;
		if (id != other.id)
			return false;
		if (jwtTokenVersion == null) {
			if (other.jwtTokenVersion != null)
				return false;
		} else if (!jwtTokenVersion.equals(other.jwtTokenVersion))
			return false;
		if (license == null) {
			if (other.license != null)
				return false;
		} else if (!license.equals(other.license))
			return false;
		if (registration == null) {
			if (other.registration != null)
				return false;
		} else if (!registration.equals(other.registration))
			return false;
		if (tenantKey == null) {
			if (other.tenantKey != null)
				return false;
		} else if (!tenantKey.equals(other.tenantKey))
			return false;
		return true;
	}

}
