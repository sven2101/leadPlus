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

import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.business.ProcessRepository;
import dash.processmanagement.business.ProcessService;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.processmanagement.request.Request;
import dash.salemanagement.domain.Sale;
import dash.usermanagement.domain.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping(value = "/api/rest/processes", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Process API")
public class ProcessResource {

	@Autowired
	private ProcessService processService;
	
	@Autowired
	private ProcessRepository processRepository;

	@ApiOperation(value = "Returns a single process.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Process findById(@ApiParam(required = true) @PathVariable Long id) throws NotFoundException {
		return processService.getProcessById(id);
	}

	@ApiOperation(value = "Returns all processes.", notes = "")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Process> get() {
		return processService.getAll();
	}

	@ApiOperation(value = "Returns processes with a certain state", notes = "")
	@RequestMapping(value = "/state/{status}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Request> get(@ApiParam(required = true) @PathVariable final Status status) {
		return processService.getElementsByStatus(status, null);
	}

	@ApiOperation(value = "Returns list of leads, which are related to a process status.", notes = "")
	@RequestMapping(value = "/state/{status}/leads", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Lead> getLeadsByProcessStatus(@ApiParam(required = true) @PathVariable String status) throws NotFoundException {
		return processRepository.findByStatusAndLeadIsNotNull(Status.valueOf(status));
	}

	// TODO workaround for follow ups
	// rebuild with a new api
	@ApiOperation(value = "Returns list of offers, which are related to a process status.", notes = "")
	@RequestMapping(value = "/state/{status}/offers", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Offer> getOffersByProcessStatus(@ApiParam(required = true) @PathVariable String status) throws NotFoundException {
		List<Offer> returnedOffers = processRepository.findByStatusAndOfferIsNotNull(Status.valueOf(status));
		if (Status.valueOf(status).equals(Status.OFFER))
			returnedOffers.addAll(processRepository.findByStatusAndOfferIsNotNull(Status.FOLLOWUP));
		return returnedOffers;
	}

	@ApiOperation(value = "Returns list of sales, which are related to a process status.", notes = "")
	@RequestMapping(value = "/state/{status}/sales", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Sale> getSalesByProcessStatus(@ApiParam(required = true) @PathVariable final Status status) throws NotFoundException {
		return processRepository.findByStatusAndSaleIsNotNull(status);
	}

	@ApiOperation(value = "Returns status", notes = "")
	@RequestMapping(value = "/{processId}/status", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Status getStatusByProcessId(@ApiParam(required = true) @PathVariable final Long processId) {
		return processRepository.findOne(processId).getStatus();
	}

	@ApiOperation(value = "Update a single process.", notes = "")
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Process update(@ApiParam(required = true) @RequestBody @Valid final Process updateProcess) throws NotFoundException {
		return processService.update(updateProcess);
	}

	@ApiOperation(value = "Returns processor.", notes = "")
	@RequestMapping(value = "/{processId}/processor", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public User getProcessor(@ApiParam(required = true) @PathVariable Long processId) {
		return processRepository.findOne(processId).getProcessor();
	}

	@ApiOperation(value = "Puts processor to process", notes = "")
	@RequestMapping(value = "/{processId}/processors", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void createProcessorByProcessId(@PathVariable final Long processId, @RequestBody final String username) throws Exception {
		processService.setProcessor(processId, username);
	}

	@ApiOperation(value = "Remove processor from process", notes = "")
	@RequestMapping(value = "/{processId}/processors/remove", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void removeProcessorByProcessId(@PathVariable final Long processId) throws Exception {
		Process process = processRepository.findOne(processId);
		process.setProcessor(null);
		processRepository.save(process);
	}

	@ApiOperation(value = "Delete a single process.", notes = "")
	@RequestMapping(value = "/{processId}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable final Long processId) {
		processRepository.delete(processId);
	}

	@ApiOperation(value = "Creates a process.", notes = "")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Process save(@RequestBody @Valid final Process process) throws SaveFailedException, NotFoundException {
		return processService.save(process);
	}

	@ApiOperation(value = "Creates processes based on a List of Processes.", notes = "")
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public void saveProcesses(@RequestBody final List<Process> processes) throws SaveFailedException, NotFoundException {
		processService.saveProcesses(processes);
	}

	@ApiOperation(value = "Modifie status.", notes = "")
	@RequestMapping(value = "/{processId}/status", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void updateStatusByProcessId(@PathVariable final Long processId, @RequestBody @Valid final Status status) throws NotFoundException {
		processService.updateStatus(processId, status);
	}

	@ApiOperation(value = "Returns a list of leads.", notes = "")
	@RequestMapping(value = "/leads", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public DatatableServerSideJsonObject getProcessWithLeads(@RequestParam Integer draw, @RequestParam Integer start, @RequestParam Integer length,
			@RequestParam(value = "search[value]") String searchText, @RequestParam(value = "order[0][column]") int orderCol,
			@RequestParam(value = "order[0][dir]") String orderDir) {
		String sortColumn = "lead.timestamp";
		if (orderCol == 1)
			sortColumn = "lead.inquirer.lastname";
		else if (orderCol == 2)
			sortColumn = "lead.inquirer.company";
		else if (orderCol == 3)
			sortColumn = "lead.inquirer.email";
		else if (orderCol == 4)
			sortColumn = "lead.timestamp";
		else if (orderCol == 12)
			sortColumn = "status";

		Sort.Direction sortDirection = Sort.Direction.ASC;
		if (orderDir.equals("desc"))
			sortDirection = Sort.Direction.DESC;
		Page page;

		if (null == searchText || searchText.equals(""))
			page = processRepository.findByLeadIsNotNull(new PageRequest(start / length, length, sortDirection, sortColumn));
		else
			page = processRepository
					.findByLeadInquirerFirstnameContainingOrLeadInquirerLastnameContainingOrLeadInquirerEmailContainingOrLeadInquirerCompanyContainingOrLeadInquirerPhoneContainingOrLeadContainerNameContainingOrLeadContainerDescriptionContainingOrLeadDestinationContainingOrLeadMessageContainingOrStatusContainingAllIgnoreCaseAndLeadIsNotNull(
							searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText,
							new PageRequest(start / length, length, sortDirection, sortColumn));

		return new DatatableServerSideJsonObject(draw, page.getTotalElements(), page.getTotalElements(), page.getContent());
	}

	@ApiOperation(value = "Return a single lead.", notes = "")
	@RequestMapping(value = "/{processId}/leads", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Lead getLeadByProcess(@PathVariable final Long processId) {
		return processRepository.findOne(processId).getLead();
	}

	@ApiOperation(value = "Creates a single lead.", notes = "")
	@RequestMapping(value = "/{processId}/leads", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Lead createLeadByProcess(@PathVariable final Long processId, @RequestBody @Valid final Lead lead) throws NotFoundException, SaveFailedException {
		return processService.createLead(processId, lead);
	}

	@ApiOperation(value = "Returns a list of offers.", notes = "")
	@RequestMapping(value = "/offers", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public DatatableServerSideJsonObject getProcessWithOffers(@RequestParam Integer draw, @RequestParam Integer start, @RequestParam Integer length,
			@RequestParam(value = "search[value]") String searchText, @RequestParam(value = "order[0][column]") int orderCol,
			@RequestParam(value = "order[0][dir]") String orderDir) {
		String sortColumn = "offer.timestamp";
		if (orderCol == 1)
			sortColumn = "offer.prospect.lastname";
		else if (orderCol == 2)
			sortColumn = "offer.prospect.company";
		else if (orderCol == 3)
			sortColumn = "offer.prospect.email";
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
					.findByOfferProspectFirstnameContainingOrOfferProspectLastnameContainingOrOfferProspectEmailContainingOrOfferProspectCompanyContainingOrOfferProspectPhoneContainingOrOfferContainerNameContainingOrOfferContainerDescriptionContainingOrOfferDeliveryAddressContainingOrStatusContainingAllIgnoreCaseAndOfferIsNotNull(
							searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText,
							new PageRequest(start / length, length, sortDirection, sortColumn));

		return new DatatableServerSideJsonObject(draw, page.getTotalElements(), page.getTotalElements(), page.getContent());
	}

	@ApiOperation(value = "Returns single offer.", notes = "")
	@RequestMapping(value = "{processId}/offers", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Offer getOfferByProcess(@PathVariable final Long processId) {
		return processRepository.findOne(processId).getOffer();
	}

	@ApiOperation(value = "Creates a single offer.", notes = "")
	@RequestMapping(value = "/{processId}/offers", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Offer createOfferByProcess(@PathVariable final Long processId, @RequestBody @Valid final Offer offer) throws NotFoundException, SaveFailedException {
		return processService.createOffer(processId, offer);
	}

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
					.findBySaleCustomerFirstnameContainingOrSaleCustomerLastnameContainingOrSaleCustomerEmailContainingOrSaleCustomerCompanyContainingOrSaleCustomerPhoneContainingOrSaleContainerNameContainingOrSaleContainerDescriptionContainingOrSaleTransportContainingOrStatusContainingAllIgnoreCaseAndSaleIsNotNull(
							searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText,
							new PageRequest(start / length, length, sortDirection, sortColumn));

		return new DatatableServerSideJsonObject(draw, page.getTotalElements(), page.getTotalElements(), page.getContent());
	}

	@ApiOperation(value = "Returns a list of latest 10 sales.", notes = "")
	@RequestMapping(value = "/sales/latest/{amount}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Sale> getProcessWithLatestSales(@PathVariable final int amount) {
		return processRepository.findTopBySaleIsNotNullOrderBySaleTimestampDesc(amount);
	}

	@ApiOperation(value = "Returns a single sale.", notes = "")
	@RequestMapping(value = "{processId}/sales", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Sale getSaleByProcess(@PathVariable Long processId) {
		return processRepository.findOne(processId).getSale();
	}

	@ApiOperation(value = "Creates a single sale.", notes = "")
	@RequestMapping(value = "/{processId}/sales", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Sale createSaleByProcess(@PathVariable Long processId, @RequestBody @Valid final Sale sale) throws NotFoundException, SaveFailedException {
		return processService.createSale(processId, sale);
	}
}
