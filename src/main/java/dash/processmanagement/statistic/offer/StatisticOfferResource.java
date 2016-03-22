package dash.processmanagement.statistic.offer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.processmanagement.offer.Offer;
import dash.processmanagement.request.RequestRepository;
import dash.processmanagement.statistic.service.IStatisticService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/rest/processes/statistics/offers")
@Api(value = "Statistic Conversion API")
public class StatisticOfferResource {
	
    @Autowired
    private IStatisticService 			statisticsService;
    
    @Autowired
    private RequestRepository<Offer, Long> 	offerRepository;
    
    @RequestMapping(value="/day",
    	    	    method = RequestMethod.GET,
    	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
    	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get daily Offer Statistic", notes = "")
    public List<Integer> getDailyOfferStatistic() {
	return statisticsService.getDailyStatistic(offerRepository);
    }
    
    @RequestMapping(value="/week",
        	    method = RequestMethod.GET,
        	    produces = {MediaType.APPLICATION_JSON_VALUE},
        	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get weekly Offer Statistic", notes = "")
    public List<Integer> getWeeklyOfferStatistic() {
	return statisticsService.getWeeklyStatistic(offerRepository);
    }
    
    @RequestMapping(value="/month",
    	    	    method = RequestMethod.GET,
    	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
    	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get monthly Offer Statistic", notes = "")
    public List<Integer> getMonthlyOfferStatistic() {
	return statisticsService.getMonthlyStatistic(offerRepository);
    }
    
    @RequestMapping(value="/year",
    	    	    method = RequestMethod.GET,
    	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
    	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get yealry Offer Statistic", notes = "")
    public List<Integer> getYearlyOfferStatistic() {
	return statisticsService.getDailyStatistic(offerRepository);
    }
    
    @RequestMapping(value="/all",
    	      	    method = RequestMethod.GET,
    	      	    produces = {MediaType.APPLICATION_JSON_VALUE},
    	      	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get all Offer Statistic", notes = "")
    public List<Integer> getAllOfferStatistic() {
	return statisticsService.getAllStatistic(offerRepository);
    }
	
}
