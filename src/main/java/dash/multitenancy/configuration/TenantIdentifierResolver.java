package dash.multitenancy.configuration;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.stereotype.Component;

@Component
public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver {

	@Override
	public String resolveCurrentTenantIdentifier() {
		return TenantContext.getTenant();
	}

	@Override
	public boolean validateExistingCurrentSessions() {
		return true;
	}
}