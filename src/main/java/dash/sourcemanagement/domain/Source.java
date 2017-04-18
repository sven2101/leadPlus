package dash.sourcemanagement.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import dash.common.ConsistencyObject;

@Entity
@SQLDelete(sql = "UPDATE source SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "source")
@SequenceGenerator(name = "idgen", sequenceName = "source_id_seq", allocationSize = 1)
public class Source extends ConsistencyObject {

	@NotNull
	@Column(name = "deleted", nullable = false)
	private boolean deleted;

	@NotNull
	@Column(name = "deactivated", nullable = false)
	private boolean deactivated;

	@NotNull
	@Size(max = 100)
	@Column(name = "name", length = 100, nullable = false, unique = true)
	private String name;

	@Size(max = 500)
	@Column(name = "description", length = 500, nullable = true)
	private String description;

	@Size(max = 50)
	@Column(name = "token_id", length = 50, nullable = true)
	private String tokenId;

	public Source() {

	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
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

	public boolean isDeactivated() {
		return deactivated;
	}

	public void setDeactivated(boolean deactivated) {
		this.deactivated = deactivated;
	}

	public String getTokenId() {
		return tokenId;
	}

	public void setTokenId(String tokenId) {
		this.tokenId = tokenId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (deactivated ? 1231 : 1237);
		result = prime * result + (deleted ? 1231 : 1237);
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
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
		Source other = (Source) obj;
		if (deactivated != other.deactivated)
			return false;
		if (deleted != other.deleted)
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
		return true;
	}

	@Override
	public String toString() {
		return "Source [deleted=" + deleted + ", deactivated=" + deactivated + ", name=" + name + ", description="
				+ description + "]";
	}
}
