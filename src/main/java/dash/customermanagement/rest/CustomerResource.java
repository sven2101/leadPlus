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

package dash.customermanagement.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.customermanagement.business.ICustomerService;
import dash.customermanagement.domain.Customer;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Customer Resource")
@RequestMapping(value = "/api/rest/customer", consumes = { MediaType.ALL_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Customer API")
public class CustomerResource {

	@Autowired
	private ICustomerService customerService;

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Customers", notes = "")
	public List<Customer> getAll() {
		return customerService.getAll();
	}

	@ApiOperation(value = "Returns a list of customer by page.", notes = "")
	@RequestMapping(value = "/all/{start}/{length}/{searchtext}/{allCustomers}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Page<Customer> getAllByPage(@PathVariable Integer start, @PathVariable Integer length,
			@PathVariable String searchtext, @PathVariable Boolean allCustomers) {
		return customerService.getAllByPage(start, length, searchtext, allCustomers);

	}

	@RequestMapping(value = "/real", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Customers with sale", notes = "")
	public List<Customer> getRealCustomer() {
		return customerService.getRealCustomer();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get a single customer.", notes = "You have to provide a valid customer ID.")
	public Customer getById(@ApiParam(required = true) @PathVariable final Long id) throws NotFoundException {
		return customerService.getById(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Create a single customer.", notes = "You have to provide a valid customer entity.")
	public Customer save(@ApiParam(required = true) @RequestBody @Valid final Customer customer)
			throws SaveFailedException {
		return customerService.save(customer);
	}

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Update a single customer.", notes = "You have to provide a valid customer ID.")
	public Customer update(@ApiParam(required = true) @RequestBody @Valid final Customer customer)
			throws UpdateFailedException {
		return customerService.update(customer);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a single customer.", notes = "You have to provide a valid customer ID.")
	public void delete(@ApiParam(required = true) @PathVariable final Long id) throws DeleteFailedException {
		customerService.delete(id);
	}

}
