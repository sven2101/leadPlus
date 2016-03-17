package dash.processmanagement.lead.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.processmanagement.lead.Lead;

@Service
public interface ILeadService {

    public void createLead(Lead lead);
    public void createLeads(List<Lead> leads);

}
