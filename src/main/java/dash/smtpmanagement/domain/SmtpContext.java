package dash.smtpmanagement.domain;

public class SmtpContext {

	private String smtpKey;

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
