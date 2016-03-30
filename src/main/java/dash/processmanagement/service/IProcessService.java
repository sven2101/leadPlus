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

    List<?> getElementsByStatus(Status status, String kind);
    void createProcesses(List<Process> processes);
    void createProcess(Process process);
    void createLead(Long processId, Lead lead) throws ProcessNotFoundException;
    void createOffer(Long processId, Offer offer) throws ProcessNotFoundException;
    void createSale(Long processId, Sale sale) throws ProcessNotFoundException;
    void createComment(Long processId, Comment comment) throws Exception;
    void createProcessor(Long processId, String username) throws Exception;
    void updateStatus(Long processId, Status status) throws ProcessNotFoundException;
}
