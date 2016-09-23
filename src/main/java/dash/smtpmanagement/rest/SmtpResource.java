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

package dash.smtpmanagement.rest;

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

import dash.exceptions.NotFoundException;
import dash.smtpmanagement.business.ISmtpService;
import dash.smtpmanagement.domain.Smtp;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping(value = "/api/rest/smtp", consumes = { MediaType.ALL_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Smtp API")
public class SmtpResource {

	@Autowired
	private ISmtpService smtpService;

	@ApiOperation(value = "Testing Connection.")
	@RequestMapping(value = "/test/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public void testConnection(@PathVariable final long id) throws Exception {
		smtpService.testSmtp(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Create a single Smtp.", notes = "You have to provide a valid Smtp entity.")
	public Smtp save(@ApiParam(required = true) @RequestBody @Valid final Smtp smpt) throws Exception {
		return smtpService.save(smpt);
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get by UserId.", notes = "Provide a valid user ID.")
	public Smtp getByUserId(@PathVariable final long id) throws NotFoundException {
		Smtp x = smtpService.findByUser(id);
		return x;
	}

}
