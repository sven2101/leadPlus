package dash.processmanagement.lead.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.lead.Lead;
import dash.processmanagement.lead.LeadRepository;
import dash.processmanagement.lead.container.Container;
import dash.processmanagement.lead.container.ContainerRepository;
import dash.processmanagement.lead.inquirer.InquirerRepository;
import dash.processmanagement.lead.vendor.Vendor;
import dash.processmanagement.lead.vendor.VendorRepository;

@Service
public class LeadService implements ILeadService {

    @Autowired
    private LeadRepository 	leadRepository;
    
    @Autowired
    private InquirerRepository 	inquirerRepository;
    
    @Autowired
    private VendorRepository 	vendorRepository;
    
    @Autowired
    private ContainerRepository containerRepository;
    
    public void createLead(Lead lead){
	
	inquirerRepository.save(lead.getInquirer());
        
	Vendor vendor = vendorRepository.findByName(lead.getVendor().getName());
	if(vendor == null){
            vendorRepository.save(lead.getVendor());
	} else {
	    lead.setVendor(vendor);
	}
	
	Container container = containerRepository.findByName(lead.getContainer().getName());
        if(container == null){
            containerRepository.save(lead.getContainer());
        } else {
            lead.setContainer(container);
        }

        leadRepository.save(lead);
    }
}
