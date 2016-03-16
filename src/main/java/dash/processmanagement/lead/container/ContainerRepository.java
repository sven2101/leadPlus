package dash.processmanagement.lead.container;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Andreas on 12.10.2015.
 */
@Repository
public interface ContainerRepository extends CrudRepository<Container, Long> {
    public Container findByName(String name);
}