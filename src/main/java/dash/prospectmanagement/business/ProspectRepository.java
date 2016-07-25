package dash.prospectmanagement.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import dash.prospectmanagement.domain.Prospect;

@Repository
@Transactional
public interface ProspectRepository extends CrudRepository<Prospect, Long> {

}
