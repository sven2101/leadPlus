package dash.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import dash.multitenancy.TenantContext;

public class TenantFallbackProcessingFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		if (TenantContext.PUBLIC_TENANT.equals(TenantContext.getTenant())) {
			SubdomainExtractor extractor = new SubdomainExtractor();
			String url = request.getRequestURL().toString();
			String subdomain = extractor.extract(request.getRequestURL().toString());
			HttpServletRequest req = (HttpServletRequest) request;
			if (subdomain != null) {
				req.setAttribute(TenantContext.TENANT_KEY, subdomain);
			} else {
				req.setAttribute(TenantContext.TENANT_KEY, TenantContext.PUBLIC_TENANT);
			}
		}

		filterChain.doFilter(request, response);

	}

}
