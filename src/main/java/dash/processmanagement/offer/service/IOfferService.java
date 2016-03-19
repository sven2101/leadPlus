package dash.processmanagement.offer.service;

import org.springframework.stereotype.Service;

import dash.processmanagement.offer.Offer;

@Service
public interface IOfferService {

    public void createOffer(Offer offer);
}
