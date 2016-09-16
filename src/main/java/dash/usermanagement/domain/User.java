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

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dash.fileuploadmanagement.domain.FileUpload;
import dash.smtpmanagement.domain.Smtp;
import dash.usermanagement.settings.language.Language;

@Entity
@Table(name = "\"User\"")
public class User implements UserDetails {

	private static final long serialVersionUID = 3125258392087209376L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(unique = true, length = 30, nullable = false)
	private String username;

	@Column(unique = true, length = 50, nullable = false)
	private String email;

	@Column(length = 60, nullable = false)
	@JsonIgnore
	private String password;

	@Enumerated(EnumType.STRING)
	private Role role;

	@OneToOne(cascade = CascadeType.ALL)
	private FileUpload profilPicture;

	@Enumerated(EnumType.STRING)
	private Language language;

	@OneToOne(cascade = CascadeType.ALL)
	private Smtp smtp;

	private boolean enabled;

	public User() {

	}

	public Long getId() {
		return this.id;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public FileUpload getProfilPicture() {
		return profilPicture;
	}

	public void setProfilPicture(FileUpload profilPicture) {
		this.profilPicture = profilPicture;
	}

	public Smtp getSmtp() {
		return smtp;
	}

	public void setSmtp(Smtp smtp) {
		this.smtp = smtp;
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

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
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
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + (enabled ? 1231 : 1237);
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((language == null) ? 0 : language.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((profilPicture == null) ? 0 : profilPicture.hashCode());
		result = prime * result + ((role == null) ? 0 : role.hashCode());
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
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (enabled != other.enabled)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (language != other.language)
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (profilPicture == null) {
			if (other.profilPicture != null)
				return false;
		} else if (!profilPicture.equals(other.profilPicture))
			return false;
		if (role != other.role)
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
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", role=" + role + ", profilPictureURL="
				+ profilPicture + ", language=" + language + ", enabled=" + enabled + "]";
	}

}
