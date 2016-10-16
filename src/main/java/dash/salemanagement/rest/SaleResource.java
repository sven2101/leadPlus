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

package dash.salemanagement.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.salemanagement.business.ISaleService;
import dash.salemanagement.domain.Sale;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping(value = "/api/rest/sales", consumes = { MediaType.ALL_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Sale API")
public class SaleResource {

	@Autowired
	private ISaleService saleService;

	@ApiOperation(value = "Returns all sales.")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Sale> getAll() {
		return saleService.getAll();
	}

	@ApiOperation(value = "Return a single sale.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Sale getById(@PathVariable final Long id) throws NotFoundException {
		return saleService.getById(id);
	}

	@ApiOperation(value = "Delete a single sale.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable final Long id) throws DeleteFailedException {
		saleService.delete(id);
	}

	@ApiOperation(value = "Return customers sales.", notes = "")
	@RequestMapping(value = "/customer/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Sale> getByCustomer(@ApiParam(required = true) @PathVariable final Long id) {
		return saleService.getByCustomer(id);
	}

}
