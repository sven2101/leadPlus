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
package dash.tenantmanagement.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.SaveFailedException;
import dash.tenantmanagement.business.ITenantService;
import dash.tenantmanagement.domain.Tenant;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Tenant Resource")
@RequestMapping(value = "/api/rest/tenants", consumes = { MediaType.ALL_VALUE }, produces = { MediaType.ALL_VALUE })
@Api(value = "Tenant API")
public class TenantResource {

	@Autowired
	private ITenantService tenantService;

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Post a tenant. ", notes = "")
	public Tenant save(@ApiParam(required = true) @RequestBody @Valid final Tenant tenant) throws SaveFailedException {
		return tenantService.createNewTenant(tenant);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/unique/key")
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Check uniqueness of Tenant Key. ", notes = "")
	public boolean uniqueTenantKey(@ApiParam(required = true) @RequestBody final Tenant tenant) {
		return tenantService.uniqueTenantKey(tenant);
	}
}
