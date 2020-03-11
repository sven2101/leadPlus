package dash.tenantmanagement.business;

import java.util.List;

import dash.exceptions.NotFoundException;
import dash.exceptions.TenantAlreadyExistsException;
import dash.tenantmanagement.domain.Tenant;
import dash.usermanagement.registration.domain.Validation;

public interface ITenantService {

	public Tenant createNewTenant(final Tenant tenant) throws TenantAlreadyExistsException, InterruptedException;

	public Tenant getTenantByName(final String name) throws NotFoundException;

	public Validation uniqueTenantKey(final Tenant tenant);

	public List<Tenant> getAllTenants();
}
