package dash.security;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public enum License {
	BASIC("basic", new String[] { "/components/Statistic/view/Statistic.html" }), PRO("pro",
			new String[] {}), ULTIMATE("ultimate", new String[] {});

	private List<String> blockedRoutes;
	private String license;

	private License(String license, String[] allowedRoutes) {
		this.license = license;
		this.blockedRoutes = Arrays.asList(allowedRoutes);
	}

	public String getLicense() {
		return this.license;
	}

	public List<String> getBlockedRoutes() {
		return Collections.unmodifiableList(blockedRoutes);
	}

	public boolean hasLicenseForURL(String URL) {
		boolean hasLicense = false;
		if (!URLMatchAnyPattern(blockedRoutes, URL)) {
			hasLicense = true;
		}
		return hasLicense;
	}

	private boolean URLMatchAnyPattern(List<String> routeList, String URL) {
		if (routeList.contains(URL)) {
			return true;
		} else {
			for (String route : routeList) {
				if (route.contains("/**") && route.length() > 3
						&& URL.startsWith(route.substring(0, route.length() - 3))) {
					return true;
				}
			}
		}
		return false;
	}
}
