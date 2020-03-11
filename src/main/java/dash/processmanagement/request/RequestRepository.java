
package dash.processmanagement.request;

import java.io.Serializable;
import java.util.Calendar;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface RequestRepository<T, ID extends Serializable> extends JpaRepository<T, ID> {

	List<T> findByTimestampBetweenAndDeleted(Calendar from, Calendar until,boolean isDeleted);

	List<T> findByTimestamp(Calendar until);
}
