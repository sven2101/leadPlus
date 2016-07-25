package dash.leadmanagement.business;

import org.springframework.stereotype.Service;

import dash.leadmanagement.domain.Lead;

@Service
public interface ILeadService {

    void createLead(Lead lead);
}
