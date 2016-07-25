package dash.statisticmanagement.business;

import java.util.Calendar;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface StatisticRepository <T> extends CrudRepository<T, Long> {

    List<T> findByTimestampBetween(Calendar from, Calendar until);
}
