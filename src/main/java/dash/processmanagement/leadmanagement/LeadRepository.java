package dash.processmanagement.leadmanagement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dash.processmanagement.status.Status;

/**
 * Created by Andreas on 12.10.2015.
 */

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    public Iterable<Lead> findApplicationsByStatus(@Param("status") Status status);
    public Iterable<Lead> findApplicationByMessage(@Param("message") String message);

}
