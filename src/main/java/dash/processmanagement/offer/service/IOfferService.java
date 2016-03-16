package dash.processmanagement.offer.service;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import dash.processmanagement.offer.Offer;

@Component
@Service
public interface IOfferService {

    public void createOffer(Long processId, Offer offer);
}
