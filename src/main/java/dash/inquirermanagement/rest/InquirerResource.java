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

package dash.inquirermanagement.rest;

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
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.inquirermanagement.business.InquirerService;
import dash.inquirermanagement.domain.Inquirer;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "InquirerResource")
@Api(value = "inquirers")
@RequestMapping(value = "/api/rest/inquirers", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
public class InquirerResource {

	@Autowired
	private InquirerService inquirerService;

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Inquirers", notes = "You have to provide a valid hotel ID.")
	public Iterable<Inquirer> getAll() {
		return inquirerService.getAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get a single inquirer.", notes = "You have to provide a valid inquirer ID.")
	public Inquirer getInquirerById(@ApiParam(required = true) @PathVariable final Long id) throws NotFoundException {
		return inquirerService.getInquirerById(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Create a Inquirer Entity.", notes = "Returns the URL of the new resource in the Location header.")
	public Inquirer save(@ApiParam(required = true) @RequestBody @Valid final Inquirer inquirer) throws SaveFailedException {
		return inquirerService.save(inquirer);
	}

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Update a single inquirer.", notes = "You have to provide a valid inquirer ID.")
	public Inquirer update(@ApiParam(required = true) @RequestBody @Valid final Inquirer inquirer) throws UpdateFailedException {
		return inquirerService.update(inquirer);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a single inquirer.", notes = "You have to provide a valid inquirer ID.")
	public void delete(@ApiParam(required = true) @PathVariable final Long id) throws DeleteFailedException {
		inquirerService.delete(id);
	}
}
