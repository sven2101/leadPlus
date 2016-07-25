/**
 * Created by Andreas on 12.10.2015.
 */
package dash.processmanagement.lead.business;

import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import dash.processmanagement.lead.domain.Lead;
import dash.processmanagement.request.RequestRepository;

@Transactional
@Repository
public interface LeadRepository extends RequestRepository<Lead, Long> {

}
