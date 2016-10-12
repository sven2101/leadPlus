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
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dash.exceptions.NotFoundException;
import dash.exceptions.UserIsNotActivatedException;
import dash.usermanagement.domain.User;

@Service
@Transactional
public class UserLoginService implements UserDetailsService {

	private static final Logger logger = Logger.getLogger(UserLoginService.class);

	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user;
		try {
			user = userService.getUserByName(username);
			if (!Optional.ofNullable(user).isPresent()) {
				throw new NotFoundException(USER_NOT_FOUND);
			}
			if (!user.getEnabled()) {
				throw new UserIsNotActivatedException(USER_NOT_ACTIVATED);
			}
		} catch (NotFoundException | UserIsNotActivatedException ex) {
			logger.error(ex.getMessage() + username + UserLoginService.class.getSimpleName(), ex);
			throw new UsernameNotFoundException(USER_NOT_FOUND + username);
		}

		System.out.println("USER: " + new org.springframework.security.core.userdetails.User(user.getUsername(),
				user.getPassword(), AuthorityUtils.createAuthorityList(user.getRole().toString())));

		return user;
	}
}
