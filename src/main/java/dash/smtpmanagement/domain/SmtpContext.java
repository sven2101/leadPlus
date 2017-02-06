package dash.smtpmanagement.domain;

import javax.validation.constraints.NotNull;

public class SmtpContext {

	@NotNull
	private String smtpKey;

	@NotNull
	private Smtp smtp;

	public String getSmtpKey() {
		return smtpKey;
	}

	public void setSmtpKey(String smtpKey) {
		this.smtpKey = smtpKey;
	}

	public Smtp getSmtp() {
		return smtp;
	}

	public void setSmtp(Smtp smtp) {
		this.smtp = smtp;
	}
}
