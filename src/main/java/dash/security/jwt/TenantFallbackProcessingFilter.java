package dash.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import dash.multitenancy.configuration.TenantContext;

public class TenantFallbackProcessingFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		if (TenantContext.PUBLIC_TENANT.equals(TenantContext.getTenant())) {
			SubdomainExtractor extractor = new SubdomainExtractor();
			String subdomain = extractor.extract(request.getRequestURL().toString());
			TenantContext.setTenant(subdomain);
		}
		filterChain.doFilter(request, response);

	}

}
