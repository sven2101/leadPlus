package dash.processmanagement.offer;

import javax.transaction.Transactional;

import dash.processmanagement.request.RequestRepository;

/**
 * Created by Andreas on 12.10.2015.
 */
@Transactional
public interface OfferRepository extends RequestRepository <Offer, Long> {

}
