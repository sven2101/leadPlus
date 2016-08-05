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

package dash.leadmanagement.rest;

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
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.leadmanagement.business.ILeadService;
import dash.leadmanagement.domain.Lead;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping(value = "/api/rest/leads", produces = { MediaType.APPLICATION_JSON_VALUE })
@ResponseStatus(HttpStatus.CREATED)
@Api(value = "leads")
public class LeadResource {

	@Autowired
	private ILeadService leadService;

	@ApiOperation(value = "Returns all leads.")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Lead> getAll() {
		return leadService.getAll();
	}

	@ApiOperation(value = "Return a single lead.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Lead getLeadById(@ApiParam(required = true) @PathVariable final Long id) throws NotFoundException {
		return leadService.getLeadById(id);
	}

	@ApiOperation(value = "Add a single lead.", notes = "")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Lead save(@ApiParam(required = true) @RequestBody @Valid final Lead lead) throws SaveFailedException {
		return leadService.save(lead);
	}

	@ApiOperation(value = "Update a single lead.", notes = "")
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Lead update(@ApiParam(required = true) @RequestBody @Valid final Lead lead) throws UpdateFailedException {
		return leadService.update(lead);
	}

	@ApiOperation(value = "Delete a single Lead.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable final Long id) throws DeleteFailedException {
		leadService.delete(id);
	}
}
