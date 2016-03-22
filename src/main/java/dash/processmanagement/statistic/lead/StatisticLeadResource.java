package dash.processmanagement.statistic.lead;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.processmanagement.lead.Lead;
import dash.processmanagement.request.RequestRepository;
import dash.processmanagement.statistic.service.IStatisticService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/rest/processes/statistics/leads")
@Api(value = "Statistic Conversion API")
public class StatisticLeadResource {
	
    @Autowired
    private IStatisticService 			statisticsService;
    
    @Autowired
    private RequestRepository<Lead, Long> 	leadRepository;
    
    @RequestMapping(value="/day",
    	    	    method = RequestMethod.GET,
    	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
    	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get daily Lead Statistic", notes = "")
    public List<Integer> getDailyLeadStatistic() {
	return statisticsService.getDailyStatistic(leadRepository);
    }
    
    @RequestMapping(value="/week",
    	    method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE},
	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get weekly Lead Statistic", notes = "")
    public List<Integer> getWeeklyLeadStatistic() {
	return statisticsService.getWeeklyStatistic(leadRepository);
    }
    
    @RequestMapping(value="/month",
    	    method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE},
	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get monthly Lead Statistic", notes = "")
    public List<Integer> getMonthlyLeadStatistic() {
	return statisticsService.getMonthlyStatistic(leadRepository);
    }
    
    @RequestMapping(value="/year",
    	    method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE},
	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get yearly Lead Statistic", notes = "")
    public List<Integer> getYearlyLeadStatistic() {
	return statisticsService.getDailyStatistic(leadRepository);
    }
    
    @RequestMapping(value="/all",
    	    method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE},
	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get all Lead Statistic", notes = "")
    public List<Integer> getAllLeadStatistic() {
	return statisticsService.getAllStatistic(leadRepository);
    }
	
}
