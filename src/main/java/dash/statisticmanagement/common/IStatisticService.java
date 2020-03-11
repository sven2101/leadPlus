
package dash.statisticmanagement.common;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import dash.processmanagement.domain.Process;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.StatisticHelper;
import dash.workflowmanagement.domain.Workflow;

@Service
public interface IStatisticService {

	Map<String, List<Double>> getStatisticByDateRange(Workflow workflow, DateRange dateRange, Long elementId);

	Map<String, List<Double>> buildStatistic(Map<String, Double> calendarMap, List<Process> processes, Long elementId,
			StatisticHelper statisticHelper, Workflow workflow);
}
