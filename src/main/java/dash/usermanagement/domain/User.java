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

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

	private String profilPictureURL;

	@Enumerated(EnumType.STRING)
	private Language language;

	private boolean enabled;

	public User() {
	}

	public User(String username, String firstName, String lastName, String email, String passwordHash, String profilPictureURL, Language language) {
		this.username = username;
		this.email = email;
		this.password = passwordHash;
		this.profilPictureURL = profilPictureURL;
		this.language = language;
		this.enabled = false;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getProfilPictureURL() {
		return profilPictureURL;
	}

	public void setProfilPictureURL(String profilPictureURL) {
		this.profilPictureURL = profilPictureURL;
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
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", role=" + role + ", profilPictureURL="
				+ profilPictureURL + ", language=" + language + ", enabled=" + enabled + "]";
	}

}
