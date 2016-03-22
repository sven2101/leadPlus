package dash.processmanagement.statistic.profit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.processmanagement.statistic.profit.service.IProfitStatisticService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/rest/processes/statistics/profit")
@Api(value = "Statistic Profit API")
public class ProfitResource {
	
    @Autowired
    private IProfitStatisticService		profitStatisticService;

    @RequestMapping(value="/day",
	    	    method = RequestMethod.GET,
	            produces = {MediaType.APPLICATION_JSON_VALUE},
		    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Daily Lead Statistic", notes = "")
    public List<Double> getDailyProfitStatistic() {
	return profitStatisticService.getDailyProfitStatistic();
    }
    
    @RequestMapping(value="/week",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Weekly Profit Statistic", notes = "")
    public List<Double> getWeeklyProfitStatistic() {
	return profitStatisticService.getWeeklyProfitStatistic();
    }
    
    @RequestMapping(value="/month",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Monthly Profit Statistic", notes = "")
    public List<Double> getMonthlyProfitStatistic() {
	return profitStatisticService.getMonthlyProfitStatistic();
    }
    
    @RequestMapping(value="/year",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Yearly Profit Statistic", notes = "")
    public List<Double> getYearlyProfitStatistic() {
	return profitStatisticService.getYearlyProfitStatistic();
    }
	
    @RequestMapping(value="/all",
    	    method = RequestMethod.GET,
    	    produces = {MediaType.APPLICATION_JSON_VALUE},
    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Yearly Profit Statistic", notes = "")
    public List<Double> getAllProfitStatistic() {
	return profitStatisticService.getAllProfitStatistic();
    }
}

