package dash.common;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.annotations.ApiModelProperty;

@MappedSuperclass
public abstract class ConsistencyObject {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idgen")
	@Column(name = "id", nullable = false)
	private Long id;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm:ss:SSS")
	@ApiModelProperty(hidden = true)
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "last_edited", nullable = false)
	private Calendar lastEdited;

	@Column(name = "last_editor", nullable = false)
	private String lastEditor;

	public Calendar getLastEdited() {
		return lastEdited;
	}

	public void setLastEdited(Calendar lastEdited) {
		this.lastEdited = lastEdited;
	}

	public String getLastEditor() {
		return lastEditor;
	}

	public void setLastEditor(String lastEditor) {
		this.lastEditor = lastEditor;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((lastEdited == null) ? 0 : lastEdited.hashCode());
		result = prime * result + ((lastEditor == null) ? 0 : lastEditor.hashCode());
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
		ConsistencyObject other = (ConsistencyObject) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (lastEdited == null) {
			if (other.lastEdited != null)
				return false;
		} else if (!lastEdited.equals(other.lastEdited))
			return false;
		if (lastEditor == null) {
			if (other.lastEditor != null)
				return false;
		} else if (!lastEditor.equals(other.lastEditor))
			return false;
		return true;
	}	
}
