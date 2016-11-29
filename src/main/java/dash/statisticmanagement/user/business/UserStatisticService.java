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

import dash.common.CommonUtils;
import dash.exceptions.NotFoundException;
import dash.processmanagement.business.ProcessService;
import dash.processmanagement.domain.Activity;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Process_;
import dash.processmanagement.domain.Processor;
import dash.productmanagement.domain.OrderPosition;
import dash.statisticmanagement.common.AbstractStatisticService;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.StatisticHelper;
import dash.usermanagement.business.IUserService;
import dash.usermanagement.domain.User;
import dash.workflowmanagement.domain.Workflow;

@Service
public class UserStatisticService extends AbstractStatisticService {

	private static final Logger logger = Logger.getLogger(UserStatisticService.class);

	@Autowired
	private ProcessService ProcessService;

	@Autowired
	private IUserService userService;

	public Map<String, List<UserStatistic>> getTopSalesMen(DateRange dateRange) {
		Map<String, Map<Long, UserStatistic>> userMap = new HashMap<>();
		if (dateRange == null) {
			IllegalArgumentException ex = new IllegalArgumentException(
					"Workflow parameter or daterange parmeter is null");
			logger.error("Statistic cannot be created in " + this.getClass().getSimpleName() + " because of "
					+ ex.getMessage(), ex);
			throw ex;
		}

		StatisticHelper statisticHelper = new StatisticHelper(dateRange);
		final List<Process> processes = ProcessService.getProcessesBetweenTimestamp(statisticHelper.getFrom(),
				statisticHelper.getUntil(), Process_.lead);

		for (Process process : processes) {
			if (process.getFormerProcessors().size() == 0)
				continue;
			addToMapKey(ALL_STATISTIC_KEY, process, userMap);
			if (process.getSource() != null && !CommonUtils.isNullOrEmpty(process.getSource().getName())) {
				addToMapKey(process.getSource().getName(), process, userMap);
			}

		}
		Map<String, List<UserStatistic>> returnMap = new HashMap<>();
		for (Map.Entry<String, Map<Long, UserStatistic>> entry : userMap.entrySet())
			returnMap.put(entry.getKey(), new ArrayList<>(entry.getValue().values()));
		return returnMap;
	}

	private void addToMapKey(String sourceKey, Process process, Map<String, Map<Long, UserStatistic>> userMap) {
		List<Processor> offerProcessors = process.getFormerProcessors().stream()
				.filter(it -> Activity.OFFER.equals(it.getActivity())).collect(Collectors.toList());
		Set<Long> hasCountProcess = new HashSet<>();
		Set<Long> hasCountCompletedProcess = new HashSet<>();
		Set<Long> hasCountSucceededLead = new HashSet<>();
		Set<Long> hasCountSucceededOffer = new HashSet<>();
		for (Processor processor : process.getFormerProcessors()) {
			Long userIdKey = processor.getUser().getId();
			Activity activity = processor.getActivity();
			if (!userMap.containsKey(sourceKey)) {
				userMap.put(sourceKey, new HashMap<>());
			}
			if (!userMap.get(sourceKey).containsKey(userIdKey)) {
				UserStatistic userStatistic = new UserStatistic();
				userStatistic.setUser(processor.getUser());
				userMap.get(sourceKey).put(userIdKey, userStatistic);
			}
			if (!hasCountProcess.contains(userIdKey)) {
				userMap.get(sourceKey).get(userIdKey).addCountProcess();
				hasCountProcess.add(userIdKey);
			}
			if (process.getLead() != null && !process.getLead().isDeleted()
					&& (Activity.OPEN.equals(activity) || Activity.INCONTACT.equals(activity))) {
				userMap.get(sourceKey).get(userIdKey).addCountLead();
				if (process.getSale() != null && !process.getSale().isDeleted()
						&& !hasCountSucceededLead.contains(userIdKey)) {
					userMap.get(sourceKey).get(userIdKey).addSucceededLeads();
					hasCountSucceededLead.add(userIdKey);
				}
			} else {
				if (process.getOffer() != null && !process.getOffer().isDeleted() && Activity.OFFER.equals(activity))
					userMap.get(sourceKey).get(userIdKey).addCountOffer();
				if (process.getSale() != null && !process.getSale().isDeleted()) {
					if (Activity.SALE.equals(activity)) {
						userMap.get(sourceKey).get(userIdKey).addCountSale();
					} else if (Activity.OFFER.equals(activity)) {
						userMap.get(sourceKey).get(userIdKey)
								.addCountTurnover(process.getSale().getSaleTurnover() / offerProcessors.size());
						userMap.get(sourceKey).get(userIdKey)
								.addCountProfit(process.getSale().getSaleProfit() / offerProcessors.size());
						for (OrderPosition orderPosition : process.getSale().getOrderPositions()) {
							userMap.get(sourceKey).get(userIdKey).addCountProduct(orderPosition.getAmount());
						}
						if (process.getSale() != null && !process.getSale().isDeleted()
								&& !hasCountSucceededOffer.contains(userIdKey)) {
							userMap.get(sourceKey).get(userIdKey).addSucceededOffers();
							hasCountSucceededOffer.add(userIdKey);
						}
					}
				}
			}
			if (process.getSale() != null && !process.getSale().isDeleted()
					&& !hasCountCompletedProcess.contains(userIdKey)) {
				userMap.get(sourceKey).get(userIdKey).addCompletedProcess();
				hasCountCompletedProcess.add(userIdKey);

			}
		}
	}

