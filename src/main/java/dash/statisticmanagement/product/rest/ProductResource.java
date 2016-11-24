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

import java.io.IOException;
import java.util.List;

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
import dash.exceptions.NotFoundException;
import dash.statisticmanagement.common.AbstractStatisticService;
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

	private static final Logger logger = Logger.getLogger(ProductResource.class);

	@Autowired
	private OlapRepository olapRepository;

	@Autowired
	private ProductStatisticService productStatisticService;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/{workflow}/daterange/{dateRange}/source/{source}", method = { RequestMethod.GET,
			RequestMethod.POST })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get Statistic by workflow, dateRange and source", notes = "")
	public List<ProductStatistic> getProductStatisticByDateRange(
			@ApiParam(required = true) @PathVariable @Valid final Workflow workflow,
			@ApiParam(required = true) @PathVariable @Valid final DateRange dateRange,
			@ApiParam(required = true) @PathVariable @Valid String source)
			throws NotFoundException, ClassNotFoundException, IOException {
		if (source == null || "".equals(source))
			source = AbstractStatisticService.ALL_STATISTIC_KEY;

		Olap olap = olapRepository.findTopByDateRangeOrderByTimestampDesc(dateRange);
		if (olap != null && olap.getProducts() != null) {
			logger.info("Infromation from OLAP.");
			return (List<ProductStatistic>) ByteSearializer.deserialize(olap.getProducts());
		} else {
			logger.info("Infromation directly calculating.");
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
