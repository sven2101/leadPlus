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

import org.springframework.stereotype.Service;

import dash.processmanagement.request.RequestRepository;
import dash.statisticmanagement.result.domain.Result;

@Service
public interface IStatisticService {

	<T> Result getDailyStatistic(RequestRepository<T, Long> leadRepository);

	<T> Result getWeeklyStatistic(RequestRepository<T, Long> leadRepository);

	<T> Result getMonthlyStatistic(RequestRepository<T, Long> leadRepository);

	<T> Result getYearlyStatistic(RequestRepository<T, Long> leadRepository);

	<T> Result getAllStatistic(RequestRepository<T, Long> leadRepository);
}
