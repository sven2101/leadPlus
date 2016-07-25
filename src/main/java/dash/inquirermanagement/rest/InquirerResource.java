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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Optional;

import dash.inquirermanagement.business.InquirerRepository;
import dash.inquirermanagement.domain.Inquirer;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * Created by Andreas on 12.10.2015.
 */

@RestController(value = "InquirerResource")
@Api(value = "inquirers", description = "Inquirer API")
@RequestMapping(value = "/api/rest/inquirers")
public class InquirerResource {

	@Autowired
	private InquirerRepository inquirerRepository;

	@RequestMapping(value = "", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Inquirers", notes = "You have to provide a valid hotel ID.")
	public Iterable<Inquirer> get() {
		return inquirerRepository.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get a single inquirer.", notes = "You have to provide a valid inquirer ID.")
	public Inquirer findById(@ApiParam(required = true) @PathVariable Long id) {
		return inquirerRepository.findOne(id);
	}

	@RequestMapping(value = "", method = RequestMethod.POST, consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Create a Inquirer Entity.", notes = "Returns the URL of the new resource in the Location header.")
	public ResponseEntity<Void> add(@RequestBody Inquirer inquirer) {
		inquirerRepository.save(inquirer);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/{id}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Update a single inquirer.", notes = "You have to provide a valid inquirer ID.")
	public Inquirer update(@ApiParam(required = true) @PathVariable Long id, @ApiParam(required = true) @RequestBody Inquirer updateInquirer) {
		Inquirer inquirer = inquirerRepository.findOne(id);
		if (Optional.fromNullable(inquirer).isPresent()) {
			inquirer.setFirstname(updateInquirer.getFirstname());
			inquirer.setLastname(updateInquirer.getLastname());
			inquirer.setCompany(updateInquirer.getCompany());
			inquirer.setEmail(updateInquirer.getEmail());
			inquirer.setPhone(updateInquirer.getPhone());
			inquirer.setTitle(updateInquirer.getTitle());
		}
		return inquirer;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete a single inquirer.", notes = "You have to provide a valid inquirer ID.")
	public void delete(@ApiParam(required = true) @PathVariable Long id) {
		inquirerRepository.delete(id);
	}
}
