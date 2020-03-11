package dash.tenantmanagement.business;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.stereotype.Component;

import dash.multitenancy.configuration.TenantContext;

// @Component
public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver {

	@Override
	public String resolveCurrentTenantIdentifier() {
		return TenantContext.getTenant();
	}

	@Override
	public boolean validateExistingCurrentSessions() {
		return false;
	}
}
