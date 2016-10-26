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

package dash.statisticmanagement.product.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.NotFoundException;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.olap.business.OlapRepository;
import dash.statisticmanagement.olap.domain.Olap;
import dash.statisticmanagement.product.business.ProductStatistic;
import dash.statisticmanagement.product.business.ProductStatisticService;
import dash.workflowmanagement.domain.Workflow;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api/rest/processes/statistics/product")
@Api(value = "Statistic Profit API")
public class ProductResource {

	@Autowired
	private OlapRepository olapRepository;

	@Autowired
	private ProductStatisticService productStatisticService;

	@RequestMapping(value = "/{workflow}/daterange/{dateRange}", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get Statistic by dateRange and workflow", notes = "")
	public List<ProductStatistic> getProductStatisticByDateRange(
			@ApiParam(required = true) @PathVariable @Valid final Workflow workflow,
			@ApiParam(required = true) @PathVariable @Valid final DateRange dateRange) throws NotFoundException {
		Olap olap = olapRepository.findTopByDateRangeOrderByTimestampDesc(dateRange);
		if (olap != null && olap.getProducts() != null) {
			System.out.println("Informationen aus OLAP");
			return Arrays.asList(olap.getProducts());
		} else {
			System.out.println("Informationen direkt berechnet");
			return productStatisticService.getTopProductStatstic(workflow, dateRange, null);
		}
	}

	@RequestMapping(value = "/{workflow}/daterange/{dateRange}/id/{id}", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get Statistic by dateRange and workflow", notes = "")
	public ProductStatistic getSingleProductStatistic(
			@ApiParam(required = true) @PathVariable @Valid final Workflow workflow,
			@ApiParam(required = true) @PathVariable @Valid final DateRange dateRange,
			@ApiParam(required = true) @PathVariable @Valid final Long id) throws NotFoundException {
		ProductStatistic productStatistic = null;
		List<ProductStatistic> productStatisticList = productStatisticService.getTopProductStatstic(workflow, dateRange,
				id);
		if (productStatisticList.size() > 0)
			productStatistic = productStatisticList.get(0);
		return productStatistic;
	}
}
