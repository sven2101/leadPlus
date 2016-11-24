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
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.processmanagement.business.ProcessService;
import dash.processmanagement.domain.Activity;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Processor;
import dash.processmanagement.request.Request;
import dash.productmanagement.domain.OrderPosition;
import dash.statisticmanagement.common.AbstractStatisticService;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.StatisticHelper;
import dash.usermanagement.business.IUserService;
import dash.usermanagement.domain.User;

@Service
public class UserStatisticService extends AbstractStatisticService {

	private static final Logger logger = Logger.getLogger(UserStatisticService.class);

	@Autowired
	private ProcessService ProcessService;

	@Autowired
	private IUserService UserService;

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

		for (Process process : processes) {
			if (process.getFormerProcessors().size() == 0)
				continue;
			List<Processor> offerProcessors = process.getFormerProcessors().stream()
					.filter(it -> Activity.OFFER.equals(it.getActivity())).collect(Collectors.toList());
			Long key;
			Set<Long> hasCountProcess = new HashSet<>();
			Set<Long> hasCountCompletedProcess = new HashSet<>();
			for (Processor processor : process.getFormerProcessors()) {
				key = processor.getUser().getId();
				Activity activity = processor.getActivity();
				if (!userMap.containsKey(key)) {
					UserStatistic userStatistic = new UserStatistic();
					userStatistic.setUser(processor.getUser());
					userMap.put(key, userStatistic);
				}
				if (!hasCountProcess.contains(key)) {
					userMap.get(key).addCountProcess();
					hasCountProcess.add(key);
				}
				if (process.getLead() != null && !process.getLead().isDeleted()
						&& (Activity.OPEN.equals(activity) || Activity.INCONTACT.equals(activity))) {
					userMap.get(key).addCountLead();
				} else {
					if (process.getOffer() != null && !process.getOffer().isDeleted()
							&& Activity.OFFER.equals(activity))
						userMap.get(key).addCountOffer();
					if (process.getSale() != null && !process.getSale().isDeleted()) {
						if (Activity.SALE.equals(activity)) {
							userMap.get(key).addCountSale();
						} else if (Activity.OFFER.equals(activity)) {
							userMap.get(key)
									.addCountTurnover(process.getSale().getSaleTurnover() / offerProcessors.size());
							userMap.get(key).addCountProfit(process.getSale().getSaleProfit() / offerProcessors.size());
							for (OrderPosition orderPosition : process.getSale().getOrderPositions()) {
								userMap.get(key).addCountProduct(orderPosition.getAmount());
							}
						}
					}
				}
				if (process.getSale() != null && !process.getSale().isDeleted()) {
					if (!hasCountCompletedProcess.contains(key)) {
						userMap.get(key).addCompletedProcess();
						hasCountCompletedProcess.add(key);
					}
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
		final List<Process> processes = ProcessService.getProcessesByProcessorsAndBetweenTimestamp(userId,
				statisticHelper.getFrom(), statisticHelper.getUntil());

		UserStatistic userStatistic = new UserStatistic();
		User user = UserService.getById(userId);
		if (!processes.isEmpty())
			userStatistic.setUser(user);
		for (Process process : processes) {
			List<Processor> offerProcessors = process.getFormerProcessors().stream()
					.filter(it -> Activity.OFFER.equals(it.getActivity())).collect(Collectors.toList());
			userStatistic.addCountProcess();
			for (Processor processor : process.getFormerProcessors().stream().filter(it -> it.getUser().equals(user))
					.collect(Collectors.toList())) {
				Activity activity = processor.getActivity();
				if (process.getLead() != null && !process.getLead().isDeleted()
						&& (Activity.OPEN.equals(activity) || Activity.INCONTACT.equals(activity))) {
					userStatistic.addCountLead();
				} else {
					if (process.getOffer() != null && !process.getOffer().isDeleted()
							&& Activity.OFFER.equals(activity))
						userStatistic.addCountOffer();
					if (process.getSale() != null && !process.getSale().isDeleted()) {
						if (Activity.SALE.equals(activity)) {
							userStatistic.addCountSale();
						} else if (Activity.OFFER.equals(activity)) {
							userStatistic
									.addCountTurnover(process.getSale().getSaleTurnover() / offerProcessors.size());
							userStatistic.addCountProfit(process.getSale().getSaleProfit() / offerProcessors.size());
							for (OrderPosition orderPosition : process.getSale().getOrderPositions()) {
								userStatistic.addCountProduct(orderPosition.getAmount());
							}
						}
					}
				}
			}
			if (process.getSale() != null && !process.getSale().isDeleted()) {
				userStatistic.addCompletedProcess();
			}
		}
		return userStatistic;
	}
}
