package dash.licensemanangement.domain;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum LicenseEnum {
	ERROR("error", new HashSet<String>(Arrays.asList("/components/Common/view/NotFound.html",
			"/components/Common/view/Unauthorized.html", "/components/Common/view/Forbidden.html", "/main.html")),
			0), FREE("free",
					new HashSet<String>(Arrays.asList("/", "/images/favicon/**", "/assets/**", "/fonts/**", "/app/**",
							"/components/Login/view/Login.html", "/logout", "/logout.html",
							"/components/Signup/view/Signup.html", "/components/Tenant/registration/view/**",
							"/components/Licence/view/**", "/api/rest/tenants/unique/key", "/api/rest/tenants",
							"/api/rest/registrations/**", "/components/Common/view/NotFound.html",
							"/components/Common/view/Unauthorized.html", "/components/Common/view/Forbidden.html",
							"/swagger-ui.html", "/webjars/springfox-swagger-ui/**", "/configuration/ui",
							"/swagger-resources", "/v2/api-docs/**", "/configuration/security")),
					1), BASIC("basic",
							new HashSet<String>(Arrays.asList("/user", "/users/all", "/components/Common/view/**",
									"/components/Customer/view/**", "/components/Dashboard/view/**",
									"/components/FileUpload/view/**", "/components/Lead/view/**",
									"/components/Offer/view/**", "/components/Product/view/**",
									"/components/Profile/view/**", "/components/Sale/view/**",
									"/components/Setting/view/**", "/components/Template/view/**", "/main.html",
									"/api/rest/**", "/components/Statistic/view/**")),
							2), PRO("pro", new HashSet<String>(Arrays.asList("")),
									3), ULTIMATE("ultimate", new HashSet<String>(Arrays.asList("")), 4);

	private Set<String> allowedRoutes;
	private String license;
	private int order;
	private HashSet<String> combinedRoutes;

	private LicenseEnum(String license, HashSet<String> allowedRoutes, int order) {
		this.license = license;
		this.allowedRoutes = allowedRoutes;
		this.order = order;
		combinedRoutes = new HashSet<>(allowedRoutes);
		for (int i = this.order - 1; i >= 0; i--) {
			combinedRoutes.addAll(this.getLicenseByOrder(i).getAllowedRoutes());
		}
	}

	public String getLicense() {
		return this.license;
	}

	public int getOrder() {
		return this.order;
	}

	private LicenseEnum getLicenseByOrder(int order) {
		switch (order) {
		case 0:
			return LicenseEnum.ERROR;
		case 1:
			return LicenseEnum.FREE;
		case 2:
			return LicenseEnum.BASIC;
		case 3:
			return LicenseEnum.PRO;
		case 4:
			return LicenseEnum.ULTIMATE;
		default:
			throw new IllegalArgumentException(String.valueOf(order));
		}
	}

	public Set<String> getAllowedRoutes() {
		return Collections.unmodifiableSet(this.allowedRoutes);
	}

	public boolean hasLicenseForUrl(String Url) {
		boolean hasLicense = false;
		if (URLMatchAnyPattern(this.combinedRoutes, Url)) {
			hasLicense = true;
		}
		return hasLicense;
	}

	private boolean URLMatchAnyPattern(HashSet<String> allowedRoutes, String Url) {
		if (allowedRoutes.contains(Url)) {
			return true;
		} else {
			if (Url != null) {
				String[] urlPart = Url.split("/");
				for (int i = 1; i <= urlPart.length - 2; i++) {
					String urlPatternBuilder = "";
					for (int k = 1; k <= i; k++) {
						urlPatternBuilder += "/" + urlPart[k];
					}
					urlPatternBuilder += "/**";
					if (allowedRoutes.contains(urlPatternBuilder))
						return true;
				}
			}
		}
		return false;
	}

	@JsonCreator
	public static LicenseEnum fromValue(String value) {
		return LicenseEnum.valueOf(value);
	}

}
