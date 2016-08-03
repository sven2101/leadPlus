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

import java.util.Calendar;
import java.util.List;

import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.processmanagement.request.Request;
import dash.processmanagement.request.RequestRepository;
import dash.statisticmanagement.domain.DateRange;

@Service
public interface IStatisticService {

	<T> List<Double> getStatisticByDateRange(RequestRepository<T, Long> repository, DateRange dateRange) throws NotFoundException;

	<T> List<Request> getStatisticBetween(RequestRepository<T, Long> repository, Calendar from, Calendar until) throws NotFoundException;
}
