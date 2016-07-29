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

package dash.prospectmanagement.rest;

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
import dash.exceptions.UpdateFailedException;
import dash.prospectmanagement.business.IProspectService;
import dash.prospectmanagement.domain.Prospect;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Prospect Resource")
@RequestMapping(value = "/api/rest/prospects", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Prospects API")
public class ProspectResource {

	@Autowired
	private IProspectService prospectService;

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Prospects", notes = "")
	public List<Prospect> getAll() {
		return prospectService.getAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get a single prospect.", notes = "You have to provide a valid prospect ID.")
	public Prospect findById(@ApiParam(required = true) @PathVariable final Long id) throws NotFoundException {
		return prospectService.getById(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Update a single prospect.", notes = "You have to provide a valid prospect ID.")
	public Prospect update(@ApiParam(required = true) @RequestBody @Valid final Prospect prospect) throws UpdateFailedException {
		return prospectService.update(prospect);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a single prospect.", notes = "You have to provide a valid prospect ID.")
	public void delete(@ApiParam(required = true) @PathVariable final Long id) throws DeleteFailedException {
		prospectService.delete(id);
	}
}
