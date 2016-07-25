package dash.offermanagement.business;

import org.springframework.stereotype.Service;

import dash.offermanagement.domain.Offer;

@Service
public interface IOfferService {

    void createOffer(Offer offer);
}
