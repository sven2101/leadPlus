package dash.extern.apimanagement.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;

@ApiModel(value = "Api", description = "Extern Api")
@Entity
@Table(name = "api")
public class Api {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "api_auto_gen")
	@SequenceGenerator(name = "api_auto_gen", sequenceName = "api_id_seq", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "authenticationKey", length = 255, nullable = false)
	private String authenticationKey;

	@NotNull
	@Column(name = "authenticationValue", nullable = false)
	private String authenticationValue;

	@NotNull
	@Column(name = "tenant", length = 255, nullable = false)
	private String tenant;

	@NotNull
	@Column(name = "version", length = 255, nullable = false)
	private String version;

	@NotNull
	@Column(name = "isVerified", nullable = false)
	private Boolean isVerified;

	@NotNull
	@Column(name = "isDeactivated", nullable = false)
	private Boolean isDeactivated;

	@Enumerated(EnumType.STRING)
	@Column(name = "apiVendor", length = 255, nullable = true)
	private ApiVendor apiVendor;

	public Api() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuthenticationKey() {
		return authenticationKey;
	}

	public void setAuthenticationKey(String authenticationKey) {
		this.authenticationKey = authenticationKey;
	}

	public String getAuthenticationValue() {
		return authenticationValue;
	}

	public void setAuthenticationValue(String authenticationValue) {
		this.authenticationValue = authenticationValue;
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
}
