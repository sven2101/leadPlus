package dash.processmanagement.lead.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.Process;
import dash.processmanagement.ProcessRepository;
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
    private ContainerRepository containerRepository;

    @Autowired
    private InquirerRepository 	inquirerRepository;

    @Autowired
    private VendorRepository 	vendorRepository;
    
    @Autowired
    private ProcessRepository 	processRepository;
    
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
        
	processRepository.save(new Process(lead));
    }
    
    /*
     * This function is only used for data integration
     * (non-Javadoc)
     * @see dash.processmanagement.lead.service.ILeadService#createLeads(java.util.List)
     */
    public void createLeads(List<Lead> leads){
	
	for(Lead lead : leads){
           
	    try{
		inquirerRepository.save(lead.getInquirer());
            } catch(Exception ex) {
     	   
            }    
                   
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
    
	    try{
		leadRepository.save(lead);
            } catch(Exception ex) {
        	   
            }
               
	    try{
		processRepository.save(new Process(lead));
	    } catch(Exception ex) {
    	   
	    }
        }
   }
}
