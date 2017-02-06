package dash.smtpmanagement.rest.test;

public class SmtpContextWrapper {

	private SmtpWrapper smtp;
	private String smtpKey;

	public SmtpWrapper getSmtp() {
		return smtp;
	}

	public void setSmtp(SmtpWrapper smtp) {
		this.smtp = smtp;
	}

	public String getSmtpKey() {
		return smtpKey;
	}

	public void setSmtpKey(String smtpKey) {
		this.smtpKey = smtpKey;
	}

}
