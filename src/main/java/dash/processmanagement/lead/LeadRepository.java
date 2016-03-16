package dash.processmanagement.lead;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Andreas on 12.10.2015.
 */

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

}
