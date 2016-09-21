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

package dash.publicapi.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.SaveFailedException;
import dash.leadmanagement.domain.Lead;
import dash.publicapi.business.IPublicApiService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Public Api")
@RequestMapping(value = "/api/public", consumes = { MediaType.ALL_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
@Secured({ "API" })
@Api(value = "Public API")
public class PublicApiResource {

	@Autowired
	private IPublicApiService publicApiService;

	@ApiOperation(value = "Add a single lead.", notes = "")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void save(@ApiParam(required = true) @RequestBody @Valid final Lead lead) throws SaveFailedException {
		publicApiService.saveLead(lead);
	}

}
