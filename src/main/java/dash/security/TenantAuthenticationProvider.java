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
package dash.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import dash.exceptions.TenantAuthentificationException;
import dash.tenantmanagement.business.TenantContext;
import dash.tenantmanagement.business.TenantRepository;
import dash.tenantmanagement.domain.Tenant;

@Component
public class TenantAuthenticationProvider implements AuthenticationProvider {

	private TenantRepository tenantRepository;

	@Autowired
	public TenantAuthenticationProvider(TenantRepository tenantRepository) {
		this.tenantRepository = tenantRepository;
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		if (!(authentication instanceof TenantAuthenticationToken)) {
			throw new IllegalArgumentException("Only TenantUsernamePasswordAuthenticationToken is supported");
		}

		TenantAuthenticationToken tenantAuthentication = (TenantAuthenticationToken) authentication;

		String tenantKey = null;
		if (tenantAuthentication.getTenant() != null)
			tenantKey = tenantAuthentication.getTenant();
		else if (tenantAuthentication.getAuthenticatedTenant() != null)
			tenantKey = tenantAuthentication.getAuthenticatedTenant().getTenantKey();
		System.out.println(TenantContext.getTenant());
		if (TenantContext.getTenant() == null)
			TenantContext.setTenant(TenantContext.PUBLIC_TENANT);
		Tenant tenant = null;
		if (tenantKey != null)
			tenant = tenantRepository.findByTenantKey(tenantKey);
		System.out.println("After repo");

		if (tenant == null) {
			throw new TenantAuthentificationException("Invalid tenantkey: " + tenantKey);
		}

		return new TenantAuthenticationToken(tenant);
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return TenantAuthenticationToken.class.isAssignableFrom(authentication);
	}

}