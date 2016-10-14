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

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import dash.licensemanangement.domain.LicenseEnum;
import dash.usermanagement.domain.User;

public class LicenseFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		if (SecurityContextHolder.getContext().getAuthentication() != null
				&& SecurityContextHolder.getContext().getAuthentication().isAuthenticated()
				&& !SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {

			System.out.println(request.getRequestURI());

			System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
			User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			System.out.println("the tenant is: " + u.getTenant());

			if (!LicenseEnum.valueOf("BASIC").hasLicenseForURL(request.getRequestURI())) {
				System.out.println("Keine Lizenz");
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			}

		}
		filterChain.doFilter(request, response);
	}

}
