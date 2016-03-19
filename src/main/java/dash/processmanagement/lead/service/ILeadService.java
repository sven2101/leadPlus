package dash.processmanagement.lead.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.processmanagement.lead.Lead;

@Service
public interface ILeadService {

    void createLead(Lead lead);
    void createLeads(List<Lead> leads);

}
