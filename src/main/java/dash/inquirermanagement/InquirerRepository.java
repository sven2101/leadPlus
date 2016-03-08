package dash.inquirermanagement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Andreas on 12.10.2015.
 */
@Repository
public interface InquirerRepository extends CrudRepository<Inquirer, Long> {

}