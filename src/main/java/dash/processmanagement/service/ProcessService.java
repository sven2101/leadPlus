package dash.processmanagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.Process;
import dash.processmanagement.ProcessRepository;
import dash.processmanagement.lead.LeadRepository;
import dash.processmanagement.lead.service.ILeadService;
import dash.processmanagement.sale.SaleRepository;
import dash.processmanagement.sale.service.ISaleService;
import dash.processmanagement.status.Status;

@Service
public class ProcessService implements IProcessService {

    @Autowired
    private ProcessRepository 	processRepository;
    
    @Autowired
    private ILeadService 	leadService;
    
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
	    
	    leadService.createLead(process.getLead());
	    saleService.createSale(process.getSale());
	    
	    processRepository.save(process);
	}
    }

}
