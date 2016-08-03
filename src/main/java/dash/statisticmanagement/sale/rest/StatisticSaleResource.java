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

package dash.statisticmanagement.sale.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.NotFoundException;
import dash.processmanagement.request.RequestRepository;
import dash.salemanagement.domain.Sale;
import dash.statisticmanagement.business.IStatisticService;
import dash.statisticmanagement.domain.DateRange;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/rest/processes/statistics/sales", consumes = {
		 MediaType.ALL_VALUE  }, produces = { MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Statistic Conversion API")
public class StatisticSaleResource {

	@Autowired
	private IStatisticService statisticsService;

	@Autowired
	private RequestRepository<Sale, Long> saleRepository;

	@RequestMapping(value = "/day", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get daily Sale Statistic", notes = "")
	public List<Double> getDailySaleStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(saleRepository, DateRange.DAILY);
	}

	@RequestMapping(value = "/week", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get weekly Sale Statistic", notes = "")
	public List<Double> getWeeklySaleStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(saleRepository, DateRange.DAILY);
	}

	@RequestMapping(value = "/month", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get monthly Sale Statistic", notes = "")
	public List<Double> getMonthlySaleStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(saleRepository, DateRange.DAILY);
	}

	@RequestMapping(value = "/year", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get yearly Sale Statistic", notes = "")
	public List<Double> getYearlySaleStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(saleRepository, DateRange.DAILY);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Sale Statistic", notes = "")
	public List<Double> getAllSaleStatistic() throws NotFoundException {
		return statisticsService.getStatisticByDateRange(saleRepository, DateRange.DAILY);
	}
}
