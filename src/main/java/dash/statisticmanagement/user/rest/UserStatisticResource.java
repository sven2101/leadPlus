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

package dash.statisticmanagement.user.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.common.ByteSearializer;
import dash.common.CommonUtils;
import dash.exceptions.NotFoundException;
import dash.statisticmanagement.common.AbstractStatisticService;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.olap.business.OlapRepository;
import dash.statisticmanagement.olap.domain.Olap;
import dash.statisticmanagement.user.business.UserStatistic;
import dash.statisticmanagement.user.business.UserStatisticService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api/rest/processes/statistics/user")
@Api(value = "Statistic Profit API")
public class UserStatisticResource {

	private static final Logger logger = Logger.getLogger(UserStatisticResource.class);

	@Autowired
	private OlapRepository olapRepository;

	@Autowired
	private UserStatisticService userStatisticService;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/daterange/{dateRange}/source/{source}", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get Statistic by dateRange and source", notes = "")
	public List<UserStatistic> getProductStatisticByDateRange(
			@ApiParam(required = true) @PathVariable @Valid final DateRange dateRange,
			@ApiParam(required = true) @PathVariable @Valid String source)
			throws NotFoundException, ClassNotFoundException, IOException {
		if (CommonUtils.isNullOrEmpty(source))
			source = AbstractStatisticService.ALL_STATISTIC_KEY;

		Olap olap = olapRepository.findTopByDateRangeOrderByTimestampDesc(dateRange);
		if (olap != null && olap.getUsers() != null) {
			logger.info("Information from OLAP.");
			Object obj = ByteSearializer.deserialize(olap.getUsers());
			if (!(obj instanceof Map<?, ?>))
				return new ArrayList<>();
			Map<String, List<UserStatistic>> sourceMap = (Map<String, List<UserStatistic>>) obj;
			if (!sourceMap.containsKey(source))
				return new ArrayList<>();
			return sourceMap.get(source);
		} else {
			logger.info("Information directly calculating.");
			Map<String, List<UserStatistic>> sourceMap = userStatisticService.getTopSalesMen(dateRange);
			if (!sourceMap.containsKey(source))
				return new ArrayList<>();
			return sourceMap.get(source);
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/daterange/{dateRange}/source/{source}/id/{id}", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get Statistic by dateRange, source and processor", notes = "")
	public UserStatistic getSingleProductStatistic(
			@ApiParam(required = true) @PathVariable @Valid final DateRange dateRange,
			@ApiParam(required = true) @PathVariable @Valid String source,
			@ApiParam(required = true) @PathVariable @Valid final Long id)
			throws NotFoundException, ClassNotFoundException, IOException {
		if (CommonUtils.isNullOrEmpty(source))
			source = AbstractStatisticService.ALL_STATISTIC_KEY;

		Olap olap = olapRepository.findTopByDateRangeOrderByTimestampDesc(dateRange);
		if (olap != null && olap.getUsers() != null) {
			logger.info("Information from OLAP.");
			Object obj = ByteSearializer.deserialize(olap.getUsers());
			if (!(obj instanceof Map<?, ?>))
				return new UserStatistic();
			Map<String, List<UserStatistic>> sourceMap = (Map<String, List<UserStatistic>>) obj;
			if (!sourceMap.containsKey(source))
				return new UserStatistic();
			UserStatistic userStatisticReturn = new UserStatistic();
			for (UserStatistic userStatistic : sourceMap.get(source)) {
				if (userStatistic.getUser().getId().equals(id)) {
					userStatisticReturn = userStatistic;
					break;
				}
			}
			return userStatisticReturn;
		} else {
			Map<String, UserStatistic> sourceMap = userStatisticService.getUserStatisticByIdAndDateRange(dateRange, id);
			if (!sourceMap.containsKey(source))
				return new UserStatistic();
			return sourceMap.get(source);
		}
	}

}
