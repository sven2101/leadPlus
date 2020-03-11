
package dash.statisticmanagement.olap.business;

import java.util.Calendar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.olap.domain.Olap;

@Repository
@Transactional
public interface OlapRepository extends JpaRepository<Olap, Long> {
	Olap findTopByDateRangeOrderByTimestampDesc(DateRange daterange);
	
	void deleteByTimestampBefore(Calendar timestamp);
}