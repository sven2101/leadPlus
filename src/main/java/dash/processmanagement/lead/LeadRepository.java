/**
 * Created by Andreas on 12.10.2015.
 */
package dash.processmanagement.lead;

import dash.processmanagement.request.RequestRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository
public interface LeadRepository extends RequestRepository<Lead, Long> {

}
