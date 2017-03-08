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

import java.io.IOException;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.tenantmanagement.business.TenantService;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;
import dash.usermanagement.registration.domain.Registration;
import dash.usermanagement.registration.domain.Validation;
import freemarker.template.TemplateException;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/rest/registrations", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
public class RegistrationResource {

	private static final Logger logger = Logger.getLogger(RegistrationResource.class);

	private UserService userService;
	private TenantService tenantService;

	@Autowired
	public RegistrationResource(UserService userService, TenantService tenantService) {
		this.userService = userService;
		this.tenantService = tenantService;
	}

	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "Post a User. ", notes = "")
	public ResponseEntity<Object> register(@RequestBody @Valid final Registration registration) {
		try {
			final User user = this.userService.register(registration);
			user.setPassword(null);
			this.userService.notifyUser(user);
			return new ResponseEntity<>(user, HttpStatus.CREATED);
		} catch (Exception ex) {
			logger.error(RegistrationResource.class.getSimpleName(), ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@RequestMapping(value = "/unique/email", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public Validation emailAlreadyExists(@RequestBody final Registration registration) {
		return userService.emailAlreadyExists(registration.getEmail());
	}

	@RequestMapping(value = "/init", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createInitialUsers(@RequestBody final String apiPassword) throws IOException, TemplateException {
		this.userService.createInitialUsers(apiPassword);
	}
}
