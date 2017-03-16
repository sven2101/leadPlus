package dash.usermanagement.password.forgot.domain;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "password_forgot_request")
public class PasswordForgot {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "password_forgot_req_auto_gen")
	@SequenceGenerator(name = "password_forgot_req_auto_gen", sequenceName = "password_forgot_req_id_seq", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Size(max = 300)
	@Column(name = "randomKey", length = 300, nullable = false)
	private String randomKey;

	@NotNull
	@Column(name = "timestamp", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar timestamp;

	@Size(min = 2, max = 50)
	@Column(name = "email", length = 50, nullable = false)
	private String email;

	@Column(name = "resetSmtp", nullable = false)
	private Boolean resetSmtp;

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

	public String getRandomKey() {
		return randomKey;
	}

	public void setRandomKey(String randomKey) {
		this.randomKey = randomKey;
	}

	public Boolean getResetSmtp() {
		return resetSmtp;
	}

	public void setResetSmtp(Boolean resetSmtp) {
		this.resetSmtp = resetSmtp;
	}

}
