package dash.processmanagement.statistic.turnover;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.processmanagement.statistic.turnover.service.ITurnoverStatisticService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/rest/processes/statistics/turnover")
@Api(value = "Statistic Profit API")
public class TurnoverResource {
	
    @Autowired
    private ITurnoverStatisticService		turnoverStatisticService;
       
    @RequestMapping(value="/day",
	    	    method = RequestMethod.GET,
	            produces = {MediaType.APPLICATION_JSON_VALUE},
		    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Daily Turnover Statistic", notes = "")
    public List<Double> getDailyTurnoverStatistic() {
	return turnoverStatisticService.getDailyTurnoverStatistic();
    }
    
    @RequestMapping(value="/week",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Weekly Turnover Statistic", notes = "")
    public List<Double> getWeeklyTurnoverStatistic() {
	return turnoverStatisticService.getWeeklyTurnoverStatistic();
    }
    
    @RequestMapping(value="/month",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Monthly Turnover Statistic", notes = "")
    public List<Double> getMonthlyTurnoverStatistic() {
	return turnoverStatisticService.getMonthlyTurnoverStatistic();
    }
    
    @RequestMapping(value="/year",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Yearly Turnover Statistic", notes = "")
    public List<Double> getYearlyTurnoverStatistic() {
	return turnoverStatisticService.getYearlyTurnoverStatistic();
    }
    
    @RequestMapping(value="/all",
    	    method = RequestMethod.GET,
    	    produces = {MediaType.APPLICATION_JSON_VALUE},
    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get All Turnover Statistic", notes = "")
    public List<Double> getAllTurnoverStatistic() {
	return turnoverStatisticService.getAllTurnoverStatistic();
    }	
}

