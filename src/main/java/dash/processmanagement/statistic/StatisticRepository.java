package dash.processmanagement.statistic;

import java.util.Calendar;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import dash.processmanagement.request.Request;

@NoRepositoryBean
public interface StatisticRepository <T extends Request> extends CrudRepository<T, Long> {

    List<T> findByTimestampBetween(Calendar from, Calendar until);

}
