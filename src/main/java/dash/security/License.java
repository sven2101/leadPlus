package dash.security;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public enum License {
	FREE("free", new HashSet<String>(Arrays.asList("/", "/images/favicon**", "/assets/**", "/fonts/**", "/app/**",
			"/components/Login/view/Login.html", "/components/Signup/view/Signup.html", "/api/rest/registrations/**",
			"/components/Common/view/NotFound.html", "/components/Common/view/Unauthorized.html",
			"/components/Common/view/Forbidden.html", "/swagger-ui.html", "/webjars/springfox-swagger-ui/**",
			"/configuration/ui", "/swagger-resources", "/v2/api-docs/**", "/configuration/security")),
			0), BASIC("basic",
					new HashSet<String>(Arrays.asList("/components/Common/view/**", "/components/Customer/view/**",
							"/components/Dashboard/view/**", "/components/FileUpload/view/**",
							"/components/Lead/view/**", "/components/Offer/view/**", "/components/Product/view/**",
							"/components/Profile/view/**", "/components/Sale/view/**", "/components/Setting/view/**",
							"/components/Template/view/**", "/main.html", "/api/rest/**")),
					1), PRO("pro", new HashSet<String>(Arrays.asList("/components/Statistic/view/**")),
							2), ULTIMATE("ultimate", new HashSet<String>(Arrays.asList("")), 3);

	private Set<String> allowedRoutes;
	private String license;
	private int order;

	private License(String license, HashSet<String> allowedRoutes, int order) {
		this.license = license;
		this.allowedRoutes = allowedRoutes;
		this.order = order;
	}

	public String getLicense() {
		return this.license;
	}

	public int getOrder() {
		return this.order;
	}

	private License getLicenseByOrder(int order) {
		switch (order) {
		case 0:
			return License.FREE;
		case 1:
			return License.BASIC;
		case 2:
			return License.PRO;
		case 3:
			return License.ULTIMATE;
		default:
			throw new IllegalArgumentException(String.valueOf(order));
		}
	}

	public Set<String> getAllowedRoutes() {
		return Collections.unmodifiableSet(this.allowedRoutes);
	}

	public boolean hasLicenseForURL(String URL) {
		boolean hasLicense = false;
		HashSet<String> routesToCheck = new HashSet<>();
		for (int i = this.order; i >= 0; i--) {
			routesToCheck.addAll(this.getLicenseByOrder(i).getAllowedRoutes());
		}
		if (URLMatchAnyPattern(routesToCheck, URL)) {
			hasLicense = true;
		}
		return hasLicense;
	}

	private boolean URLMatchAnyPattern(HashSet<String> allowedRoutes, String URL) {
		if (allowedRoutes.contains(URL)) {
			return true;
		} else {
			if (URL != null) {
				String[] urlPart = URL.split("/");
				for (int i = 1; i <= urlPart.length - 1; i++) {
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
}
