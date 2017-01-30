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

package dash.usermanagement.registration.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.EmailAlreadyExistsException;
import dash.exceptions.RegisterFailedException;
import dash.exceptions.SaveFailedException;
import dash.usermanagement.business.UserService;
import dash.usermanagement.registration.domain.Registration;
import dash.usermanagement.registration.domain.Validation;

@RestController
@RequestMapping(value = "/api/rest/registrations", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
public class RegistrationResource {

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Object> register(@RequestBody final Registration registration) {
		try {
			return new ResponseEntity<Object>(userService.register(registration), HttpStatus.CREATED);
		} catch (EmailAlreadyExistsException eaeex) {
			return new ResponseEntity<Object>(eaeex.getMessage(), HttpStatus.CONFLICT);
		} catch (RegisterFailedException rfex) {
			return new ResponseEntity<Object>(rfex.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@RequestMapping(value = "/unique/email", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public Validation emailAlreadyExists(@RequestBody final Registration registration) {
		return userService.emailAlreadyExists(registration.getEmail());
	}

	@RequestMapping(value = "/init", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createInitialUsers(@RequestBody final String apiPassword) throws SaveFailedException {
		userService.createInitialUsers(apiPassword);
	}

}
