package dash.processmanagement.lead;

import dash.processmanagement.request.RequestRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Andreas on 12.10.2015.
 */

@Repository
public interface LeadRepository extends RequestRepository <Lead, Long> {

}
