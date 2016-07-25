package dash.offermanagement.business;

import dash.offermanagement.domain.Offer;
import dash.processmanagement.request.RequestRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by Andreas on 12.10.2015.
 */
@Transactional
@Repository
public interface OfferRepository extends RequestRepository <Offer, Long> {

}
