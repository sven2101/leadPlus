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
package dash.smtpmanagement.domain;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import dash.usermanagement.domain.User;

@Entity
@Table(name = "smtp")
public class Smtp {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "smtp_auto_gen")
	@SequenceGenerator(name = "smtp_auto_gen", sequenceName = "smtp_id_seq")
	@Column(name = "id")
	private long id;

	@NotNull
	@Size(max = 255)
	@Column(name = "sender", nullable = false, length = 255)
	private String sender;

	@NotNull
	@Size(max = 255)
	@Column(name = "responseAdress", nullable = false, length = 255)
	private String responseAdress;

	@NotNull
	@Size(max = 255)
	@Column(name = "host", nullable = false, length = 255)
	private String host;

	@NotNull
	@Size(max = 255)
	@Column(name = "username", nullable = false, length = 255)
	private String username;

	@NotNull
	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "password", nullable = false)
	private byte[] password;

	@NotNull
	@Size(max = 255)
	@Column(name = "email", length = 255, nullable = false)
	private String email;

	@NotNull
	@Size(max = 255)
	@Column(name = "encryption", length = 255, nullable = false)
	private Encryption encryption;

	@NotNull
	@Column(name = "port", nullable = false)
	private int port;

	@NotNull
	@Column(name = "connection", nullable = false)
	private boolean connection;

	@NotNull
	@JsonIgnore
	@Column(name = "salt", nullable = false)
	private byte[] salt;

	@NotNull
	@JsonIgnore
	@Column(name = "iv", nullable = false)
	private byte[] iv;

	@NotNull
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	public Smtp() {
	}

	public Long getId() {
		return id;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getResponseAdress() {
		return responseAdress;
	}

	public void setResponseAdress(String responseAdress) {
		this.responseAdress = responseAdress;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public byte[] getPassword() {
		return password;
	}

	public void setPassword(byte[] password) {
		this.password = password;
	}

	public Encryption getEncryption() {
		return encryption;
	}

	public void setEncryption(Encryption encryption) {
		this.encryption = encryption;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public boolean isConnection() {
		return connection;
	}

	public void setConnection(boolean connection) {
		this.connection = connection;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getSalt() {
		return salt;
	}

	public void setSalt(byte[] salt) {
		this.salt = salt;
	}

	public byte[] getIv() {
		return iv;
	}

	public void setIv(byte[] iv) {
		this.iv = iv;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (connection ? 1231 : 1237);
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((encryption == null) ? 0 : encryption.hashCode());
		result = prime * result + ((host == null) ? 0 : host.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + Arrays.hashCode(iv);
		result = prime * result + Arrays.hashCode(password);
		result = prime * result + port;
		result = prime * result + ((responseAdress == null) ? 0 : responseAdress.hashCode());
		result = prime * result + Arrays.hashCode(salt);
		result = prime * result + ((sender == null) ? 0 : sender.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
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
		Smtp other = (Smtp) obj;
		if (connection != other.connection)
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (encryption != other.encryption)
			return false;
		if (host == null) {
			if (other.host != null)
				return false;
		} else if (!host.equals(other.host))
			return false;
		if (id != other.id)
			return false;
		if (!Arrays.equals(iv, other.iv))
			return false;
		if (!Arrays.equals(password, other.password))
			return false;
		if (port != other.port)
			return false;
		if (responseAdress == null) {
			if (other.responseAdress != null)
				return false;
		} else if (!responseAdress.equals(other.responseAdress))
			return false;
		if (!Arrays.equals(salt, other.salt))
			return false;
		if (sender == null) {
			if (other.sender != null)
				return false;
		} else if (!sender.equals(other.sender))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
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
		return "Smtp [id=" + id + ", sender=" + sender + ", responseAdress=" + responseAdress + ", host=" + host + ", username=" + username + ", password="
				+ password + ", email=" + email + ", encryption=" + encryption + ", port=" + port + ", connection=" + connection + ", user=" + user + "]";
	}

}
