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

package dash.statisticmanagement.lead.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.NotFoundException;
import dash.leadmanagement.domain.Lead;
import dash.processmanagement.request.RequestRepository;
import dash.statisticmanagement.business.IStatisticService;
import dash.statisticmanagement.domain.DateRange;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/rest/processes/statistics/leads", consumes = {
		 MediaType.ALL_VALUE  }, produces = { MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Statistic Conversion API")
public class StatisticLeadResource {

	@Autowired
	private IStatisticService statisticsService;

	@Autowired
	private RequestRepository<Lead, Long> leadRepository;

	@RequestMapping(value = "/day", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get daily Lead Statistic", notes = "")
	public List<Double> getDailyLeadStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(leadRepository, DateRange.DAILY);
	}

	@RequestMapping(value = "/week", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get weekly Lead Statistic", notes = "")
	public List<Double> getWeeklyLeadStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(leadRepository, DateRange.WEEKLY);
	}

	@RequestMapping(value = "/month", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get monthly Lead Statistic", notes = "")
	public List<Double> getMonthlyLeadStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(leadRepository, DateRange.MONTHLY);
	}

	@RequestMapping(value = "/year", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get yearly Lead Statistic", notes = "")
	public List<Double> getYearlyLeadStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(leadRepository, DateRange.YEARLY);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Lead Statistic", notes = "")
	public List<Double> getAllLeadStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(leadRepository, DateRange.ALL);
	}
}
