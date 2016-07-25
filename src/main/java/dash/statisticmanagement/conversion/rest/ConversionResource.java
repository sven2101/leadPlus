package dash.statisticmanagement.conversion.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.statisticmanagement.conversion.business.IConversionStatisticService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/rest/processes/statistics/conversion")
@Api(value = "Statistic Profit API")
public class ConversionResource {
	
    @Autowired
    private IConversionStatisticService		conversionStatisticService;
       
    @RequestMapping(value="/day",
	    	    method = RequestMethod.GET,
	            produces = {MediaType.APPLICATION_JSON_VALUE},
		    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Daily Conversion Statistic", notes = "")
    public List<Double> getDailyConversionStatistic() {
	return conversionStatisticService.getDailyConversionStatistic();
    }
    
    @RequestMapping(value="/week",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Weekly Conversion Statistic", notes = "")
    public List<Double> getWeeklyConversionStatistic() {
	return conversionStatisticService.getWeeklyConversionStatistic();
    }
    
    @RequestMapping(value="/month",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Monthly Conversion Statistic", notes = "")
    public List<Double> getMonthlyConversionStatistic() {
	return conversionStatisticService.getMonthlyConversionStatistic();
    }
    
    @RequestMapping(value="/year",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Yearly Conversion Statistic", notes = "")
    public List<Double> getYearlyConversionStatistic() {
	return conversionStatisticService.getYearlyConversionStatistic();
    }
    
    @RequestMapping(value="/all",
    	    method = RequestMethod.GET,
    	    produces = {MediaType.APPLICATION_JSON_VALUE},
    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get All Conversion Statistic", notes = "")
    public List<Double> getAllConversionStatistic() {
	return conversionStatisticService.getAllConversionStatistic();
    }	
}

