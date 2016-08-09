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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.leadmanagement.business.LeadService;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.business.OfferService;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.salemanagement.business.SaleService;
import dash.salemanagement.domain.Sale;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;
import dash.vendormanagement.business.VendorRepository;
import dash.vendormanagement.business.VendorService;
import dash.workflowmanagement.domain.Workflow;

@Service
public class ProcessService implements IProcessService {

	private static final Logger logger = Logger.getLogger(ProcessService.class);

	@Autowired
	private ProcessRepository processRepository;
	
	@Autowired
	private VendorService vendorService;

	@Autowired
	private UserService userService;

	@Autowired
	private LeadService leadService;

	@Autowired
	private OfferService offerService;

	@Autowired
	private SaleService saleService;

	@Override
	public List<Process> getElementsByStatus(final Workflow workflow, final Status status) {
		List<Process> processes = new ArrayList<>();

		if (workflow.equals(Workflow.LEAD)) {
			processes = processRepository.findByStatusAndLeadIsNotNull(status);
		} else if (workflow.equals(Workflow.OFFER)) {
			processes = processRepository.findByStatusAndOfferIsNotNull(status);
		} else if (workflow.equals(Workflow.SALE)) {
			processes = processRepository.findByStatusAndSaleIsNotNull(status);
		}
		return processes;
	}

	@Override
	public void saveProcesses(List<Process> processes) throws SaveFailedException {
		for (Process process : processes) {
			if (Optional.ofNullable(process.getLead()).isPresent())
				leadService.save(process.getLead());
			if (Optional.ofNullable(process.getOffer()).isPresent())
				offerService.save(process.getOffer());
			if (Optional.ofNullable(process.getSale()).isPresent()) {
				try {
					process.setProcessor(userService.getUserByName("admin"));
				} catch (NotFoundException nfex) {
					logger.error(PROCESS_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
							nfex);
				}
				saleService.save(process.getSale());
			}
			save(process);
		}
	}

	@Override
	public Process save(final Process process) throws SaveFailedException {
		if (Optional.ofNullable(process).isPresent()) {
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
		Lead createdLead;
		if (Optional.ofNullable(process).isPresent()) {
			createdLead = leadService.save(lead);
			process.setLead(lead);
			process.setStatus(Status.OPEN);
			processRepository.save(process);
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
		return createdLead;
	}

	@Override
	public Offer createOffer(final long processId, final Offer offer) throws SaveFailedException {
		Process process = processRepository.findOne(processId);
		Offer createdOffer = null;
		if (Optional.ofNullable(process).isPresent()) {
			//createdOffer = offerService.save(offer);
			process.setOffer(offer);
			processRepository.save(process);
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
		return createdOffer;
	}

	@Override
	public Sale createSale(final long processId, final Sale sale) throws SaveFailedException {
		Process process = processRepository.findOne(processId);
		Sale createdSale = null;
		if (Optional.ofNullable(process).isPresent()) {
			//createdSale = saleService.save(sale);
			process.setSale(sale);
			processRepository.save(process);
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
		return createdSale;
	}

	@Override
	public User setProcessor(final long processId, final long userId) throws NotFoundException {
		Process process = processRepository.findOne(processId);
		final User processor = userService.getById(userId);
		if (!Optional.ofNullable(process).isPresent())
			throw new NotFoundException(PROCESS_NOT_FOUND);
		if (!Optional.ofNullable(processor).isPresent())
			throw new NotFoundException(USER_NOT_FOUND);
		if (!Optional.ofNullable(process.getProcessor()).isPresent()) {
			process.setProcessor(processor);
			processRepository.save(process);
		}
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
			save(process);
			return process;
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(PROCESS_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}

	}
}
