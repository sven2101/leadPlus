package dash.licensemanangement.domain;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "license", schema = "public")
public class License {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Enumerated(EnumType.STRING)
	private LicenseEnum license;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
	private Calendar term;
	
	private boolean trial;
	
	public License(){
		
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LicenseEnum getLicense() {
		return license;
	}

	public void setLicense(LicenseEnum license) {
		this.license = license;
	}

	public Calendar getTerm() {
		return term;
	}

	public void setTerm(Calendar term) {
		this.term = term;
	}

	public boolean isTrial() {
		return trial;
	}

	public void setTrial(boolean trial) {
		this.trial = trial;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + (trial ? 1231 : 1237);
		result = prime * result + ((license == null) ? 0 : license.hashCode());
		result = prime * result + ((term == null) ? 0 : term.hashCode());
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
		License other = (License) obj;
		if (id != other.id)
			return false;
		if (trial != other.trial)
			return false;
		if (license != other.license)
			return false;
		if (term == null) {
			if (other.term != null)
				return false;
		} else if (!term.equals(other.term))
			return false;
		return true;
	}
}
