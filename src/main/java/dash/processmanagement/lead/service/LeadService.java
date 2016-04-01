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

import java.util.Optional;

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
    
    public void createLead(Lead lead) {
        if (Optional.ofNullable(lead).isPresent()) {
            Vendor vendor = vendorRepository.findByName(lead.getVendor().getName());
            if (vendor == null) {
                vendorRepository.save(lead.getVendor());
            } else {
                lead.setVendor(vendor);
            }
            leadRepository.save(lead);
        }
    }
}
