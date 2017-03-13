package dash.usermanagement.password.forgot.domain;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "password_forgot_request")
public class PasswordForgot {

	@Id
	@Column(name = "id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "timestamp", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar timestamp;

	@Size(min = 2, max = 50)
	@Column(name = "email", length = 50, nullable = false)
	private String email;

	public PasswordForgot() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Calendar getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Calendar timestamp) {
		this.timestamp = timestamp;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
