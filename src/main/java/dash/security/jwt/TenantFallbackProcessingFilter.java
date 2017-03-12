package dash.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class TenantFallbackProcessingFilter extends OncePerRequestFilter {

	// @Value("${multitenant.tenantKey}")
	String tenantKey = "tenant";

	// @Value("${multitenant.defaultTenant}")
	String defaultTenant = "public";

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		SubdomainExtractor extractor = new SubdomainExtractor();
		String url = request.getRequestURL().toString();
		String subdomain = extractor.extract(request.getRequestURL().toString());
		HttpServletRequest req = (HttpServletRequest) request;
		if (subdomain != null) {
			req.setAttribute(tenantKey, subdomain);
		} else {
			req.setAttribute(tenantKey, defaultTenant);
		}
		filterChain.doFilter(request, response);

	}

}
