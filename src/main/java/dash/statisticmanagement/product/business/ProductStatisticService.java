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
import dash.processmanagement.domain.Process;
import dash.productmanagement.domain.OrderPosition;
import dash.statisticmanagement.common.AbstractStatisticService;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.StatisticHelper;
import dash.workflowmanagement.domain.Workflow;

@Service
public class ProductStatisticService extends AbstractStatisticService {

	private static final Logger logger = Logger.getLogger(ProductStatisticService.class);

	public List<ProductStatistic> getTopProductStatstic(Workflow workflow, DateRange dateRange, Long elementId) {
		Map<Long, ProductStatistic> productMap = new HashMap<>();
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
					if (!productMap.containsKey(orderPosition.getProduct().getId())) {
						ProductStatistic productStatistic = new ProductStatistic();
						productStatistic.setProduct(orderPosition.getProduct());
						productMap.put(orderPosition.getProduct().getId(), productStatistic);
					}
					productMap.get(orderPosition.getProduct().getId()).addCount(orderPosition.getAmount());
					productMap.get(orderPosition.getProduct().getId())
							.addTurnover(orderPosition.getPrice() * orderPosition.getAmount());
					productMap.get(orderPosition.getProduct().getId())
							.addDiscount(orderPosition.getDiscount() * orderPosition.getAmount());
					productMap.get(orderPosition.getProduct().getId()).addOrderPosition();
				}
		}
		return new ArrayList<>(productMap.values());
	}

	@Override
	public Map<String, List<Double>> buildStatistic(Map<String, Double> calendarMap, List<Process> processes,
			Long elementId, StatisticHelper statisticHelper, Workflow workflow) {
		return null;
	}
}
