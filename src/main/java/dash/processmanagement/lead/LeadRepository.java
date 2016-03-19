package dash.processmanagement.lead;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Andreas on 12.10.2015.
 */

public interface LeadRepository extends JpaRepository<Lead, Long> {

    List<Lead> findByTimestampBetween(Date from, Date until);
}
