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

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.STATISTIC_NOT_FOUND;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.processmanagement.request.Request;
import dash.productmanagement.domain.OrderPosition;
import dash.statisticmanagement.common.AbstractStatisticService;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.StatisticHelper;
import dash.workflowmanagement.domain.Workflow;

@Service
public class ProductStatisticService extends AbstractStatisticService {

	private static final Logger logger = Logger.getLogger(ProductStatisticService.class);

	@Override
	public List<Double> buildStatistic(Map<String, Double> calendarMap, List<Request> requests, Long elementId,
			StatisticHelper statisticHelper) {
		return null;
	}

	public List<ProductStatistic> getTopProductStatstic(Workflow workflow, DateRange dateRange, Long elementId)
			throws NotFoundException {
		Map<Long, ProductStatistic> productMap = new HashMap<>();
		if (workflow == null || dateRange == null) {
			NotFoundException pnfex = new NotFoundException(STATISTIC_NOT_FOUND);
			logger.error(STATISTIC_NOT_FOUND + this.getClass().getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, pnfex);
			throw pnfex;
		}
		StatisticHelper statisticHelper = new StatisticHelper(dateRange);
		final List<Request> requests = getStatisticBetween(this.getRepositoryByWorkflow(workflow),
				statisticHelper.getFrom(), statisticHelper.getUntil());

		for (Request request : requests) {
			for (OrderPosition orderPosition : request.getOrderPositions()) {
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

}
