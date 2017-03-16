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

import static dash.Constants.USER_NOT_FOUND;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.EmailAlreadyExistsException;
import dash.exceptions.NotFoundException;
import dash.exceptions.UpdateFailedException;
import dash.exceptions.UsernameAlreadyExistsException;
import dash.fileuploadmanagement.domain.FileUpload;
import dash.smtpmanagement.business.ISmtpService;
import dash.smtpmanagement.domain.Smtp;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.Role;
import dash.usermanagement.domain.User;
import dash.usermanagement.settings.password.PasswordChange;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/users")
public class UserManagmentResource {

	@Autowired
	private UserService userService;

	@Autowired
	private ISmtpService smtpService;

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all user.", notes = "All users.")
	public List<User> getAll() {
		return userService.getAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get a single user.", notes = "Provide a valid user ID.")
	public User getById(@PathVariable final long id) throws NotFoundException {
		return userService.getById(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Update a single user.", notes = "Provide a valid user ID.")
	public User update(@RequestBody final User user)
			throws UpdateFailedException, UsernameAlreadyExistsException, EmailAlreadyExistsException {
		return userService.update(user);
	}

	@RequestMapping(value = "/{id}/pw", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Update password of a single user.", notes = "Provide a valid user ID.")
	public void updatePassword(@PathVariable final long id, @RequestBody @Valid final PasswordChange passwordChange)
			throws Exception {
		userService.updatePassword(id, passwordChange);
	}

	@RequestMapping(value = "/{id}/activate", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Activate a single user.", notes = "Provide a valid user ID.")
	public User activate(@PathVariable final long id, @RequestBody final boolean enabled) throws UpdateFailedException {
		return userService.activate(id, enabled);
	}

	@RequestMapping(value = "/{id}/role/{role}/update", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Set a User Role .", notes = "Provide a valid user ID.")
	public User setRoleForUser(@PathVariable final long id, @PathVariable @Valid final Role role)
			throws UpdateFailedException {
		return userService.setRoleForUser(id, role);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete a single user.", notes = "Provide a valid user ID.")
	public void delete(@PathVariable final long id) throws DeleteFailedException {
		userService.delete(id);
	}

	@RequestMapping(value = "/{id}/profile/picture", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get user Profile Picture.")
	public ResponseEntity<?> getProfilePictureById(@PathVariable final long id) throws NotFoundException {
		User user = userService.getById(id);
		if (user != null) {
			byte[] body = new byte[0];
			if (user.getPicture() != null && user.getPicture().getContent() != null) {
				body = user.getPicture().getContent();
			}
			HttpHeaders header = new HttpHeaders();
			header.setContentType(MediaType.MULTIPART_FORM_DATA);
			header.setContentLength(body.length);
			return new ResponseEntity<byte[]>(body, header, HttpStatus.OK);
		}
		return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/{id}/profile/picture/object", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get user Profile Picture.")
	public FileUpload getProfilePictureObjectById(@PathVariable final long id) throws NotFoundException {
		User user = userService.getById(id);
		if (user != null) {
			FileUpload picture = null;
			if (user.getPicture() != null && user.getPicture().getContent() != null) {
				picture = user.getPicture();
			}
			return picture;
		}
		throw new NotFoundException(USER_NOT_FOUND);
	}

	@RequestMapping(value = "/profile/picture", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Update a single user.", notes = "Provide a valid user ID.")
	public User setProfilePicture(@RequestBody final User user) throws UpdateFailedException {
		return userService.updateProfilPicture(user);
	}

	@RequestMapping(value = "smtp/user/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get Smtp by UserId.", notes = "Provide a valid user ID.")
	public Smtp getSmtpByUserId(@PathVariable final long id) {
		return smtpService.findByUserId(id);

	}

}
