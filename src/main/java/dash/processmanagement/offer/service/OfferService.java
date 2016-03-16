package dash.processmanagement.offer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.Process;
import dash.processmanagement.ProcessRepository;
import dash.processmanagement.offer.Offer;
import dash.processmanagement.offer.OfferRepository;

@Service
public class OfferService implements IOfferService{

    @Autowired
    private OfferRepository offerRepository;
    
    @Autowired
    private ProcessRepository processRepository;
    
    public void createOffer(Long processId, Offer offer){
	Process process = processRepository.findOne(processId);
	if (process != null){
	    offerRepository.save(offer);
	    process.setOffer(offer);
	    processRepository.save(process);
	}
    }    
}
