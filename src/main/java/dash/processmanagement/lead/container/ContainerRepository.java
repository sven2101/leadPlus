package dash.processmanagement.lead.container;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Andreas on 12.10.2015.
 */
@Repository
@Transactional
public interface ContainerRepository extends CrudRepository<Container, Long> {
    Container findByName(String name);
}