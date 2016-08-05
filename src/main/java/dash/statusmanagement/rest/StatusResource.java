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

package dash.statusmanagement.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.NotFoundException;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.business.ProcessRepository;
import dash.salemanagement.domain.Sale;
import dash.statusmanagement.domain.Status;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

//TODO wieso status resource? process resource,leadresource... usw können das gleiche bieten. Auch von der Logik her. Status Resource sollte wenn dann nen angefragten Status zurückgeben.
@RestController(value = "State Resource")
@RequestMapping(value = "/api/rest/processes/state", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "State API")
public class StatusResource {

	@Autowired
	private ProcessRepository processRepository;

	@ApiOperation(value = "Returns list of leads, which are related to a process status.", notes = "")
	@RequestMapping(value = "/{status}/leads", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Lead> getLeadsByProcessStatus(@ApiParam(required = true) @PathVariable Status status)
			throws NotFoundException {
		// return processRepository.findByStatusAndLeadIsNotNull(status);
		return null;
	}

	@ApiOperation(value = "Returns list of offers, which are related to a process status.", notes = "")
	@RequestMapping(value = "/{status}/offers", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Offer> getOffersByProcessStatus(@ApiParam(required = true) @PathVariable Status status)
			throws NotFoundException {
		// return processRepository.findByStatusAndOfferIsNotNull(status);
		return null;
	}

	@ApiOperation(value = "Returns list of sales, which are related to a process status.", notes = "")
	@RequestMapping(value = "/{status}/sales", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Sale> getSalesByProcessStatus(@ApiParam(required = true) @PathVariable final Status status)
			throws NotFoundException {
		// return processRepository.findByStatusAndSaleIsNotNull(status);
		return null;
	}

	@ApiOperation(value = "Returns list of Follow Ups, which are related to a process status.", notes = "")
	@RequestMapping(value = "/{status}/followups", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Offer> getFollowUpsByProcessStatus(@ApiParam(required = true) @PathVariable Status status)
			throws NotFoundException {
		// return
		// processRepository.findByStatusAndOfferIsNotNull(Status.FOLLOWUP);
		return null;
	}

}
