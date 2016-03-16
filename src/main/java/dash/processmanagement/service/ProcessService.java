package dash.processmanagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.Process;
import dash.processmanagement.ProcessRepository;
import dash.processmanagement.status.Status;

@Service
public class ProcessService implements IProcessService {

    @Autowired
    private ProcessRepository processRepository;
    
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
}
