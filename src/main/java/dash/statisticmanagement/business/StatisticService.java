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

package dash.statisticmanagement.business;

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.STATISTIC_NOT_FOUND;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.processmanagement.request.Request;
import dash.processmanagement.request.RequestRepository;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.StatisticHelper;

@Service
public class StatisticService implements IStatisticService {

	private static final Logger logger = Logger.getLogger(StatisticService.class);

	@Override
	public <T> List<Double> getStatisticByDateRange(RequestRepository<T, Long> repository, DateRange dateRange)
			throws NotFoundException {
		StatisticHelper statisticHelper = new StatisticHelper(dateRange);
		final Map<String, Double> calendarMap = statisticHelper.getCalendarMap();
		final List<Request> requests = getStatisticBetween(repository, statisticHelper.getFrom(),
				statisticHelper.getUntil());

		for (Request request : requests) {
			Calendar timeStamp = request.getTimestamp();
			String key = statisticHelper.getKeyByDateRange(timeStamp, dateRange);
			if (calendarMap.containsKey(key)) {
				double value = calendarMap.get(key) + 1.00;
				calendarMap.put(key, value);
			}
		}
		return new ArrayList<>(calendarMap.values());
	}

	@SuppressWarnings("unchecked")
	@Override
	public <T> List<Request> getStatisticBetween(RequestRepository<T, Long> repository, Calendar from, Calendar until)
			throws NotFoundException {
		if (Optional.ofNullable(repository).isPresent() && Optional.ofNullable(from).isPresent()
				&& Optional.ofNullable(until).isPresent()) {
			return (List<Request>) repository.findByTimestampBetween(from, until);
		} else {
			NotFoundException pnfex = new NotFoundException(STATISTIC_NOT_FOUND);
			logger.error(STATISTIC_NOT_FOUND + this.getClass().getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, pnfex);
			throw pnfex;
		}

	}
}
