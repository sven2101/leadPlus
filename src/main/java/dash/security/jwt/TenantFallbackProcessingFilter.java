package dash.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import dash.tenantmanagement.business.TenantContext;

public class TenantFallbackProcessingFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		if (TenantContext.getTenant() == null) {
			SubdomainExtractor extractor = new SubdomainExtractor();
			String url = request.getRequestURL().toString();
			String subdomain = extractor.extract(request.getRequestURL().toString());
			TenantContext.setTenant(subdomain);
		}
		filterChain.doFilter(request, response);

	}

}
