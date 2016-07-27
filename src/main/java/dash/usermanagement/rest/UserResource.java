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

package dash.usermanagement.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Optional;

import dash.exceptions.EmailNotFoundException;
import dash.usermanagement.business.UserRepository;
import dash.usermanagement.domain.Role;
import dash.usermanagement.domain.User;
import dash.usermanagement.settings.password.PasswordChange;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/users")
public class UserResource {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Iterable<User> get() {
		return userRepository.findAll();
	}

	@RequestMapping(value = "/{username}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public User findById(@PathVariable String username) {
		return userRepository.findByUsernameIgnoreCase(username);
	}

	@RequestMapping(value = "/{username}/update", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public User updateUser(@PathVariable String username, @RequestBody @Valid User updateUser) throws Exception {
		User User = userRepository.findByUsernameIgnoreCase(username);
		if (Optional.fromNullable(User).isPresent()) {
			if (!java.util.Optional.ofNullable(userRepository.findByEmailIgnoreCase(updateUser.getEmail())).isPresent()) {
				User.setEmail(updateUser.getEmail());
			} else if (!updateUser.getEmail().equals(User.getEmail())) {
				throw new EmailNotFoundException("Email not found");
			}

			User.setLanguage(updateUser.getLanguage());
			userRepository.save(User);

			return User;
		} else {
			throw new UsernameNotFoundException("No User found.");
		}
	}

	@RequestMapping(value = "/{username}/pw", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void updatePassword(@PathVariable String username, @RequestBody PasswordChange passwordChange) throws Exception {
		final User User = userRepository.findByUsernameIgnoreCase(username);
		if (Optional.fromNullable(User).isPresent()) {
			if (passwordEncoder.matches(passwordChange.getOldPassword(), User.getPassword())) {
				User.setPassword(passwordEncoder.encode(passwordChange.getNewPassword()));
				userRepository.save(User);
			} else {
				throw new Exception("Password does not match.");
			}
		} else {
			throw new UsernameNotFoundException("No User found.");
		}
	}

	@RequestMapping(value = "/{username}/activate", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void activeUser(@PathVariable String username, @RequestBody Boolean activate) throws UsernameNotFoundException {
		final User User = userRepository.findByUsernameIgnoreCase(username);
		if (Optional.fromNullable(User).isPresent()) {
			User.setEnabled(activate);
			userRepository.save(User);
		} else {
			throw new UsernameNotFoundException("User not found.");
		}
	}

	@RequestMapping(value = "/{username}/role", method = RequestMethod.POST, consumes = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.OK)
	public void setRoleForUser(@PathVariable String username, @RequestBody String role) throws Exception {
		final User user = userRepository.findByUsernameIgnoreCase(username);
		if (Optional.fromNullable(user).isPresent()) {
			user.setRole(Role.valueOf(role));
			userRepository.save(user);
		} else {
			throw new UsernameNotFoundException("User not found.");
		}
	}

	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete a single user.", notes = "You have to provide a valid user ID.")
	public void delete(@PathVariable Long id) {
		userRepository.delete(id);
	}
}
