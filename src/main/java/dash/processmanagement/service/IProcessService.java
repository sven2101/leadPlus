package dash.processmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.exceptions.ProcessNotFoundException;
import dash.processmanagement.Process;
import dash.processmanagement.comment.Comment;
import dash.processmanagement.lead.Lead;
import dash.processmanagement.offer.Offer;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.status.Status;

@Service
public interface IProcessService {

    public List<?> getElementsByStatus(Status status, String kind);
    public void createProcesses(List<Process>processes);
    public void createProcess(Process process);
    public void createLead(Long processId, Lead lead) throws ProcessNotFoundException;
    public void createOffer(Long processId, Offer offer) throws ProcessNotFoundException;
    public void createSale(Long processId, Sale sale) throws ProcessNotFoundException;
    public void createComment(Long processId, Comment sale) throws Exception;
    public void createProcessor(Long processId, String username) throws Exception;
    public void updateStatus(Long processId, Status status) throws ProcessNotFoundException;
}
