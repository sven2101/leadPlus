package dash.processmanagement.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dash.exceptions.ProcessNotFoundException;
import dash.processmanagement.domain.Process;
import dash.processmanagement.lead.business.ILeadService;
import dash.processmanagement.lead.domain.Lead;
import dash.processmanagement.offer.business.IOfferService;
import dash.processmanagement.offer.domain.Offer;
import dash.processmanagement.sale.business.ISaleService;
import dash.processmanagement.sale.domain.Sale;
import dash.processmanagement.status.Status;
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
	public void createLead(Long processId, Lead lead) throws ProcessNotFoundException {
		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			leadService.createLead(lead);
			process.setLead(lead);
			processRepository.save(process);
		} else {
			throw new ProcessNotFoundException("Process not found");
		}
	}

	@Override
	public void createOffer(Long processId, Offer offer) throws ProcessNotFoundException {
		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			offerService.createOffer(offer);
			process.setOffer(offer);
			processRepository.save(process);
		} else {
			throw new ProcessNotFoundException("Process not found");
		}
	}

	@Override
	public void createSale(Long processId, Sale sale) throws ProcessNotFoundException {
		Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			saleService.createSale(sale);
			process.setSale(sale);
			processRepository.save(process);
		} else {
			throw new ProcessNotFoundException("Process not found");
		}
	}

	@Override
	public void createProcessor(Long processId, String username) throws Exception {
		Process process = processRepository.findOne(processId);
		final User processor = userRepository.findByUsernameIgnoreCase(username);
		if (!Optional.ofNullable(process).isPresent())
			throw new ProcessNotFoundException("Process not found");
		if (!Optional.ofNullable(processor).isPresent())
			throw new UsernameNotFoundException("User not found");
		if (!Optional.ofNullable(process.getProcessor()).isPresent()) {
			process.setProcessor(processor);
			processRepository.save(process);
		}

	}

	@Override
	public void updateStatus(Long processId, Status status) throws ProcessNotFoundException {
		Process process = processRepository.findOne(processId);

		if (Optional.ofNullable(process).isPresent()) {
			process.setStatus(status);
			processRepository.save(process);

		} else {
			throw new ProcessNotFoundException("Process not found");
		}
	}

}
