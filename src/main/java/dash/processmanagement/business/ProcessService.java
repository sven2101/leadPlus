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
import static dash.Constants.SAVE_FAILED_EXCEPTION;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.metamodel.SingularAttribute;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dash.commentmanagement.domain.Comment;
import dash.common.AbstractWorkflow;
import dash.customermanagement.business.CustomerService;
import dash.customermanagement.domain.Customer;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.leadmanagement.business.ILeadService;
import dash.leadmanagement.domain.Lead;
import dash.notificationmanagement.domain.Attachment;
import dash.notificationmanagement.domain.Notification;
import dash.offermanagement.business.IOfferService;
import dash.offermanagement.business.OfferService;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Process_;
import dash.processmanagement.domain.Processor;
import dash.productmanagement.domain.OrderPosition;
import dash.salemanagement.business.ISaleService;
import dash.salemanagement.domain.Sale;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;
import dash.workflowmanagement.domain.Workflow;

@Service
public class ProcessService implements IProcessService {

	private static final Logger logger = Logger.getLogger(ProcessService.class);

	@Autowired
	private ProcessRepository processRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private ILeadService leadService;

	@Autowired
	private IOfferService offerService;

	@Autowired
	private ISaleService saleService;

	@Override
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

	@Override
	public void saveProcesses(List<Process> processes) throws SaveFailedException {
		for (Process process : processes) {
			setOrderPositions(process);
			setNotifications(process);
			if (Optional.ofNullable(process.getLead()).isPresent())
				leadService.save(process.getLead());
			if (Optional.ofNullable(process.getOffer()).isPresent())
				offerService.save(process.getOffer());
			if (Optional.ofNullable(process.getSale()).isPresent()) {
				// try {
				// process.setProcessor(userService.getUserByName("admin"));
				// } catch (NotFoundException nfex) {
				// logger.error(PROCESS_NOT_FOUND +
				// ProcessService.class.getSimpleName() +
				// BECAUSE_OF_OBJECT_IS_NULL,
				// nfex);
				// }
				saleService.save(process.getSale());
			}
			save(process);
		}
	}

	@Override
	public Process save(final Process process) throws SaveFailedException {
		if (Optional.ofNullable(process).isPresent()) {
			setOrderPositions(process);
			setNotifications(process);
			setComments(process);
			return processRepository.save(process);
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(OFFER_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

	@Override
	public Lead createLead(final long processId, final Lead lead) throws SaveFailedException {
		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			process.setLead(lead);
			process.setStatus(Status.OPEN);
			return save(process).getLead();
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
	}

	@Override
	public Offer createOffer(final long processId, final Offer offer) throws SaveFailedException {
		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			process.setOffer(offer);
			return save(process).getOffer();
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
	}

	@Override
	public Sale createSale(final long processId, final Sale sale) throws SaveFailedException {
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

	@Override
	public User setProcessor(final long processId, final long userId) throws NotFoundException, SaveFailedException {
		Process process = processRepository.findOne(processId);
		final User processor = userService.getById(userId);
		if (!Optional.ofNullable(process).isPresent())
			throw new NotFoundException(PROCESS_NOT_FOUND);
		if (!Optional.ofNullable(processor).isPresent())
			throw new NotFoundException(USER_NOT_FOUND);
		process.setProcessor(processor);
		save(process);
		return processor;
	}

	@Override
	public Process update(final Process process) throws UpdateFailedException {
		if (Optional.ofNullable(process).isPresent()) {
			try {
				return save(process);
			} catch (IllegalArgumentException | SaveFailedException ex) {
				logger.error(ex.getMessage() + ProcessService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(PROCESS_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}

	}

	@Override
	public List<Process> getProcessWithLatestSales(int amount) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Process getById(final long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				return processRepository.findOne(id);
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

	@Override
	public Iterable<Process> getAll() {
		return processRepository.findAll();
	}

	@Override
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

	@Override
	public void removeProcessorByProcessId(final long id) throws UpdateFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				Process process = getById(id);
				process.setProcessor(null);
				save(process);
			} catch (EmptyResultDataAccessException | SaveFailedException | NotFoundException ex) {
				logger.error(ProcessService.class.getSimpleName() + ex.getMessage(), ex);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(PROCESS_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	@Override
	public Process setStatus(long id, String status)
			throws SaveFailedException, NotFoundException, UpdateFailedException {
		if (Optional.ofNullable(status).isPresent()) {
			Process process = getById(id);
			process.setStatus(Status.valueOf(status));
			return save(process);
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(PROCESS_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}

	}

	private void setOrderPositions(Process process) {
		if (process == null) {
			return;
		}
		if (process.getLead() != null) {
			for (OrderPosition temp : process.getLead().getOrderPositions()) {
				temp.setWorkflow(process.getLead());
			}
		}
		if (process.getOffer() != null) {
			for (OrderPosition temp : process.getOffer().getOrderPositions()) {
				temp.setWorkflow(process.getOffer());
			}
		}
		if (process.getSale() != null) {
			for (OrderPosition temp : process.getSale().getOrderPositions()) {
				temp.setWorkflow(process.getSale());
			}
		}
		if (process.getFormerProcessors() != null) {
			for (Processor temp : process.getFormerProcessors()) {
				temp.setProcess(process);
			}
		}
	}

	private void setNotifications(Process process) {
		if (process.getNotifications() != null) {
			for (Notification notification : process.getNotifications()) {
				if (process.getNotifications() != null) {
					for (Attachment attachment : notification.getAttachments()) {
						attachment.setNotification(notification);
					}
				}
				notification.setProcess(process);
			}
		}

	}

	private void setComments(Process process) {
		if (process.getComments() != null) {
			for (Comment comment : process.getComments()) {
				comment.setProcess(process);
			}
		}
	}

	@Override
	public List<Process> getProcessesByProcessor(long processorId) {
		return processRepository.findAll(where(isProcessor(processorId)).and(not(isClosed())).and(not(isSale())));
	}

	@Override
	public List<Process> getProcessesByProcessorAndBetweenTimestamp(long processorId, Calendar from, Calendar until) {
		return processRepository.findAll(
				where(hasProcessorInDistinct(processorId)).and(isBetweenTimestamp(from, until, Process_.lead)));
	}

	@Override
	public List<Process> getProcessesBetweenTimestamp(Calendar from, Calendar until,
			SingularAttribute<Process, AbstractWorkflow> abstractWorkflowAttribute) {
		return processRepository
				.findAll(where(isBetweenTimestamp(from, until, abstractWorkflowAttribute)).and(isDeleted(false)));
	}

	@Override
	public Map<String,Integer> getCountElementsByStatus(Workflow workflow, Status status) {
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
		Map<String,Integer> returnMap = new HashMap<String, Integer>();
		returnMap.put("value", count);
		return returnMap; 
	}
}
