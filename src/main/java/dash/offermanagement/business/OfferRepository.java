
package dash.offermanagement.business;

import java.util.List;

import dash.offermanagement.domain.Offer;
import dash.processmanagement.request.RequestRepository;

//@Transactional
//@Repository
public interface OfferRepository extends RequestRepository<Offer, Long> {

	List<Offer> findByCustomerIdAndDeleted(Long id, boolean deleted);

}
