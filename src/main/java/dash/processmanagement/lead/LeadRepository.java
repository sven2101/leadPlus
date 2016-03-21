package dash.processmanagement.lead;

import javax.transaction.Transactional;

import dash.processmanagement.request.RequestRepository;

/**
 * Created by Andreas on 12.10.2015.
 */
@Transactional
public interface LeadRepository extends RequestRepository <Lead, Long> {

}
