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

import com.google.common.base.Optional;

import dash.customermanagement.business.CustomerRepository;
import dash.customermanagement.domain.Customer;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api/rest/processes/sales/customers")
@Api(value = "Prospects API")
public class CustomerResource {

	@Autowired
	private CustomerRepository customerRepository;

	@RequestMapping(method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Customers", notes = "")
	public Iterable<Customer> get() {
		return customerRepository.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get a single customer.", notes = "You have to provide a valid customer ID.")
	public Customer findById(@ApiParam(required = true) @PathVariable Long id) {
		return customerRepository.findOne(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Update a single customer.", notes = "You have to provide a valid customer ID.")
	public Customer update(@ApiParam(required = true) @PathVariable Long id, @ApiParam(required = true) @RequestBody @Valid Customer updateCustomer) {
		Customer customer = customerRepository.findOne(id);
		if (Optional.fromNullable(customer).isPresent()) {
			customer.setFirstname(updateCustomer.getFirstname());
			customer.setLastname(updateCustomer.getLastname());
			customer.setCompany(updateCustomer.getCompany());
			customer.setEmail(updateCustomer.getEmail());
			customer.setPhone(updateCustomer.getPhone());
			customer.setTitle(updateCustomer.getTitle());
		}
		return customer;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a single customer.", notes = "You have to provide a valid customer ID.")
	public void delete(@ApiParam(required = true) @PathVariable Long id) {
		customerRepository.delete(id);
	}

}
