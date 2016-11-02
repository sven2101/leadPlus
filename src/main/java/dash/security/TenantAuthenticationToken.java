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

import java.util.Arrays;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.SpringSecurityCoreVersion;

import dash.tenantmanagement.domain.Tenant;

public class TenantAuthenticationToken extends AbstractAuthenticationToken {

	private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

	private String tenant;
	private Tenant authenticatedTenant;

	public TenantAuthenticationToken(String tenant) {
		super(Arrays.asList());
		this.tenant = tenant;
	}

	public TenantAuthenticationToken(Tenant authenticatedTenant) {
		super(Arrays.asList());
		this.authenticatedTenant = authenticatedTenant;
	}

	public String getTenant() {
		return this.tenant;
	}

	public void setAuthenticatedTenant(Tenant authenticatedTenant) {
		this.authenticatedTenant = authenticatedTenant;
	}

	public Tenant getAuthenticatedTenant() {
		return this.authenticatedTenant;
	}

	@Override
	public Object getCredentials() {
		return "";
	}

	@Override
	public Object getPrincipal() {
		return "";
	}

}
