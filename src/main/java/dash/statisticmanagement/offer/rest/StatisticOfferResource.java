package dash.statisticmanagement.offer.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.offermanagement.domain.Offer;
import dash.processmanagement.request.RequestRepository;
import dash.statisticmanagement.business.IStatisticService;
import dash.statisticmanagement.result.domain.Result;
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
    
    @RequestMapping(value="/day", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get daily Offer Statistic", notes = "")
    public Result getDailyOfferStatistic() {
	return statisticsService.getDailyStatistic(offerRepository);
    }
    
    @RequestMapping(value="/week", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get weekly Offer Statistic", notes = "")
    public Result getWeeklyOfferStatistic() {
	return statisticsService.getWeeklyStatistic(offerRepository);
    }
    
    @RequestMapping(value="/month", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get monthly Offer Statistic", notes = "")
    public Result getMonthlyOfferStatistic() {
	return statisticsService.getMonthlyStatistic(offerRepository);
    }
    
    @RequestMapping(value="/year", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get yealry Offer Statistic", notes = "")
    public Result getYearlyOfferStatistic() {
	return statisticsService.getYearlyStatistic(offerRepository);
    }
    
    @RequestMapping(value="/all", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get all Offer Statistic", notes = "")
    public Result getAllOfferStatistic() {
	return statisticsService.getAllStatistic(offerRepository);
    }	
}