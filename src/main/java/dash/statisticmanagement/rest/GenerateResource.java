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

package dash.statisticmanagement.rest;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.NotFoundException;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.OLAP;
import dash.statisticmanagement.product.business.ProductStatistic;
import dash.statisticmanagement.product.business.ProductStatisticService;
import dash.statisticmanagement.profit.business.ProfitStatisticService;
import dash.statisticmanagement.turnover.business.TurnoverStatisticService;
import dash.statisticmanagement.user.business.UserStatistic;
import dash.statisticmanagement.user.business.UserStatisticService;
import dash.statisticmanagement.workflow.business.WorkflowStatisticService;
import dash.workflowmanagement.domain.Workflow;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/rest/processes/statistics/generate")
@Api(value = "Statistic generate API")
public class GenerateResource {

	@Autowired
	private OlapRepository olapRepository;

	@Autowired
	private TurnoverStatisticService turnoverStatisticService;

	@Autowired
	private ProfitStatisticService profitStatisticService;

	@Autowired
	private WorkflowStatisticService workflowStatisticService;

	@Autowired
	private ProductStatisticService productStatisticService;

	@Autowired
	private UserStatisticService userStatisticService;

	@RequestMapping(method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Generate Statistics", notes = "")
	public void getConversionStatisticByDateRange() throws NotFoundException {
		saveStatisticInOLAP(DateRange.DAILY);
		saveStatisticInOLAP(DateRange.WEEKLY);
		saveStatisticInOLAP(DateRange.MONTHLY);
		saveStatisticInOLAP(DateRange.YEARLY);
		saveStatisticInOLAP(DateRange.ALL);
	}

	private void saveStatisticInOLAP(DateRange dateRange) throws NotFoundException {
		OLAP olap = new OLAP();
		olap.setDateRange(dateRange);
		olap.setTimeStamp(Calendar.getInstance());
		List<Double> profit = profitStatisticService.getStatisticByDateRange(Workflow.SALE, dateRange, null)
				.getResult();
		olap.setProfit(profit.toArray(new Double[profit.size()]));
		List<Double> turnover = turnoverStatisticService.getStatisticByDateRange(Workflow.SALE, dateRange, null)
				.getResult();
		olap.setTurnover(turnover.toArray(new Double[turnover.size()]));
		List<Double> leads = workflowStatisticService.getStatisticByDateRange(Workflow.LEAD, dateRange, null)
				.getResult();
		olap.setLeads(leads.toArray(new Double[leads.size()]));
		List<Double> offers = workflowStatisticService.getStatisticByDateRange(Workflow.OFFER, dateRange, null)
				.getResult();
		olap.setOffers(offers.toArray(new Double[offers.size()]));
		List<Double> sales = workflowStatisticService.getStatisticByDateRange(Workflow.SALE, dateRange, null)
				.getResult();
		olap.setSales(sales.toArray(new Double[sales.size()]));
		List<ProductStatistic> products = productStatisticService.getTopProductStatstic(Workflow.SALE, dateRange, null);
		olap.setProducts(products.toArray(new ProductStatistic[products.size()]));
		List<UserStatistic> users = userStatisticService.getTopSalesMen(dateRange);
		olap.setUsers(users.toArray(new UserStatistic[users.size()]));
		olapRepository.save(olap);
	}
}
