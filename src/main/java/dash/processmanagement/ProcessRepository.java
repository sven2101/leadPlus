package dash.processmanagement;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dash.processmanagement.status.Status;

/**
 * Created by Andreas on 12.10.2015.
 */

@Repository
public interface ProcessRepository extends JpaRepository<Process, Long> {

    List<Process> findProcessesByStatus(Status status);
}
