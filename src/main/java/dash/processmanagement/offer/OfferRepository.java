package dash.processmanagement.offer;

import dash.processmanagement.request.RequestRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Andreas on 12.10.2015.
 */
@Repository
public interface OfferRepository extends RequestRepository <Offer, Long> {

}
