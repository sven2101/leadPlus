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
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.leadmanagement.business.LeadService;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.business.OfferService;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.processmanagement.domain.Workflow;
import dash.processmanagement.request.Request;
import dash.salemanagement.business.SaleService;
import dash.salemanagement.domain.Sale;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;

@Service
public class ProcessService implements IProcessService {

	private static final Logger logger = Logger.getLogger(ProcessService.class);

	@Autowired
	private ProcessRepository processRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private LeadService leadService;

	@Autowired
	private OfferService offerService;

	@Autowired
	private SaleService saleService;

	@Override
	public List<Request> getElementsByStatus(Status status, Workflow workflow) {

		List<Process> processes = processRepository.findProcessesByStatus(status);
		List<Request> elements = new ArrayList<>();

		if (workflow == Workflow.LEAD) {
			for (Process process : processes) {
				elements.add(process.getLead());
			}
		} else if (workflow == Workflow.OFFER) {
			for (Process process : processes) {
				elements.add(process.getOffer());
			}
		} else if (workflow == Workflow.SALE) {
			for (Process process : processes) {
				elements.add(process.getSale());
			}
		}

		return elements;
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
					logger.error(PROCESS_NOT_FOUND + ProcessService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, nfex);
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
	public Lead createLead(Long processId, Lead lead) throws SaveFailedException {
		Process process = processRepository.findOne(processId);
		Lead createdLead;
		if (Optional.ofNullable(process).isPresent()) {
			createdLead = leadService.save(lead);
			process.setLead(lead);
			processRepository.save(process);
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
		return createdLead;
	}

	@Override
	public Offer createOffer(Long processId, Offer offer) throws SaveFailedException {
		Process process = processRepository.findOne(processId);
		Offer createdOffer;
		if (Optional.ofNullable(process).isPresent()) {
			createdOffer = offerService.save(offer);
			process.setOffer(offer);
			processRepository.save(process);
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
		return createdOffer;
	}

	@Override
	public Sale createSale(Long processId, Sale sale) throws SaveFailedException {
		Process process = processRepository.findOne(processId);
		Sale createdSale;
		if (Optional.ofNullable(process).isPresent()) {
			createdSale = saleService.save(sale);
			process.setSale(sale);
			processRepository.save(process);
		} else {
			throw new SaveFailedException(PROCESS_NOT_FOUND);
		}
		return createdSale;
	}

	@Override
	public User setProcessor(Long processId, String username) throws NotFoundException {
		Process process = processRepository.findOne(processId);
		final User processor = userService.getUserByName(username);
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
	public Status updateStatus(Long processId, Status status) throws UpdateFailedException {
		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			process.setStatus(status);
			processRepository.save(process);
		} else {
			throw new UpdateFailedException(PROCESS_NOT_FOUND);
		}

		return status;
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
	public Process getById(Long id) throws NotFoundException {
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
}
