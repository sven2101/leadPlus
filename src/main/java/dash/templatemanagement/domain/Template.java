package dash.templatemanagement.domain;

import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import dash.consistencymanagement.domain.ConsistencyObject;

@Entity
@Table(name = "template")
@SequenceGenerator(name = "idgen", sequenceName = "template_id_seq", allocationSize = 1)
public class Template extends ConsistencyObject {

	@NotNull
	@Size(max = 255)
	@Column(name = "name", length = 255, nullable = false)
	private String name;

	@Size(max = 255)
	@Column(name = "description", length = 255, nullable = true)
	private String description;

	@Size(max = 255)
	@Column(name = "subject", length = 255, nullable = true)
	private String subject;

	@NotNull
	@Column(name = "content", columnDefinition = "text", nullable = false)
	private String content;

	@Size(max = 500)
	@Column(name = "notification_type_string", length = 500, nullable = true)
	private String notificationTypeString;

	@Size(max = 500)
	@Column(name = "source_string", length = 500, nullable = true)
	private String sourceString;

	@NotNull
	@Column(name = "deactivated", nullable = false)
	private boolean deactivated;

	@ElementCollection(targetClass = TemplateType.class)
	@CollectionTable(name = "template_types", joinColumns = @JoinColumn(name = "template_id"))
	@Column(name = "template_type", nullable = false)
	@Enumerated(EnumType.STRING)
	private Set<TemplateType> templateTypes;

	public Template() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public boolean isDeactivated() {
		return deactivated;
	}

	public void setDeactivated(boolean deactivated) {
		this.deactivated = deactivated;
	}

	public String getNotificationTypeString() {
		return notificationTypeString;
	}

	public void setNotificationTypeString(String notificationTypeString) {
		this.notificationTypeString = notificationTypeString;
	}

	public String getSourceString() {
		return sourceString;
	}

	public void setSourceString(String sourceString) {
		this.sourceString = sourceString;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public Set<TemplateType> getTemplateTypes() {
		return templateTypes;
	}

	public void setTemplateTypes(Set<TemplateType> templateTypes) {
		this.templateTypes = templateTypes;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result + (deactivated ? 1231 : 1237);
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((notificationTypeString == null) ? 0 : notificationTypeString.hashCode());
		result = prime * result + ((sourceString == null) ? 0 : sourceString.hashCode());
		result = prime * result + ((subject == null) ? 0 : subject.hashCode());
		result = prime * result + ((templateTypes == null) ? 0 : templateTypes.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		Template other = (Template) obj;
		if (content == null) {
			if (other.content != null)
				return false;
		} else if (!content.equals(other.content))
			return false;
		if (deactivated != other.deactivated)
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (notificationTypeString == null) {
			if (other.notificationTypeString != null)
				return false;
		} else if (!notificationTypeString.equals(other.notificationTypeString))
			return false;
		if (sourceString == null) {
			if (other.sourceString != null)
				return false;
		} else if (!sourceString.equals(other.sourceString))
			return false;
		if (subject == null) {
			if (other.subject != null)
				return false;
		} else if (!subject.equals(other.subject))
			return false;
		if (templateTypes == null) {
			if (other.templateTypes != null)
				return false;
		} else if (!templateTypes.equals(other.templateTypes))
			return false;
		return true;
	}

}
