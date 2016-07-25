package dash.processmanagement.offer.business;

import org.springframework.stereotype.Service;

import dash.processmanagement.offer.domain.Offer;

@Service
public interface IOfferService {

    void createOffer(Offer offer);
}
