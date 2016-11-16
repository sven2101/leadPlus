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

package dash.usermanagement.domain;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dash.fileuploadmanagement.domain.FileUpload;
import dash.usermanagement.settings.language.Language;

@Entity
@Table(name = "\"user\"")
public class User implements UserDetails, Principal {

	private static final long serialVersionUID = 3125258392087209376L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_auto_gen")
	@SequenceGenerator(name = "user_auto_gen", sequenceName = "user_id_seq", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@NotNull
	@Size(max = 100)
	@Column(name = "username", length = 30, nullable = false)
	private String username;

	@NotNull
	@Size(max = 50)
	@Column(name = "firstname", length = 50, nullable = false)
	private String firstname;

	@Size(max = 50)
	@Column(name = "phone", length = 50, nullable = true)
	private String phone;

	@Size(max = 50)
	@Column(name = "skype", length = 50, nullable = true)
	private String skype;

	@Size(max = 50)
	@Column(name = "fax", length = 50, nullable = true)
	private String fax;

	@Size(max = 100)
	@Column(name = "job", length = 50, nullable = true)
	private String job;

	@NotNull
	@Size(max = 50)
	@Column(name = "lastname", unique = true, length = 50, nullable = false)
	private String lastname;

	@NotNull
	@Pattern(regexp = "^(.+)@(.+)$")
	@Size(max = 100)
	@Column(name = "email", unique = true, length = 50, nullable = false)
	private String email;

	@JsonIgnore
	@Size(max = 60)
	@Column(name = "password", length = 60, nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	@NotNull
	@Column(name = "role", length = 255, nullable = false)
	private Role role;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "picture_fk")
	private FileUpload picture;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "thumbnail_fk")
	private FileUpload thumbnail;

	@Enumerated(EnumType.STRING)
	@NotNull
	@Column(name = "language", length = 50, nullable = false)
	private Language language;

	@NotNull
	@Column(name = "enabled", nullable = false)
	private boolean enabled;
	
	@NotNull
	@Digits(integer = 4, fraction = 2)
	@Column(name = "default_vat", nullable = false)
	private Double default_vat;

	public User() {
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Long getId() {
		return this.id;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
		this.username = email;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public FileUpload getPicture() {
		return picture;
	}

	public void setProfilPicture(FileUpload picture) {
		this.picture = picture;
	}

	public Language getLanguage() {
		return language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	public boolean getEnabled() {
		return this.enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getSkype() {
		return skype;
	}

	public void setSkype(String skype) {
		this.skype = skype;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getJob() {
		return job;
	}

	public void setJob(String job) {
		this.job = job;
	}

	public void setPicture(FileUpload picture) {
		this.picture = picture;
	}

	public FileUpload getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(FileUpload thumbnail) {
		this.thumbnail = thumbnail;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	

	public Double getDefault_vat() {
		return default_vat;
	}

	public void setDefault_vat(Double default_vat) {
		this.default_vat = default_vat;
	}

	@Override
	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {
		final List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		grantedAuthorities.add(new SimpleGrantedAuthority(String.valueOf(getRole())));
		return grantedAuthorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((default_vat == null) ? 0 : default_vat.hashCode());
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + (enabled ? 1231 : 1237);
		result = prime * result + ((fax == null) ? 0 : fax.hashCode());
		result = prime * result + ((firstname == null) ? 0 : firstname.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((job == null) ? 0 : job.hashCode());
		result = prime * result + ((language == null) ? 0 : language.hashCode());
		result = prime * result + ((lastname == null) ? 0 : lastname.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((phone == null) ? 0 : phone.hashCode());
		result = prime * result + ((picture == null) ? 0 : picture.hashCode());
		result = prime * result + ((role == null) ? 0 : role.hashCode());
		result = prime * result + ((skype == null) ? 0 : skype.hashCode());
		result = prime * result + ((thumbnail == null) ? 0 : thumbnail.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
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
		User other = (User) obj;
		if (default_vat == null) {
			if (other.default_vat != null)
				return false;
		} else if (!default_vat.equals(other.default_vat))
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (enabled != other.enabled)
			return false;
		if (fax == null) {
			if (other.fax != null)
				return false;
		} else if (!fax.equals(other.fax))
			return false;
		if (firstname == null) {
			if (other.firstname != null)
				return false;
		} else if (!firstname.equals(other.firstname))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (job == null) {
			if (other.job != null)
				return false;
		} else if (!job.equals(other.job))
			return false;
		if (language != other.language)
			return false;
		if (lastname == null) {
			if (other.lastname != null)
				return false;
		} else if (!lastname.equals(other.lastname))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (phone == null) {
			if (other.phone != null)
				return false;
		} else if (!phone.equals(other.phone))
			return false;
		if (picture == null) {
			if (other.picture != null)
				return false;
		} else if (!picture.equals(other.picture))
			return false;
		if (role != other.role)
			return false;
		if (skype == null) {
			if (other.skype != null)
				return false;
		} else if (!skype.equals(other.skype))
			return false;
		if (thumbnail == null) {
			if (other.thumbnail != null)
				return false;
		} else if (!thumbnail.equals(other.thumbnail))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", firstname=" + firstname + ", phone=" + phone
				+ ", skype=" + skype + ", fax=" + fax + ", job=" + job + ", lastname=" + lastname + ", email=" + email
				+ ", password=" + password + ", role=" + role + ", picture=" + picture + ", thumbnail=" + thumbnail
				+ ", language=" + language + ", enabled=" + enabled + ", default_vat=" + default_vat + "]";
	}

	@Override
	public String getName() {
		return this.email;
	}

}