	public Map<String, UserStatistic> getUserStatisticByIdAndDateRange(DateRange dateRange, Long userId)
			throws NotFoundException {
		if (userId == null || dateRange == null) {
			IllegalArgumentException ex = new IllegalArgumentException(
					"DateRange parameter or userId parmeter is null");
			logger.error("Statistic cannot be created in " + this.getClass().getSimpleName() + " because of "
					+ ex.getMessage(), ex);
			throw ex;
		}
		Map<String, UserStatistic> userMap = new HashMap<>();
		StatisticHelper statisticHelper = new StatisticHelper(dateRange);
		final List<Process> processes = ProcessService.getProcessesByProcessorAndBetweenTimestamp(userId,
				statisticHelper.getFrom(), statisticHelper.getUntil());

		User user = userService.getById(userId);
		if (user == null)
			return userMap;
		for (Process process : processes) {
			addMapToKeySingleUserStatistic(ALL_STATISTIC_KEY, process, user, userMap);
			if (process.getSource() != null && !CommonUtils.isNullOrEmpty(process.getSource().getName())) {
				addMapToKeySingleUserStatistic(process.getSource().getName(), process, user, userMap);
			}
		}
		return userMap;
	}

	private void addMapToKeySingleUserStatistic(String sourceKey, Process process, User user,
			Map<String, UserStatistic> userMap) {
		if (!userMap.containsKey(sourceKey)) {
			UserStatistic userStatistic = new UserStatistic();
			userStatistic.setUser(user);
			userMap.put(sourceKey, userStatistic);
		}
		List<Processor> offerProcessors = process.getFormerProcessors().stream()
				.filter(it -> Activity.OFFER.equals(it.getActivity())).collect(Collectors.toList());
		userMap.get(sourceKey).addCountProcess();
		for (Processor processor : process.getFormerProcessors().stream().filter(it -> it.getUser().equals(user))
				.collect(Collectors.toList())) {
			Activity activity = processor.getActivity();
			if (process.getLead() != null && !process.getLead().isDeleted()
					&& (Activity.OPEN.equals(activity) || Activity.INCONTACT.equals(activity))) {
				userMap.get(sourceKey).addCountLead();
			} else {
				if (process.getOffer() != null && !process.getOffer().isDeleted() && Activity.OFFER.equals(activity))
					userMap.get(sourceKey).addCountOffer();
				if (process.getSale() != null && !process.getSale().isDeleted()) {
					if (Activity.SALE.equals(activity)) {
						userMap.get(sourceKey).addCountSale();
					} else if (Activity.OFFER.equals(activity)) {
						userMap.get(sourceKey)
								.addCountTurnover(process.getSale().getSaleTurnover() / offerProcessors.size());
						userMap.get(sourceKey)
								.addCountProfit(process.getSale().getSaleProfit() / offerProcessors.size());
						for (OrderPosition orderPosition : process.getSale().getOrderPositions()) {
							userMap.get(sourceKey).addCountProduct(orderPosition.getAmount());
						}
					}
				}
			}
		}
		if (process.getSale() != null && !process.getSale().isDeleted()) {
			userMap.get(sourceKey).addCompletedProcess();
		}

	}

	@Override
	public Map<String, List<Double>> buildStatistic(Map<String, Double> calendarMap, List<Process> processes,
			Long elementId, StatisticHelper statisticHelper, Workflow workflow) {
		return null;
	}

}
