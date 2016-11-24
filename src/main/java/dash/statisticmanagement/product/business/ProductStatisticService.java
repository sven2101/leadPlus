/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

package dash.statisticmanagement.product.business;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import dash.common.AbstractWorkflow;
import dash.common.CommonMethods;
import dash.processmanagement.domain.Process;
import dash.productmanagement.domain.OrderPosition;
import dash.statisticmanagement.common.AbstractStatisticService;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.StatisticHelper;
import dash.workflowmanagement.domain.Workflow;

@Service
public class ProductStatisticService extends AbstractStatisticService {

	private static final Logger logger = Logger.getLogger(ProductStatisticService.class);

	public Map<String, List<ProductStatistic>> getTopProductStatstic(Workflow workflow, DateRange dateRange,
			Long elementId) {
		Map<String, Map<Long, ProductStatistic>> productMap = new HashMap<>();
		productMap.put(ALL_STATISTIC_KEY, new HashMap<Long, ProductStatistic>());
		if (workflow == null || dateRange == null) {
			IllegalArgumentException ex = new IllegalArgumentException(
					"Workflow parameter or daterange parmeter is null");
			logger.error("Statistic cannot be created in " + this.getClass().getSimpleName() + " because of "
					+ ex.getMessage(), ex);
			throw ex;
		}
		StatisticHelper statisticHelper = new StatisticHelper(dateRange);
		final List<Process> processes = processService.getProcessesBetweenTimestamp(statisticHelper.getFrom(),
				statisticHelper.getUntil(), getAttributeByWorkflow(workflow));

		for (Process process : processes) {
			AbstractWorkflow workflowUnit = getWorkflowUnitByWorkflow(workflow, process);
			if (workflowUnit != null)
				for (OrderPosition orderPosition : workflowUnit.getOrderPositions()) {
					if (elementId != null && !orderPosition.getProduct().getId().equals(elementId))
						continue;
					addToMapKey(ALL_STATISTIC_KEY, orderPosition, productMap);
					if (process.getSource() != null && !CommonMethods.isNullOrEmpty(process.getSource().getName())) {
						addToMapKey(process.getSource().getName(), orderPosition, productMap);
					}
				}
		}
		Map<String, List<ProductStatistic>> returnMap = new HashMap<>();
		for (Map.Entry<String, Map<Long, ProductStatistic>> entry : productMap.entrySet())
			returnMap.put(entry.getKey(), new ArrayList<>(entry.getValue().values()));
		return returnMap;
	}

	private void addToMapKey(String sourceKey, OrderPosition orderPosition,
			Map<String, Map<Long, ProductStatistic>> productMap) {
		if (!productMap.containsKey(sourceKey)) {
			productMap.put(sourceKey, new HashMap<>());
		}

		if (!productMap.get(sourceKey).containsKey(orderPosition.getProduct().getId())) {
			ProductStatistic productStatistic = new ProductStatistic();
			productStatistic.setProduct(orderPosition.getProduct());
			productMap.get(sourceKey).put(orderPosition.getProduct().getId(), productStatistic);
		}
		productMap.get(sourceKey).get(orderPosition.getProduct().getId()).addCount(orderPosition.getAmount());
		productMap.get(sourceKey).get(orderPosition.getProduct().getId())
				.addTurnover(orderPosition.getPrice() * orderPosition.getAmount());
		productMap.get(sourceKey).get(orderPosition.getProduct().getId())
				.addDiscount(orderPosition.getDiscount() * orderPosition.getAmount());
		productMap.get(sourceKey).get(orderPosition.getProduct().getId()).addOrderPosition();
	}

	@Override
	public Map<String, List<Double>> buildStatistic(Map<String, Double> calendarMap, List<Process> processes,
			Long elementId, StatisticHelper statisticHelper, Workflow workflow) {
		return null;
	}
}
