package dash.multitenancy;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

@Component
public class HeaderTenantIdentifierResolver implements CurrentTenantIdentifierResolver {

	// @Value("${multitenant.tenantKey}")
	String tenantKey = "tenant";

	// @Value("${multitenant.defaultTenant}")
	String defaultTenant = "public";

	@Override
	public String resolveCurrentTenantIdentifier() {
		RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		if (requestAttributes != null) {
			String tenantId = (String) requestAttributes.getAttribute(tenantKey, RequestAttributes.SCOPE_REQUEST);
			if (tenantId != null) {
				return tenantId;
			}
		}
		return defaultTenant;
	}

	@Override
	public boolean validateExistingCurrentSessions() {
		return true;
	}
}