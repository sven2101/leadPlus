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

import dash.salemanagement.business.SaleRepository;
import dash.salemanagement.domain.Sale;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api/rest/processes/sales")
@Api(value = "Sale API")
public class SaleResource {

	@Autowired
	private SaleRepository saleRepository;

	@ApiOperation(value = "Return a single sale.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Sale getSaleById(@PathVariable Long id) {
		return saleRepository.findOne(id);
	}

	@ApiOperation(value = "Update a single sale.", notes = "")
	@RequestMapping(method = RequestMethod.PUT, value = "/{id}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public Sale update(@ApiParam(required = true) @PathVariable Long id, @ApiParam(required = true) @RequestBody @Valid Sale updateSale) {
		Sale sale = saleRepository.findOne(id);

		//set prospect datas
		sale.getCustomer().setFirstname(updateSale.getCustomer().getFirstname());
		sale.getCustomer().setLastname(updateSale.getCustomer().getLastname());
		sale.getCustomer().setCompany(updateSale.getCustomer().getCompany());
		sale.getCustomer().setEmail(updateSale.getCustomer().getEmail());
		sale.getCustomer().setPhone(updateSale.getCustomer().getPhone());
		sale.getCustomer().setTitle(updateSale.getCustomer().getTitle());

		//set vendor datas
		sale.getVendor().setName(updateSale.getVendor().getName());
		sale.getVendor().setPhone(updateSale.getVendor().getPhone());

		//set container datas
		sale.getContainer().setName(updateSale.getContainer().getName());
		sale.getContainer().setDescription(updateSale.getContainer().getDescription());
		sale.getContainer().setPriceNetto(updateSale.getContainer().getPriceNetto());

		//set main data
		sale.setTimestamp(updateSale.getTimestamp());
		sale.setContainerAmount(updateSale.getContainerAmount());
		sale.setTransport(updateSale.getTransport());
		sale.setSaleReturn(updateSale.getSaleReturn());
		sale.setSaleProfit(updateSale.getSaleProfit());

		saleRepository.save(sale);

		return sale;
	}

	@ApiOperation(value = "Delete a single sale.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable Long id) {
		saleRepository.delete(id);
	}

}
