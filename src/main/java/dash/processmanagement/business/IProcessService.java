package dash.processmanagement.business;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.exceptions.ProcessNotFoundException;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.salemanagement.domain.Sale;

@Service
public interface IProcessService {

	List<?> getElementsByStatus(Status status, String kind);

	void createProcesses(List<Process> processes);

	Process createProcess(Process process);

	void createLead(Long processId, Lead lead) throws ProcessNotFoundException;

	void createOffer(Long processId, Offer offer) throws ProcessNotFoundException;

	void createSale(Long processId, Sale sale) throws ProcessNotFoundException;

	void createProcessor(Long processId, String username) throws Exception;

	void updateStatus(Long processId, Status status) throws ProcessNotFoundException;
}
