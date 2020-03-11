
package dash.statisticmanagement.profit.business;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import dash.common.CommonUtils;
import dash.processmanagement.domain.Process;
import dash.statisticmanagement.common.AbstractStatisticService;
import dash.statisticmanagement.domain.StatisticHelper;
import dash.workflowmanagement.domain.Workflow;

@Service
public class ProfitStatisticService extends AbstractStatisticService {

	@Override
	public Map<String, List<Double>> buildStatistic(Map<String, Double> calendarMap, List<Process> processes,
			Long elementId, StatisticHelper statisticHelper, Workflow workflow) {
		Map<String, LinkedHashMap<String, Double>> map = new HashMap<>();
		map.put(ALL_STATISTIC_KEY, new LinkedHashMap<String, Double>(calendarMap));

		for (Process process : processes) {
			if (process.getSale() != null) {
				Calendar timeStamp = process.getSale().getTimestamp();
				String key = statisticHelper.getKeyByDateRange(timeStamp, statisticHelper.getDateRange());
				if (calendarMap.containsKey(key)) {
					double allValue = map.get(ALL_STATISTIC_KEY).get(key) + process.getSale().getSaleProfit();
					map.get(ALL_STATISTIC_KEY).put(key, allValue);
					if (process.getSource() != null && !CommonUtils.isNullOrEmpty(process.getSource().getName())) {
						if (!map.containsKey(process.getSource().getName())) {
							map.put(process.getSource().getName(), new LinkedHashMap<String, Double>(calendarMap));
						}
						double sourceValue = map.get(process.getSource().getName()).get(key)
								+ process.getSale().getSaleProfit();
						map.get(process.getSource().getName()).put(key, sourceValue);
					}
				}
			}
		}
		Map<String, List<Double>> returnMap = new HashMap<>();
		for (Map.Entry<String, LinkedHashMap<String, Double>> entry : map.entrySet())
			returnMap.put(entry.getKey(), new ArrayList<>(entry.getValue().values()));
		return returnMap;
	}
}
