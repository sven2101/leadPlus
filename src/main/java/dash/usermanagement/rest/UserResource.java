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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.usermanagement.business.UserRepository;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.Role;
import dash.usermanagement.domain.User;
import dash.usermanagement.settings.password.PasswordChange;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/users")
public class UserResource {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

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
	@ResponseStatus(HttpStatus.OK)
	public User updateUser(@PathVariable String username, @RequestBody @Valid final User updateUser) throws Exception {
		return userService.updateUser(username, updateUser);
	}

	@RequestMapping(value = "/{username}/pw", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void updatePassword(@PathVariable String username, @RequestBody PasswordChange passwordChange) throws Exception {
		userService.updatePassword(username, passwordChange);
	}

	@RequestMapping(value = "/{username}/activate", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public User activateUser(@PathVariable String username, @RequestBody Boolean activate) throws UsernameNotFoundException {
		return userService.activateUser(username, activate);
	}

	@RequestMapping(value = "/{username}/role", method = RequestMethod.POST, consumes = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.OK)
	public User setRoleForUser(@PathVariable String username, @RequestBody Role role) throws UsernameNotFoundException {
		return userService.setRoleForUser(username, role);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete a single user.", notes = "You have to provide a valid user ID.")
	public void delete(@PathVariable Long id) {
		userRepository.delete(id);
	}
}
