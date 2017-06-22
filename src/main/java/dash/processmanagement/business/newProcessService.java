package dash.processmanagement.business;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import dash.common.AbstractWorkflow;
import dash.customermanagement.business.CustomerService;
import dash.processmanagement.domain.Process;
import dash.statusmanagement.domain.Status;

@Service
@Transactional
public class newProcessService {

	ProcessRepository processRepository;
	CustomerService customerService;

	@Autowired
	public newProcessService(ProcessRepository processRepository, CustomerService customerService) {
		this.processRepository = processRepository;
		this.customerService = customerService;
	}

	public Page<Process> getAllProcessesWithLeadNotNullPage(int page, int size, String directionString,
			String properties) {
		page = page < 0 ? 0 : page;
		size = size < 0 ? 1 : size;
		Sort.Direction direction = "ASC".equals(directionString) ? Sort.Direction.ASC : Sort.Direction.DESC;
		properties = "null".equals(properties) ? "lead.timestamp" : properties;
		return processRepository.findByLeadIsNotNull(new PageRequest(page, size, direction, properties));
	}

	public Page<Process> getAllProcessesWithOfferNotNullPage(int page, int size, String directionString,
			String properties) {
		page = page < 0 ? 0 : page;
		size = size < 0 ? 0 : size;
		Sort.Direction direction = "ASC".equals(directionString) ? Sort.Direction.ASC : Sort.Direction.DESC;
		properties = "null".equals(properties) ? "offer.timestamp" : properties;
		return processRepository.findByOfferIsNotNull(new PageRequest(page, size, direction, properties));
	}

	public Page<Process> getAllProcessesWithSaleNotNullPage(int page, int size, String directionString,
			String properties) {
		page = page < 0 ? 0 : page;
		size = size < 0 ? 0 : size;
		Sort.Direction direction = "ASC".equals(directionString) ? Sort.Direction.ASC : Sort.Direction.DESC;
		properties = "null".equals(properties) ? "sale.timestamp" : properties;
		return processRepository.findBySaleIsNotNull(new PageRequest(page, size, direction, properties));
	}

	public Page<Process> getAllProcessesByStatusPage(Status status, int page, int size, String directionString,
			String properties) {
		page = page < 0 ? 0 : page;
		size = size < 0 ? 0 : size;
		Sort.Direction direction = "ASC".equals(directionString) ? Sort.Direction.ASC : Sort.Direction.DESC;
		properties = "null".equals(properties) ? "lead.timestamp" : properties;
		return processRepository.findByStatus(status, new PageRequest(page, size, direction, properties));
	}

	public Process saveProcess(final Process process) {
		AbstractWorkflow workflow = process.getWorkflowUnitBasedOnStatus();
		if (workflow != null && workflow.getCustomer() != null) {
			process.getWorkflowUnitBasedOnStatus().setCustomer(customerService.save(workflow.getCustomer()));
		}
		return processRepository.save(process);
	}

}
