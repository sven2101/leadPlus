package dash.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SubdomainExtractor {

	private static String springProfileActive;

	@Value("${spring.profiles.active}")
	public void setSmtpSecret(String springProfileActive) {
		SubdomainExtractor.springProfileActive = springProfileActive;
	}

	// @Value("${multitenant.tenantKey}")
	String tenantKey = "tenant";

	// @Value("${multitenant.defaultTenant}")
	String defaultTenant = "public";

	public String extract(String url) {
		url = url.toLowerCase();
		String[] urlSplit = null;
		switch (springProfileActive) {
		case "local":
			urlSplit = url.split(".leadplus");
			break;
		case "production":
			urlSplit = url.split(".leadplus");
			break;
		case "test":
			urlSplit = url.split(".leadplus");
			break;
		case "development":
			urlSplit = url.split(".boexli");
			break;
		default:
			break;
		}
		String[] prefixSplit = urlSplit[0].split("//");
		String subdomain = prefixSplit[prefixSplit.length - 1];
		if (subdomain.length() >= 4 && "www.".equals(subdomain.substring(0, 4))) {
			subdomain = subdomain.split("www.")[1];
		}
		if (subdomain.contains(".") || subdomain.contains("/")) {
			subdomain = defaultTenant;
		}
		return subdomain;
	}
}
