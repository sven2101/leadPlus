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

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.DontMatchException;
import dash.exceptions.EmailAlreadyExistsException;
import dash.exceptions.NotFoundException;
import dash.exceptions.UpdateFailedException;
import dash.exceptions.UsernameAlreadyExistsException;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.Role;
import dash.usermanagement.domain.User;
import dash.usermanagement.settings.password.PasswordChange;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/users", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
public class UserResource {

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get a single user.", notes = "Provide a valid user ID.")
	public List<User> get() {
		return userService.getAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a single user.", notes = "Provide a valid user ID.")
	public User findById(@PathVariable Long id) throws NotFoundException {
		return userService.getById(id);
	}

	@RequestMapping(value = "/{id}/update", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a single user.", notes = "Provide a valid user ID.")
	public User updateUser(@RequestBody @Valid final User updateUser)
			throws UpdateFailedException, UsernameAlreadyExistsException, EmailAlreadyExistsException {
		return userService.update(updateUser);
	}

	@RequestMapping(value = "/{id}/pw", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a single user.", notes = "Provide a valid user ID.")
	public void updatePassword(@PathVariable Long id, @RequestBody PasswordChange passwordChange)
			throws UpdateFailedException, DontMatchException {
		userService.updatePassword(id, passwordChange);
	}

	@RequestMapping(value = "/{id}/activate", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a single user.", notes = "Provide a valid user ID.")
	public User activateUser(@PathVariable Long id, @RequestBody Boolean activate) throws UpdateFailedException {
		return userService.activateUser(id, activate);
	}

	@RequestMapping(value = "/{id}/role", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Set a User Role .", notes = "Provide a valid user ID.")
	public User setRoleForUser(@PathVariable Long id, @RequestBody Role role) throws UpdateFailedException {
		return userService.setRoleForUser(id, role);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete a single user.", notes = "Provide a valid user ID.")
	public void delete(@PathVariable Long id) throws DeleteFailedException {
		userService.delete(id);
	}
}
