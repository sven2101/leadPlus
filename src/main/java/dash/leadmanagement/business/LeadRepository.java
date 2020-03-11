
package dash.leadmanagement.business;

import java.util.List;

import dash.leadmanagement.domain.Lead;
import dash.processmanagement.request.RequestRepository;

//@Transactional
//@Repository
public interface LeadRepository extends RequestRepository<Lead, Long> {

	List<Lead> findByCustomerIdAndDeleted(Long id, boolean deleted);
}
