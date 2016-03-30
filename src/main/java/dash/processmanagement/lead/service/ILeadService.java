package dash.processmanagement.lead.service;

import org.springframework.stereotype.Service;

import dash.processmanagement.lead.Lead;

@Service
public interface ILeadService {

    void createLead(Lead lead);
}
