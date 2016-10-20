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

package dash.processmanagement.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.business.IProcessService;
import dash.processmanagement.business.ProcessRepository;
import dash.processmanagement.domain.Process;
import dash.salemanagement.domain.Sale;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.domain.User;
import dash.workflowmanagement.domain.Workflow;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Process Resource")
@RequestMapping(value = "/api/rest/processes", consumes = { MediaType.ALL_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Process API")
public class ProcessResource {

	@Autowired
	private IProcessService processService;

	@Autowired
	private ProcessRepository processRepository;

	@ApiOperation(value = "Returns all processes.", notes = "")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Process> getAll() {
		return processService.getAll();
	}

	@ApiOperation(value = "Returns a single process.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Process getById(@ApiParam(required = true) @PathVariable final Long id) throws NotFoundException {
		return processService.getById(id);
	}

	@ApiOperation(value = "Returns processes with a certain state", notes = "")
	@RequestMapping(value = "workflow/{workflow}/state/{status}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Process> getElementsByStatus(@ApiParam(required = true) @PathVariable final Workflow workflow,
			@ApiParam(required = true) @PathVariable final Status status) {
		return processService.getElementsByStatus(workflow, status);

	}

	@ApiOperation(value = "Returns status", notes = "")
	@RequestMapping(value = "/{processId}/status", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Status getStatusByProcessId(@ApiParam(required = true) @PathVariable final Long processId) throws NotFoundException {
		return processService.getById(processId).getStatus();
	}

	@ApiOperation(value = "Set status of process", notes = "")
	@RequestMapping(value = "/{id}/status", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Process setStatusByProcessId(@ApiParam(required = true) @PathVariable final Long id,
			@ApiParam(required = true) @RequestBody @Valid final String status) throws NotFoundException, SaveFailedException, UpdateFailedException {

		return processService.setStatus(id, status);

	}

	@ApiOperation(value = "Update a single process.", notes = "")
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public Process update(@ApiParam(required = true) @RequestBody @Valid final Process updateProcess) throws UpdateFailedException {
		return processService.update(updateProcess);
	}

	@ApiOperation(value = "Returns processor.", notes = "")
	@RequestMapping(value = "/{processId}/processor", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public User getProcessor(@ApiParam(required = true) @PathVariable final Long processId) throws NotFoundException {
		return processService.getById(processId).getProcessor();
	}

	@ApiOperation(value = "Puts processor to process", notes = "")
	@RequestMapping(value = "/{id}/processors", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public User setProcessor(@ApiParam(required = true) @PathVariable final Long id, @RequestBody final long userId) throws Exception {
		return processService.setProcessor(id, userId);
	}

	@ApiOperation(value = "Remove processor from process", notes = "")
	@RequestMapping(value = "/{id}/processors", method = { RequestMethod.DELETE })
	@ResponseStatus(HttpStatus.OK)
	public void removeProcessorByProcessId(@ApiParam(required = true) @PathVariable final Long id) throws UpdateFailedException {
		processService.removeProcessorByProcessId(id);
	}

	@ApiOperation(value = "Delete a single process.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable final Long id) throws DeleteFailedException {
		processService.delete(id);
	}

	@ApiOperation(value = "Creates a process.", notes = "")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Process save(@RequestBody @Valid final Process process) throws SaveFailedException {
		return processService.save(process);
	}

	@ApiOperation(value = "Creates processes based on a List of Processes.", notes = "")
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public void saveProcesses(@RequestBody final List<Process> processes) throws SaveFailedException {
		processService.saveProcesses(processes);
	}

	/*
	 * Leads
	 */
	@ApiOperation(value = "Returns a list of leads.", notes = "")
	@RequestMapping(value = "/leads", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public DatatableServerSideJsonObject getProcessWithLeads(@RequestParam Integer draw, @RequestParam Integer start, @RequestParam Integer length,
			@RequestParam(value = "search[value]") String searchText, @RequestParam(value = "order[0][column]") int orderCol,
			@RequestParam(value = "order[0][dir]") String orderDir) {
		String sortColumn = "lead.timestamp";
		if (orderCol == 1)
			sortColumn = "lead.customer.lastname";
		else if (orderCol == 2)
			sortColumn = "lead.customer.company";
		else if (orderCol == 3)
			sortColumn = "lead.customer.email";
		else if (orderCol == 4)
			sortColumn = "lead.timestamp";
		else if (orderCol == 12)
			sortColumn = "status";

		Sort.Direction sortDirection = Sort.Direction.ASC;
		if (orderDir.equals("desc"))
			sortDirection = Sort.Direction.DESC;
		Page page;

		if (null == searchText || searchText.equals("")) {
			page = processRepository.findByLeadIsNotNull(new PageRequest(start / length, length, sortDirection, sortColumn));
		} else {
			page = processRepository
					.findByLeadCustomerFirstnameContainingOrLeadCustomerLastnameContainingOrLeadCustomerEmailContainingOrLeadCustomerCompanyContainingOrLeadCustomerPhoneContainingOrLeadDeliveryAddressContainingOrLeadMessageContainingOrStatusContainingAllIgnoreCaseAndLeadIsNotNull(
							searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText,
							new PageRequest(start / length, length, sortDirection, sortColumn));
		}
		return new DatatableServerSideJsonObject(draw, page.getTotalElements(), page.getTotalElements(), page.getContent());
	}

	@ApiOperation(value = "Return a single lead.", notes = "")
	@RequestMapping(value = "/{processId}/leads", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Lead getLeadByProcess(@PathVariable final Long processId) throws NotFoundException {
		return processService.getById(processId).getLead();
	}

	@ApiOperation(value = "Creates a single lead.", notes = "")
	@RequestMapping(value = "/{processId}/leads", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Lead createLeadByProcess(@PathVariable final Long processId, @RequestBody @Valid final Lead lead) throws NotFoundException, SaveFailedException {
		return processService.createLead(processId, lead);
	}

	/*
	 * Offers
	 */

	@ApiOperation(value = "Returns a list of offers.", notes = "")
	@RequestMapping(value = "/offers", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public DatatableServerSideJsonObject getProcessWithOffers(@RequestParam Integer draw, @RequestParam Integer start, @RequestParam Integer length,
			@RequestParam(value = "search[value]") String searchText, @RequestParam(value = "order[0][column]") int orderCol,
			@RequestParam(value = "order[0][dir]") String orderDir) {
		String sortColumn = "offer.timestamp";
		if (orderCol == 1)
			sortColumn = "offer.customer.lastname";
		else if (orderCol == 2)
			sortColumn = "offer.customer.company";
		else if (orderCol == 3)
			sortColumn = "offer.customer.email";
		else if (orderCol == 4)
			sortColumn = "offer.timestamp";
		else if (orderCol == 15)
			sortColumn = "status";

		Sort.Direction sortDirection = Sort.Direction.ASC;
		if (orderDir.equals("desc"))
			sortDirection = Sort.Direction.DESC;
		Page page;

		if (null == searchText || searchText.equals(""))
			page = processRepository.findByOfferIsNotNull(new PageRequest(start / length, length, sortDirection, sortColumn));
		else
			page = processRepository
					.findByOfferCustomerFirstnameContainingOrOfferCustomerLastnameContainingOrOfferCustomerEmailContainingOrOfferCustomerCompanyContainingOrOfferCustomerPhoneContainingOrOfferDeliveryAddressContainingOrStatusContainingAllIgnoreCaseAndOfferIsNotNull(
							searchText, searchText, searchText, searchText, searchText, searchText, searchText,
							new PageRequest(start / length, length, sortDirection, sortColumn));

		return new DatatableServerSideJsonObject(draw, page.getTotalElements(), page.getTotalElements(), page.getContent());
	}

	@ApiOperation(value = "Returns single offer.", notes = "")
	@RequestMapping(value = "{processId}/offers", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Offer getOfferByProcess(@PathVariable final Long processId) throws NotFoundException {
		return processService.getById(processId).getOffer();
	}

	@ApiOperation(value = "Creates a single offer.", notes = "")
	@RequestMapping(value = "/{processId}/offers", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Offer createOfferByProcess(@PathVariable final Long processId, @RequestBody @Valid final Offer offer) throws SaveFailedException {
		return processService.createOffer(processId, offer);
	}

	/*
	 * Sales
	 */
	@ApiOperation(value = "Returns a list of sales.", notes = "")
	@RequestMapping(value = "/sales", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public DatatableServerSideJsonObject getProcessWithSales(@RequestParam Integer draw, @RequestParam Integer start, @RequestParam Integer length,
			@RequestParam(value = "search[value]") String searchText, @RequestParam(value = "order[0][column]") int orderCol,
			@RequestParam(value = "order[0][dir]") String orderDir) {
		String sortColumn = "sale.timestamp";
		if (orderCol == 1)
			sortColumn = "sale.customer.lastname";
		else if (orderCol == 2)
			sortColumn = "sale.customer.company";
		else if (orderCol == 3)
			sortColumn = "sale.customer.email";
		else if (orderCol == 4)
			sortColumn = "sale.timestamp";
		else if (orderCol == 14)
			sortColumn = "status";

		Sort.Direction sortDirection = Sort.Direction.ASC;
		if (orderDir.equals("desc"))
			sortDirection = Sort.Direction.DESC;
		Page page;

		if (null == searchText || searchText.equals(""))
			page = processRepository.findBySaleIsNotNull(new PageRequest(start / length, length, sortDirection, sortColumn));
		else
			page = processRepository
					.findBySaleCustomerFirstnameContainingOrSaleCustomerLastnameContainingOrSaleCustomerEmailContainingOrSaleCustomerCompanyContainingOrSaleCustomerPhoneContainingOrStatusContainingAllIgnoreCaseAndSaleIsNotNull(
							searchText, searchText, searchText, searchText, searchText, searchText,
							new PageRequest(start / length, length, sortDirection, sortColumn));

		return new DatatableServerSideJsonObject(draw, page.getTotalElements(), page.getTotalElements(), page.getContent());
	}

	@ApiOperation(value = "Returns a list of latest 100 sales.", notes = "")
	@RequestMapping(value = "/sales/latest/100", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Sale> getProcessWithLatest100Sales() {
		return processRepository.findTop100BySaleIsNotNullOrderBySaleTimestampDesc();
	}

	@ApiOperation(value = "Returns a list of latest 10 sales.", notes = "")
	@RequestMapping(value = "/sales/latest/10", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Sale> getProcessWithLatest10Sales() {
		return processRepository.findTop10BySaleIsNotNullOrderBySaleTimestampDesc();
	}

	@ApiOperation(value = "Returns a single sale.", notes = "")
	@RequestMapping(value = "{processId}/sales", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Sale getSaleByProcess(@PathVariable final Long processId) throws NotFoundException {
		return processService.getById(processId).getSale();
	}

	@ApiOperation(value = "Creates a single sale.", notes = "")
	@RequestMapping(value = "/{processId}/sales", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Sale createSaleByProcess(@PathVariable Long processId, @RequestBody @Valid final Sale sale) throws NotFoundException, SaveFailedException {
		return processService.createSale(processId, sale);
	}

	@ApiOperation(value = "Get Processes by ProcessorId.", notes = "")
	@RequestMapping(value = "/processor/{processorId}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Process> createSaleByProcess(@PathVariable Long processorId) {
		return processService.getProcessesByProcessor(processorId);
	}

}
