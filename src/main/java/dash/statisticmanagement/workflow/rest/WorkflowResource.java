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

package dash.statisticmanagement.workflow.rest;

import java.util.Arrays;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.NotFoundException;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.olap.business.OlapRepository;
import dash.statisticmanagement.olap.domain.Olap;
import dash.statisticmanagement.result.domain.Result;
import dash.statisticmanagement.workflow.business.WorkflowStatisticService;
import dash.workflowmanagement.domain.Workflow;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping(value = "/api/rest/processes/statistics/workflow", consumes = { MediaType.ALL_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Statistic Conversion API")
public class WorkflowResource {

	@Autowired
	private OlapRepository olapRepository;

	@Autowired
	private WorkflowStatisticService statisticsService;

	@RequestMapping(value = "/{workflow}/daterange/{dateRange}", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get Statistic by dateRange and workflow", notes = "")
	public Result getWorkflowStatisticByDateRange(
			@ApiParam(required = true) @PathVariable @Valid final Workflow workflow,
			@ApiParam(required = true) @PathVariable @Valid final DateRange dateRange) throws NotFoundException {
		Olap olap = olapRepository.findTopByDateRangeOrderByTimestampDesc(dateRange);
		if (olap != null) {
			System.out.println("Informationen aus OLAP");
			if (workflow.equals(Workflow.LEAD) && olap.getLeads() != null) {
				return new Result(Arrays.asList(olap.getLeads()));
			} else if (workflow.equals(Workflow.OFFER) && olap.getOffers() != null) {
				return new Result(Arrays.asList(olap.getOffers()));
			} else if (workflow.equals(Workflow.SALE) && olap.getSales() != null) {
				return new Result(Arrays.asList(olap.getSales()));
			} else {
				System.out.println("Informationen direkt berechnet");
				return statisticsService.getStatisticByDateRange(workflow, dateRange, null);
			}
		} else {
			System.out.println("Informationen direkt berechnet");
			return statisticsService.getStatisticByDateRange(workflow, dateRange, null);
		}
	}
}
