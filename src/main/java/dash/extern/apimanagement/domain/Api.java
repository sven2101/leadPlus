package dash.extern.apimanagement.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import dash.common.EncryptedObject;
import io.swagger.annotations.ApiModel;

@ApiModel(value = "Api", description = "Extern Api")
@Entity
@Table(name = "api")
@SequenceGenerator(name = "idgen", sequenceName = "api_id_seq", allocationSize = 1)
public class Api extends EncryptedObject {

	@NotNull
	@Column(name = "authentication_key", length = 255, nullable = false)
	private String authenticationKey;

	@NotNull
	@Column(name = "tenant", length = 255, nullable = false)
	private String tenant;

	@NotNull
	@Column(name = "version", length = 255, nullable = false)
	private String version;

	@NotNull
	@Column(name = "is_verified", nullable = false)
	private Boolean isVerified;

	@NotNull
	@Column(name = "is_deactivated", nullable = false)
	private Boolean isDeactivated;

	@Enumerated(EnumType.STRING)
	@Column(name = "api_vendor", length = 255, nullable = true)
	private ApiVendor apiVendor;

	public Api() {

	}

	public String getAuthenticationKey() {
		return authenticationKey;
	}

	public void setAuthenticationKey(String authenticationKey) {
		this.authenticationKey = authenticationKey;
	}

	public String getTenant() {
		return tenant;
	}

	public void setTenant(String tenant) {
		this.tenant = tenant;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Boolean getIsVerified() {
		return isVerified;
	}

	public void setIsVerified(Boolean isVerified) {
		this.isVerified = isVerified;
	}

	public Boolean getIsDeactivated() {
		return isDeactivated;
	}

	public void setIsDeactivated(Boolean isDeactivated) {
		this.isDeactivated = isDeactivated;
	}

	public ApiVendor getApiVendor() {
		return apiVendor;
	}

	public void setApiVendor(ApiVendor apiVendor) {
		this.apiVendor = apiVendor;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((apiVendor == null) ? 0 : apiVendor.hashCode());
		result = prime * result + ((authenticationKey == null) ? 0 : authenticationKey.hashCode());
		result = prime * result + ((isDeactivated == null) ? 0 : isDeactivated.hashCode());
		result = prime * result + ((isVerified == null) ? 0 : isVerified.hashCode());
		result = prime * result + ((tenant == null) ? 0 : tenant.hashCode());
		result = prime * result + ((version == null) ? 0 : version.hashCode());
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
		Api other = (Api) obj;
		if (apiVendor != other.apiVendor)
			return false;
		if (authenticationKey == null) {
			if (other.authenticationKey != null)
				return false;
		} else if (!authenticationKey.equals(other.authenticationKey))
			return false;
		if (isDeactivated == null) {
			if (other.isDeactivated != null)
				return false;
		} else if (!isDeactivated.equals(other.isDeactivated))
			return false;
		if (isVerified == null) {
			if (other.isVerified != null)
				return false;
		} else if (!isVerified.equals(other.isVerified))
			return false;
		if (tenant == null) {
			if (other.tenant != null)
				return false;
		} else if (!tenant.equals(other.tenant))
			return false;
		if (version == null) {
			if (other.version != null)
				return false;
		} else if (!version.equals(other.version))
			return false;
		return true;
	}

}
