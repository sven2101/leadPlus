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
		return subdomain;
	}
}
