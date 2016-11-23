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

package dash.statisticmanagement.user.business;

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.STATISTIC_NOT_FOUND;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.processmanagement.business.ProcessService;
import dash.processmanagement.domain.Process;
import dash.processmanagement.request.Request;
import dash.productmanagement.domain.OrderPosition;
import dash.statisticmanagement.common.AbstractStatisticService;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.StatisticHelper;

@Service
public class UserStatisticService extends AbstractStatisticService {

	private static final Logger logger = Logger.getLogger(UserStatisticService.class);

	@Autowired
	private ProcessService ProcessService;

	@Override
	public List<Double> buildStatistic(Map<String, Double> calendarMap, List<Request> requests, Long elementId,
			StatisticHelper statisticHelper) {
		return null;
	}

	public List<UserStatistic> getTopSalesMen(DateRange dateRange) throws NotFoundException {
		Map<Long, UserStatistic> userMap = new HashMap<>();
		if (dateRange == null) {
			NotFoundException pnfex = new NotFoundException(STATISTIC_NOT_FOUND);
			logger.error(STATISTIC_NOT_FOUND + this.getClass().getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, pnfex);
			throw pnfex;
		}

		StatisticHelper statisticHelper = new StatisticHelper(dateRange);
		final List<Process> processes = ProcessService.getProcessesBetweenTimestamp(statisticHelper.getFrom(),
				statisticHelper.getUntil());
		long key;

		for (Process process : processes) {
			if (process.getProcessor() == null)
				continue;
			key = process.getProcessor().getId();
			if (!userMap.containsKey(key)) {
				UserStatistic userStatistic = new UserStatistic();
				userStatistic.setUser(process.getProcessor());
				userMap.put(key, userStatistic);
			}
			userMap.get(key).addCountProcess();
			if (process.getLead() != null && !process.getLead().isDeleted())
				userMap.get(key).addCountLead();
			if (process.getOffer() != null && !process.getOffer().isDeleted())
				userMap.get(key).addCountOffer();
			if (process.getSale() != null && !process.getSale().isDeleted()) {
				userMap.get(key).addCountSale();
				userMap.get(key).addCountTurnover(process.getSale().getSaleTurnover());
				userMap.get(key).addCountProfit(process.getSale().getSaleProfit());
				for (OrderPosition orderPosition : process.getSale().getOrderPositions()) {
					userMap.get(key).addCountProduct(orderPosition.getAmount());
				}
			}
		}
		return new ArrayList<>(userMap.values());
	}

	public UserStatistic getUserStatisticByIdAndDateRange(DateRange dateRange, Long userId) throws NotFoundException {
		if (userId == null || dateRange == null) {
			NotFoundException pnfex = new NotFoundException(STATISTIC_NOT_FOUND);
			logger.error(STATISTIC_NOT_FOUND + this.getClass().getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, pnfex);
			throw pnfex;
		}
		StatisticHelper statisticHelper = new StatisticHelper(dateRange);
		final List<Process> processes = ProcessService.getProcessesByProcessorAndBetweenTimestamp(userId,
				statisticHelper.getFrom(), statisticHelper.getUntil());

		UserStatistic userStatistic = new UserStatistic();
		if (processes.size() > 0)
			userStatistic.setUser(processes.get(0).getProcessor());
		for (Process process : processes) {
			userStatistic.addCountProcess();
			if (process.getLead() != null)
				userStatistic.addCountLead();
			if (process.getOffer() != null)
				userStatistic.addCountOffer();
			if (process.getSale() != null) {
				userStatistic.addCountSale();
				userStatistic.addCountTurnover(process.getSale().getSaleTurnover());
				userStatistic.addCountProfit(process.getSale().getSaleProfit());
				for (OrderPosition orderPosition : process.getSale().getOrderPositions()) {
					userStatistic.addCountProduct(orderPosition.getAmount());
				}
			}
		}
		return userStatistic;
	}

}
