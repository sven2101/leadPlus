package dash.processmanagement.lead.business;

import org.springframework.stereotype.Service;

import dash.processmanagement.lead.domain.Lead;

@Service
public interface ILeadService {

    void createLead(Lead lead);
}
