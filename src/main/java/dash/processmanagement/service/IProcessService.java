package dash.processmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.processmanagement.status.Status;
import dash.processmanagement.Process;
import dash.processmanagement.lead.Lead;
import dash.processmanagement.offer.Offer;
import dash.processmanagement.sale.Sale;

@Service
public interface IProcessService {

    public List<?> getElementsByStatus(Status status, String kind);
    public void createProcesses(List<Process>processes);
    public void createProcess(Process process);
    public void createLead(Long processId, Lead lead);
    public void createOffer(Long processId, Offer offer);
    public void createSale(Long processId, Sale sale);
}
