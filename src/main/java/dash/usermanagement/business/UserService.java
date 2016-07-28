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

import static dash.Constants.DONT_MATCH;
import static dash.Constants.EMAIL_NOT_FOUND;
import static dash.Constants.USER_NOT_FOUND;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dash.exceptions.DontMatchException;
import dash.exceptions.NotFoundException;
import dash.usermanagement.domain.Role;
import dash.usermanagement.domain.User;
import dash.usermanagement.settings.password.PasswordChange;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public User updateUser(Long id, User updateUser) throws Exception {
		User user = userRepository.findOne(id);
		if (Optional.ofNullable(user).isPresent()) {
			if (!Optional.ofNullable(userRepository.findByEmailIgnoreCase(updateUser.getEmail())).isPresent()) {
				user.setEmail(updateUser.getEmail());
			} else if (!updateUser.getEmail().equals(user.getEmail())) {
				throw new NotFoundException(EMAIL_NOT_FOUND);
			}

			user.setLanguage(updateUser.getLanguage());

			return userRepository.save(user);
		} else {
			throw new UsernameNotFoundException(USER_NOT_FOUND);
		}
	}

	public void updatePassword(Long id, PasswordChange passwordChange) throws Exception {
		final User user = userRepository.findOne(id);
		if (Optional.ofNullable(user).isPresent()) {
			if (passwordEncoder.matches(passwordChange.getOldPassword(), user.getPassword())) {
				user.setPassword(passwordEncoder.encode(passwordChange.getNewPassword()));
				userRepository.save(user);
			} else {
				throw new DontMatchException(DONT_MATCH);
			}
		} else {
			throw new UsernameNotFoundException(USER_NOT_FOUND);
		}
	}

	public User activateUser(Long id, Boolean activate) throws UsernameNotFoundException {
		User user = userRepository.findOne(id);
		if (Optional.ofNullable(user).isPresent()) {
			user.setEnabled(activate);
			return userRepository.save(user);
		} else {
			throw new UsernameNotFoundException(USER_NOT_FOUND);
		}
	}

	public User setRoleForUser(Long id, Role role) throws UsernameNotFoundException {
		User user = userRepository.findOne(id);
		if (Optional.ofNullable(user).isPresent()) {
			user.setRole(role);
			return userRepository.save(user);
		} else {
			throw new UsernameNotFoundException(USER_NOT_FOUND);
		}
	}
}
