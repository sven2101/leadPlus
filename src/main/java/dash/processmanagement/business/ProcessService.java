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

package dash.processmanagement.business;

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.OFFER_NOT_FOUND;
import static dash.Constants.PROCESS_NOT_FOUND;
import static dash.Constants.UPDATE_FAILED_EXCEPTION;
import static dash.Constants.USER_NOT_FOUND;
import static dash.processmanagement.business.ProcessSpecs.hasProcessorInDistinct;
import static dash.processmanagement.business.ProcessSpecs.isBetweenTimestamp;
import static dash.processmanagement.business.ProcessSpecs.isClosed;
import static dash.processmanagement.business.ProcessSpecs.isDeleted;
import static dash.processmanagement.business.ProcessSpecs.isProcessor;
import static dash.processmanagement.business.ProcessSpecs.isSale;
import static org.springframework.data.jpa.domain.Specifications.not;
import static org.springframework.data.jpa.domain.Specifications.where;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.metamodel.SingularAttribute;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dash.common.AbstractWorkflow;
import dash.consistencymanagement.business.ConsistencyService;
import dash.customermanagement.business.CustomerService;
import dash.customermanagement.domain.Customer;
import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.leadmanagement.business.ILeadService;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.business.IOfferService;
import dash.offermanagement.business.OfferService;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.salemanagement.business.ISaleService;
import dash.salemanagement.domain.Sale;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;
import dash.workflowmanagement.domain.Workflow;

@Service
@Transactional
public class ProcessService extends ConsistencyService {

	private static final Logger logger = Logger.getLogger(ProcessService.class);

	@Autowired
	private ProcessRepository processRepository;

	private UserService userService;
	private CustomerService customerService;

	@Autowired
	public ProcessService(UserService userService, CustomerService customerService, ILeadService leadService,
			IOfferService offerService, ISaleService saleService) {
		this.userService = userService;
		this.customerService = customerService;
	}

	public List<Process> getElementsByStatus(final Workflow workflow, final Status status) {
		List<Process> processes = new ArrayList<>();

		if (workflow.equals(Workflow.LEAD)) {
			processes = processRepository.findByStatusAndLeadIsNotNull(status);
			// TODO Workaround to get inContacts - function should accept an
			// array
			processes.addAll(processRepository.findByStatusAndLeadIsNotNull(Status.INCONTACT));
		} else if (workflow.equals(Workflow.OFFER)) {
			processes = processRepository.findByStatusAndOfferIsNotNull(status);
			// TODO Workaround to get followups - function should accept an
			// array
			processes.addAll(processRepository.findByStatusAndOfferIsNotNull(Status.FOLLOWUP));
			processes.addAll(processRepository.findByStatusAndOfferIsNotNull(Status.DONE));
		} else if (workflow.equals(Workflow.SALE)) {
			processes = processRepository.findByStatusAndSaleIsNotNull(status);
		}
		return processes;
	}

	public Process save(final Process process) throws ConsistencyFailedException {
		if (process == null) {
			logger.error(OFFER_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL);
			throw new IllegalArgumentException(
					OFFER_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL);
		}
		this.checkConsistencyAndSetTimestamp(process, processRepository);
		return processRepository.save(process);
	}

	public Lead createLead(final long processId, final Lead lead)
			throws SaveFailedException, ConsistencyFailedException {
		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			process.setLead(lead);
			process.setStatus(Status.OPEN);
			return save(process).getLead();
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
	}

	public Offer createOffer(final long processId, final Offer offer)
			throws SaveFailedException, ConsistencyFailedException {
		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			process.setOffer(offer);
			return save(process).getOffer();
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
	}

	public Sale createSale(final long processId, final Sale sale)
			throws SaveFailedException, ConsistencyFailedException {
		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			Customer updateCustomer = sale.getCustomer();
			updateCustomer.setRealCustomer(true);
			customerService.save(updateCustomer);
			process.setSale(sale);
			return save(process).getSale();
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
	}

	public Process setProcessor(final long processId, final long userId)
			throws NotFoundException, SaveFailedException, ConsistencyFailedException {
		Process process = getById(processId);
		final User processor = userService.getById(userId);
		if (!Optional.ofNullable(process).isPresent())
			throw new NotFoundException(PROCESS_NOT_FOUND);
		if (!Optional.ofNullable(processor).isPresent())
			throw new NotFoundException(USER_NOT_FOUND);
		try {
			Process copyProcess = (Process) process.clone();
			copyProcess.setProcessor(processor);
			return save(copyProcess);
		} catch (CloneNotSupportedException e) {
			logger.error("Cannot Copy Process" + ProcessService.class.getSimpleName() + e.getMessage(), e);
			e.printStackTrace();
		}
		return process;

	}

