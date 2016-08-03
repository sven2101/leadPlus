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

package dash.statisticmanagement.offer.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.NotFoundException;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.request.RequestRepository;
import dash.statisticmanagement.business.IStatisticService;
import dash.statisticmanagement.domain.DateRange;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/rest/processes/statistics/offers", consumes = { MediaType.ALL_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Statistic Conversion API")
public class StatisticOfferResource {

	@Autowired
	private IStatisticService statisticsService;

	@Autowired
	private RequestRepository<Offer, Long> offerRepository;

	@RequestMapping(value = "/day", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get daily Offer Statistic", notes = "")
	public List<Double> getDailyOfferStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(offerRepository, DateRange.DAILY);
	}

	@RequestMapping(value = "/week", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get weekly Offer Statistic", notes = "")
	public List<Double> getWeeklyOfferStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(offerRepository, DateRange.WEEKLY);
	}

	@RequestMapping(value = "/month", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get monthly Offer Statistic", notes = "")
	public List<Double> getMonthlyOfferStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(offerRepository, DateRange.MONTHLY);
	}

	@RequestMapping(value = "/year", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get yealry Offer Statistic", notes = "")
	public List<Double> getYearlyOfferStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(offerRepository, DateRange.YEARLY);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Offer Statistic", notes = "")
	public List<Double> getAllOfferStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(offerRepository, DateRange.ALL);
	}
}