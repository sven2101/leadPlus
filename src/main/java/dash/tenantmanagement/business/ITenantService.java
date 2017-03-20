/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
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
