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

import static dash.Constants.PROCESS_NOT_FOUND;
import static dash.Constants.USER_NOT_FOUND;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dash.exceptions.ProcessNotFoundException;
import dash.leadmanagement.business.ILeadService;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.business.IOfferService;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.salemanagement.business.ISaleService;
import dash.salemanagement.domain.Sale;
import dash.usermanagement.business.UserRepository;
import dash.usermanagement.domain.User;

@Service
public class ProcessService implements IProcessService {

	@Autowired
	private ProcessRepository processRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ILeadService leadService;

	@Autowired
	private IOfferService offerService;

	@Autowired
	private ISaleService saleService;

	@Override
	public List<?> getElementsByStatus(Status status, String kind) {

		List<Process> processes = processRepository.findProcessesByStatus(status);
		List<Object> elements = new ArrayList<>();

		if (kind == "lead") {
			for (Process process : processes) {
				elements.add(process.getLead());
			}
		} else if (kind == "offer") {
			for (Process process : processes) {
				elements.add(process.getOffer());
			}
		} else if (kind == "sale") {
			for (Process process : processes) {
				elements.add(process.getSale());
			}
		}

		return elements;
	}

	@Override
	public void createProcesses(List<Process> processes) {
		for (Process process : processes) {

			if (Optional.ofNullable(process.getLead()).isPresent())
				leadService.createLead(process.getLead());
			if (Optional.ofNullable(process.getOffer()).isPresent())
				offerService.createOffer(process.getOffer());
			if (Optional.ofNullable(process.getSale()).isPresent()) {
				process.setProcessor(userRepository.findByUsernameIgnoreCase("admin"));
				saleService.createSale(process.getSale());
			}

			processRepository.save(process);
		}
	}

	@Override
	public Process createProcess(Process process) {
		Process createdProcess = null;
		if (Optional.ofNullable(process).isPresent()) {
			if (Optional.ofNullable(process.getProcessor()).isPresent()) {
				if (!Optional.ofNullable(userRepository.findByUsernameIgnoreCase(process.getProcessor().getUsername())).isPresent()) {
					userRepository.save(process.getProcessor());
				}
			}
			if (Optional.ofNullable(process.getLead()).isPresent())
				leadService.createLead(process.getLead());

			if (Optional.ofNullable(process.getOffer()).isPresent())
				offerService.createOffer(process.getOffer());

			if (Optional.ofNullable(process.getSale()).isPresent())
				saleService.createSale(process.getSale());

			createdProcess = processRepository.save(process);
		}
		return createdProcess;
	}

	@Override
	public Lead createLead(Long processId, Lead lead) throws ProcessNotFoundException {
		Process process = processRepository.findOne(processId);
		Lead createdLead;
		if (Optional.ofNullable(process).isPresent()) {
			createdLead = leadService.createLead(lead);
			process.setLead(lead);
			processRepository.save(process);
		} else {
			throw new ProcessNotFoundException(PROCESS_NOT_FOUND);
		}
		return createdLead;
	}

	@Override
	public Offer createOffer(Long processId, Offer offer) throws ProcessNotFoundException {
		Process process = processRepository.findOne(processId);
		Offer createdOffer;
		if (Optional.ofNullable(process).isPresent()) {
			createdOffer = offerService.createOffer(offer);
			process.setOffer(offer);
			processRepository.save(process);
		} else {
			throw new ProcessNotFoundException(PROCESS_NOT_FOUND);
		}
		return createdOffer;
	}

	@Override
	public Sale createSale(Long processId, Sale sale) throws ProcessNotFoundException {
		Process process = processRepository.findOne(processId);
		Sale createdSale;
		if (Optional.ofNullable(process).isPresent()) {
			createdSale = saleService.createSale(sale);
			process.setSale(sale);
			processRepository.save(process);
		} else {
			throw new ProcessNotFoundException(PROCESS_NOT_FOUND);
		}
		return createdSale;
	}

	@Override
	public User createProcessor(Long processId, String username) throws Exception {
		Process process = processRepository.findOne(processId);
		final User processor = userRepository.findByUsernameIgnoreCase(username);
		if (!Optional.ofNullable(process).isPresent())
			throw new ProcessNotFoundException(PROCESS_NOT_FOUND);
		if (!Optional.ofNullable(processor).isPresent())
			throw new UsernameNotFoundException(USER_NOT_FOUND);
		if (!Optional.ofNullable(process.getProcessor()).isPresent()) {
			process.setProcessor(processor);
			processRepository.save(process);
		}
		return processor;
	}

	@Override
	public Status updateStatus(Long processId, Status status) throws ProcessNotFoundException {
		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			process.setStatus(status);
			processRepository.save(process);
		} else {
			throw new ProcessNotFoundException(PROCESS_NOT_FOUND);
		}

		return status;
	}

	@Override
	public Process updateProcess(Long processId, Process updateProcess) throws ProcessNotFoundException {

		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			process.setLead(updateProcess.getLead());
			process.setOffer(updateProcess.getOffer());
			process.setSale(updateProcess.getSale());
			process.setStatus(updateProcess.getStatus());
			process.setProcessor(updateProcess.getProcessor());
			return processRepository.save(process);
		} else {
			throw new ProcessNotFoundException(PROCESS_NOT_FOUND);
		}

	}

}