	public Process getById(final long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				Process x = processRepository.findOne(id);
				return x;
			} catch (Exception ex) {
				logger.error(PROCESS_NOT_FOUND + ProcessService.class.getSimpleName() + ex.getMessage(), ex);
				throw new NotFoundException(PROCESS_NOT_FOUND);
			}
		} else {
			NotFoundException cnfex = new NotFoundException(PROCESS_NOT_FOUND);
			logger.error(PROCESS_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}

	public Iterable<Process> getAll() {
		return processRepository.findAll();
	}

	public void delete(final long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				processRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(PROCESS_NOT_FOUND + OfferService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(PROCESS_NOT_FOUND + OfferService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}
	}

	public Process removeProcessorByProcessId(final long id) throws UpdateFailedException, ConsistencyFailedException {
		Process process = null;
		if (Optional.ofNullable(id).isPresent()) {
			process = getById(id);
			try {

				if (process == null)
					throw new NotFoundException(PROCESS_NOT_FOUND);
				Process copyProcess = (Process) process.clone();
				copyProcess.setProcessor(null);
				return save(copyProcess);
			} catch (EmptyResultDataAccessException | SaveFailedException | NotFoundException
					| CloneNotSupportedException ex) {
				logger.error(ProcessService.class.getSimpleName() + ex.getMessage(), ex);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(PROCESS_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
		return process;
	}

	public Process setStatus(long id, String status)
			throws SaveFailedException, NotFoundException, UpdateFailedException, ConsistencyFailedException {
		if (Optional.ofNullable(status).isPresent()) {
			Process process = getById(id);
			if (process == null)
				throw new NotFoundException(PROCESS_NOT_FOUND);
			try {
				Process copyProcess = (Process) process.clone();
				copyProcess.setStatus(Status.valueOf(status));
				return save(copyProcess);
			} catch (CloneNotSupportedException e) {
				logger.error("Cannot Copy Process" + ProcessService.class.getSimpleName() + e.getMessage(), e);
				e.printStackTrace();
			}
			return process;
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(PROCESS_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}

	}

	public Page<Process> getProcessesByProcessor(long processorId) {
		return processRepository.findAll(where(isProcessor(processorId)).and(not(isClosed())).and(not(isSale())),
				new PageRequest(0, 20, Sort.Direction.ASC, "lead.timestamp"));
	}

	public List<Process> getProcessesByProcessorAndBetweenTimestampAndWorkflow(long processorId, Calendar from,
			Calendar until, SingularAttribute<Process, AbstractWorkflow> abstractWorkflowAttribute) {
		return processRepository.findAll(where(hasProcessorInDistinct(processorId))
				.and(isBetweenTimestamp(from, until, abstractWorkflowAttribute)).and(isDeleted(false)));
	}

	public List<Process> getProcessesBetweenTimestamp(Calendar from, Calendar until,
			SingularAttribute<Process, AbstractWorkflow> abstractWorkflowAttribute) {
		return processRepository
				.findAll(where(isBetweenTimestamp(from, until, abstractWorkflowAttribute)).and(isDeleted(false)));
	}

	public Map<String, Integer> getCountElementsByStatus(Workflow workflow, Status status) {
		int count = 0;
		if (workflow.equals(Workflow.LEAD)) {
			count = processRepository.countByStatusAndLeadIsNotNull(status);
			// TODO Workaround to get inContacts - function should accept an
			// array
			count += processRepository.countByStatusAndLeadIsNotNull(Status.INCONTACT);
		} else if (workflow.equals(Workflow.OFFER)) {
			count = processRepository.countByStatusAndOfferIsNotNull(status);
			// TODO Workaround to get followups - function should accept an
			// array
			count += processRepository.countByStatusAndOfferIsNotNull(Status.FOLLOWUP);
			count += processRepository.countByStatusAndOfferIsNotNull(Status.DONE);
		} else if (workflow.equals(Workflow.SALE)) {
			count = processRepository.countByStatusAndSaleIsNotNull(status);
		}
		Map<String, Integer> returnMap = new HashMap<String, Integer>();
		returnMap.put("value", count);
		return returnMap;
	}

	public Map<String, Double> getSumTurnoverByStatus(Status status) {
		if (status == null)
			return null;
		double sum = 0;
		Map<String, Double> returnMap = new HashMap<String, Double>();
		if (status.equals(Status.OPEN) || status.equals(Status.INCONTACT)) {
			List<Process> processes = processRepository.findByStatusAndLeadIsNotNull(status);
			for (Process p : processes) {
				sum += p.getLead().getSumOrderpositions();
			}
		} else if (status.equals(Status.OFFER) || status.equals(Status.DONE)) {
			try {
				Collection<Status> colStatus = new ArrayList<>();
				colStatus.add(status);
				if (status.equals(Status.OFFER)) {
					colStatus.add(Status.FOLLOWUP);
				}
				sum = processRepository.getOfferSumByStatus(colStatus);
			} catch (NullPointerException ex) {
				sum = 0;
			}
		} else if (status.equals(Status.SALE)) {
			Calendar todayMidnight = Calendar.getInstance();
			todayMidnight.set(Calendar.HOUR_OF_DAY, 0);
			todayMidnight.set(Calendar.MINUTE, 0);
			todayMidnight.set(Calendar.SECOND, 0);
			todayMidnight.set(Calendar.MILLISECOND, 0);
			try {
				sum = processRepository.getSaleSumByStatus(todayMidnight);
			} catch (NullPointerException ex) {
				sum = 0;
			}
		}
		returnMap.put("value", sum);
		return returnMap;
	}

	public Page<Process> getAllProcessesByStatusAndSearchTextAndMyTasksPage(Collection<Status> status, int page,
			int size, String directionString, String properties, String searchText, Long userId, boolean salesToday) {
		page = page < 0 ? 0 : page;
		size = size < 0 ? 0 : size;
		Sort.Direction direction = "ASC".equals(directionString) ? Sort.Direction.ASC : Sort.Direction.DESC;
		properties = "null".equals(properties) ? "lead.timestamp" : properties;
		Calendar todayMidnight = Calendar.getInstance();
		todayMidnight.set(Calendar.HOUR_OF_DAY, 0);
		todayMidnight.set(Calendar.MINUTE, 0);
		todayMidnight.set(Calendar.SECOND, 0);
		todayMidnight.set(Calendar.MILLISECOND, 0);
		if (!salesToday) {
			todayMidnight.set(Calendar.YEAR, 2014);
		}
		if (("null".equals(searchText) || "".equals(searchText)) && userId == 0) {
			if (status.contains(Status.SALE)) {
				return processRepository.findBySaleIsNotNullAndSaleTimestampAfter(todayMidnight,
						new PageRequest(page, size, direction, properties));
			} else if (status.contains(Status.OPEN) || status.contains(Status.INCONTACT)) {
				return processRepository.findByStatusInAndLeadIsNotNull(status,
						new PageRequest(page, size, direction, properties));
			} else if (status.contains(Status.OFFER) || status.contains(Status.DONE)) {
				return processRepository.findByStatusInAndOfferIsNotNull(status,
						new PageRequest(page, size, direction, properties));
			}
		} else if (!("null".equals(searchText) && "".equals(searchText)) && userId == 0) {
			if (status.contains(Status.OPEN) || status.contains(Status.INCONTACT)) {
				return processRepository.findLeadProcessesByStatusAndSearchText(searchText, status,
						new PageRequest(page, size, direction, properties));
			} else if (status.contains(Status.OFFER) || status.contains(Status.DONE)) {
				return processRepository.findOfferProcessesByStatusAndSearchText(searchText, status,
						new PageRequest(page, size, direction, properties));
			} else if (status.contains(Status.SALE)) {
				return processRepository.findSaleProcessesByStatusAndSearchText(searchText, status, todayMidnight,
						new PageRequest(page, size, direction, properties));
			}

		} else if (("null".equals(searchText) || "".equals(searchText)) && userId > 0) {
			final User processor = userService.getById(userId);
			if (status.contains(Status.SALE)) {
				return processRepository.findBySaleIsNotNullAndProcessorAndSaleTimestampAfter(processor, todayMidnight,
						new PageRequest(page, size, direction, properties));
			} else if (status.contains(Status.OPEN) || status.contains(Status.INCONTACT)) {
				return processRepository.findByStatusInAndProcessorAndLeadIsNotNull(status, processor,
						new PageRequest(page, size, direction, properties));
			} else if (status.contains(Status.OFFER) || status.contains(Status.DONE)) {
				return processRepository.findByStatusInAndProcessorAndOfferIsNotNull(status, processor,
						new PageRequest(page, size, direction, properties));
			}

		} else if (!("null".equals(searchText) && "".equals(searchText)) && userId > 0) {
			final User processor = userService.getById(userId);
			if (status.contains(Status.OPEN) || status.contains(Status.INCONTACT)) {
				return processRepository.findMyLeadProcessesByStatusAndSearchText(searchText, status, processor,
						new PageRequest(page, size, direction, properties));
			} else if (status.contains(Status.OFFER) || status.contains(Status.DONE)) {
				return processRepository.findMyOfferProcessesByStatusAndSearchText(searchText, status, processor,
						new PageRequest(page, size, direction, properties));
			} else if (status.contains(Status.SALE)) {
				return processRepository.findMySaleProcessesByStatusAndSearchText(searchText, status, processor,
						todayMidnight, new PageRequest(page, size, direction, properties));
			}

		}
		return null;

	}
}
