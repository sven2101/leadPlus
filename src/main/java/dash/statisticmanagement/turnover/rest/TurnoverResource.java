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

package dash.statisticmanagement.turnover.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.assertj.core.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.common.ByteSearializer;
import dash.exceptions.NotFoundException;
import dash.statisticmanagement.common.AbstractStatisticService;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.olap.business.OlapRepository;
import dash.statisticmanagement.olap.domain.Olap;
import dash.statisticmanagement.turnover.business.TurnoverStatisticService;
import dash.workflowmanagement.domain.Workflow;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api/rest/processes/statistics/turnover")
@Api(value = "Statistic Profit API")
public class TurnoverResource {

	private static final Logger logger = Logger.getLogger(TurnoverResource.class);

	@Autowired
	private OlapRepository olapRepository;

	@Autowired
	private TurnoverStatisticService turnoverStatisticService;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/{workflow}/daterange/{dateRange}/source/{source}", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get Statistic by workflow, dateRange and source", notes = "")
	public List<Double> getTurnoverStatisticByDateRange(
			@ApiParam(required = true) @PathVariable @Valid final Workflow workflow,
			@ApiParam(required = true) @PathVariable @Valid final DateRange dateRange,
			@ApiParam(required = true) @PathVariable @Valid String source)
			throws NotFoundException, ClassNotFoundException, IOException {
		if (Strings.isNullOrEmpty(source))
			source = AbstractStatisticService.ALL_STATISTIC_KEY;

		Olap olap = olapRepository.findTopByDateRangeOrderByTimestampDesc(dateRange);
		if (olap != null && olap.getTurnover() != null) {
			logger.info("Information from OLAP.");
			Map<String, List<Double>> sourceMap = (Map<String, List<Double>>) ByteSearializer
					.deserialize(olap.getTurnover());
			if (!sourceMap.containsKey(source))
				return new ArrayList<Double>();
			return sourceMap.get(source);
		} else {
			logger.info("Information directly calculating.");
			Map<String, List<Double>> sourceMap = turnoverStatisticService.getStatisticByDateRange(workflow, dateRange,
					null);
			if (!sourceMap.containsKey(source))
				return new ArrayList<>();
			return sourceMap.get(source);
		}

	}
}
