package dash.processmanagement.statistic.sale;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.processmanagement.request.RequestRepository;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.statistic.service.IStatisticService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/rest/processes/statistics/sales")
@Api(value = "Statistic Conversion API")
public class StatisticSaleResource {
	
    @Autowired
    private IStatisticService 			statisticsService;
    
    @Autowired
    private RequestRepository<Sale, Long> 	saleRepository;
    
    @RequestMapping(value="/day",
    	    	    method = RequestMethod.GET,
    	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
    	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get daily Sale Statistic", notes = "")
    public List<Integer> getDailySaleStatistic() {
	return statisticsService.getDailyStatistic(saleRepository);
    }
    
    @RequestMapping(value="/week",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get weekly Sale Statistic", notes = "")
    public List<Integer> getWeeklySaleStatistic() {
	return statisticsService.getWeeklyStatistic(saleRepository);
    }
    
    @RequestMapping(value="/month",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get monthly Sale Statistic", notes = "")
    public List<Integer> getMonthlySaleStatistic() {
	return statisticsService.getMonthlyStatistic(saleRepository);
    }
    
    @RequestMapping(value="/year",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get yearly Sale Statistic", notes = "")
    public List<Integer> getYearlySaleStatistic() {
	return statisticsService.getYearlyStatistic(saleRepository);
    }
    
    @RequestMapping(value="/all",
	    	    method = RequestMethod.GET,
	    	    produces = {MediaType.APPLICATION_JSON_VALUE},
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get all Sale Statistic", notes = "")
    public List<Integer> getAllSaleStatistic() {
	return statisticsService.getAllStatistic(saleRepository);
    }	
}
