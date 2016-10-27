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

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import dash.tenantmanagement.business.TenantContext;

public class TenantAuthenticationFilter extends OncePerRequestFilter {

	public TenantAuthenticationProvider authProvider;

	public TenantAuthenticationFilter(TenantAuthenticationProvider authProvider) {
		this.authProvider = authProvider;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		Optional<String> tenant = Optional.ofNullable(request.getHeader("X-TenantID"));

		if (tenant.isPresent()) {
			String tenantKey = validateTenant(tenant.get());
			if (authenticationIsRequired(tenantKey) && !TenantContext.NO_TENANT.equals(tenantKey)) {
				TenantAuthenticationToken authRequest = new TenantAuthenticationToken(tenantKey);
				Authentication authResult = this.authProvider.authenticate(authRequest);
				SecurityContextHolder.getContext().setAuthentication(authResult);
			} else if (TenantContext.NO_TENANT.equals(tenantKey)) {
				TenantContext.setTenant(TenantContext.PUBLIC_TENANT);
			}
		}

		filterChain.doFilter(request, response);
	}

	private String validateTenant(String tenantKey) {
		String[] tenant = tenantKey.split("\\.");
		if (tenant.length == 3)
			return tenant[0];
		else if (tenant.length == 2)
			return TenantContext.NO_TENANT;
		else
			return null;
	}

	private boolean authenticationIsRequired(String tenant) {
		Authentication existingAuth = SecurityContextHolder.getContext().getAuthentication();

		if (existingAuth == null || !existingAuth.isAuthenticated()) {
			return true;
		}

		if (existingAuth instanceof TenantAuthenticationToken
				&& !((TenantAuthenticationToken) existingAuth).getTenant().equals(tenant)) {
			return true;
		}

		if (existingAuth instanceof AnonymousAuthenticationToken) {
			return true;
		}

		return false;
	}

}