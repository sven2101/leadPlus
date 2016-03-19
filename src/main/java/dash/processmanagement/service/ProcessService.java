package dash.processmanagement.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.Process;
import dash.processmanagement.ProcessRepository;
import dash.processmanagement.lead.Lead;
import dash.processmanagement.lead.service.ILeadService;
import dash.processmanagement.offer.Offer;
import dash.processmanagement.offer.service.IOfferService;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.sale.service.ISaleService;
import dash.processmanagement.status.Status;
import dash.usermanagement.UserRepository;

@Service
public class ProcessService implements IProcessService {

    @Autowired
    private ProcessRepository 	processRepository;
    
    @Autowired
    private UserRepository 	userRepository;
    
    @Autowired
    private ILeadService 	leadService;
    
    @Autowired
    private IOfferService 	offerService;
    
    @Autowired
    private ISaleService 	saleService;
    
    public List<?> getElementsByStatus(Status status, String kind){
	
	List<Process> processes = processRepository.findProcessesByStatus(status);
	List<Object> elements = new ArrayList<>();

	if(kind == "lead"){
	    for(Process process : processes){
		elements.add(process.getLead());
	    }
	} else if (kind == "offer") {
	    for(Process process : processes){
		elements.add(process.getOffer());
	    }
	} else if (kind == "sale") {
	    for(Process process : processes){
		elements.add(process.getSale());
	    }
	}
	
	return elements;	
    }
    
    public void createProcesses(List<Process>processes){
	for (Process process : processes){
	    process.setProcessor(null);
	    
	    if(Optional.ofNullable(process.getLead()).isPresent())
		leadService.createLead(process.getLead());
	    if(Optional.ofNullable(process.getOffer()).isPresent())
		offerService.createOffer(process.getOffer());
	    if(Optional.ofNullable(process.getSale()).isPresent())
		saleService.createSale(process.getSale());
	    
	    processRepository.save(process);
	}
    }
    
    public void createProcess(Process process){
	if(Optional.ofNullable(process).isPresent()){
	    if(Optional.ofNullable(process.getProcessor()).isPresent()){
		    if(!Optional.ofNullable(userRepository.findByUsername(process.getProcessor().getUsername())).isPresent()){
			userRepository.save(process.getProcessor());
		    }
	    }	    
	    
	    if(Optional.ofNullable(process.getLead()).isPresent())
		leadService.createLead(process.getLead());
		
	    if(Optional.ofNullable(process.getOffer()).isPresent())
		offerService.createOffer(process.getOffer());
	
	    if(Optional.ofNullable(process.getSale()).isPresent())
		saleService.createSale(process.getSale());
	    
	    processRepository.save(process);
	}
    }    
    
    public void createLead(Long processId, Lead lead){
	Process process = processRepository.findOne(processId);
	if(Optional.ofNullable(process).isPresent()){	   
	    leadService.createLead(lead);
	    process.setLead(lead);
	    processRepository.save(process);
	}
    }
    
    public void createOffer(Long processId, Offer offer){
	Process process = processRepository.findOne(processId);
	if(Optional.ofNullable(process).isPresent()){	   
	    offerService.createOffer(offer);
	    process.setOffer(offer);
	    processRepository.save(process);
	}
    }
    
    public void createSale(Long processId, Sale sale){
	Process process = processRepository.findOne(processId);
	if(Optional.ofNullable(process).isPresent()){	   
	    saleService.createSale(sale);
	    process.setSale(sale);
	    processRepository.save(process);
	}
    }

}
