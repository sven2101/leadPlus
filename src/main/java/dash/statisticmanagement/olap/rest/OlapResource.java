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

package dash.statisticmanagement.olap.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.NotFoundException;
import dash.statisticmanagement.olap.business.OlapStatisticService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/rest/processes/statistics/generate")
@Api(value = "Statistic generate API")
public class OlapResource {

	@Autowired
	private OlapStatisticService olapStatisticService;

	@RequestMapping(method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Generate Statistics", notes = "")
	public void getAllStatisticsByDateRange() throws NotFoundException {
		olapStatisticService.generateOlapStatistics();
	}

}
