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

package dash.usermanagement.business;

import static dash.Constants.USER_NOT_ACTIVATED;
import static dash.Constants.USER_NOT_FOUND;

import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.exceptions.UserIsNotActivatedException;
import dash.tenantmanagement.business.TenantContext;
import dash.tenantmanagement.business.TenantService;
import dash.usermanagement.domain.User;

@Service
public class UserLoginService implements UserDetailsService {

	private static final Logger logger = Logger.getLogger(UserLoginService.class);

	@Autowired
	private UserService userService;

	@Autowired
	private TenantService tenantService;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user;
		try {
			TenantContext.setTenant(email.split("/")[0]);
			user = userService.getUserByEmail(email.split("/")[1]);
 			user.setTenant(tenantService.getTenantByName(email.split("/")[0]));
			if (!Optional.ofNullable(user).isPresent()) {
				throw new NotFoundException(USER_NOT_FOUND);
			}
			if (!user.getEnabled()) {
				throw new UserIsNotActivatedException(USER_NOT_ACTIVATED);
			}
		} catch (NotFoundException | UserIsNotActivatedException ex) {
			logger.error(ex.getMessage() + email + UserLoginService.class.getSimpleName(), ex);
			throw new UsernameNotFoundException(USER_NOT_FOUND + email);
		}

		return user;
	}
}
