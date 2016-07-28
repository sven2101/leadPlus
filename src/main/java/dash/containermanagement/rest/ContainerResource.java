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

package dash.containermanagement.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.containermanagement.business.IContainerService;
import dash.containermanagement.domain.Container;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Component
@RestController
@RequestMapping(value = "/api/rest/containers", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "containers")
public class ContainerResource {

	private IContainerService containerService;

	@ApiOperation(value = "Get all containers.", notes = "")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Container> getAll() {
		return containerService.getAll();
	}

	@ApiOperation(value = "Get a single container.", notes = "You have to provide a valid container ID.")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Container getById(@ApiParam(required = true) @PathVariable Long id) throws NotFoundException {
		return containerService.getById(id);
	}

	@ApiOperation(value = "Add a single container.", notes = "You have to provide a valid Container Object")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Container save(@ApiParam(required = true) @RequestBody @Valid final Container container)
			throws SaveFailedException {
		return containerService.save(container);
	}

	@ApiOperation(value = "Update a single container.", notes = "")
	@RequestMapping(method = RequestMethod.PUT, value = "/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Container update(@ApiParam(required = true) @RequestBody final Container container)
			throws UpdateFailedException {
		return containerService.update(container);
	}

	@ApiOperation(value = "Delete a single container.", notes = "")
	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable Long id) throws DeleteFailedException {
		containerService.delete(id);
	}
}
