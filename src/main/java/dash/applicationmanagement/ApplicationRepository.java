package dash.applicationmanagement;

import dash.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by Andreas on 12.10.2015.
 */

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    public Iterable<Application> findApplicationsByStatus(@Param("status") Status status);
    public Iterable<Application> findApplicationByMessage(@Param("message") String message);

}
