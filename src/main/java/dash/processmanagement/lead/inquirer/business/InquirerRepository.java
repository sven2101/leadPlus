package dash.processmanagement.lead.inquirer.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import dash.processmanagement.lead.inquirer.domain.Inquirer;

/**
 * Created by Andreas on 12.10.2015.
 */
@Repository
public interface InquirerRepository extends CrudRepository<Inquirer, Long> {

}