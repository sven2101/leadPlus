package dash.processmanagement.request;

import java.io.Serializable;
import java.util.Calendar;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface RequestRepository <T, ID extends Serializable> extends CrudRepository<T, ID> {
    
    List<T> findByTimestampBetween(Calendar from, Calendar until);
    List<T> findByTimestamp(Calendar until);
    List<T> findTop10ByOrderByTimestampDesc();
}
