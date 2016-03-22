package dash.processmanagement.statistic.sale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.processmanagement.request.RequestRepository;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.statistic.result.Result;
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
    
    @RequestMapping(value="/day", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get daily Sale Statistic", notes = "")
    public Result getDailySaleStatistic() {
	return statisticsService.getDailyStatistic(saleRepository);
    }
    
    @RequestMapping(value="/week", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get weekly Sale Statistic", notes = "")
    public Result getWeeklySaleStatistic() {
	return statisticsService.getWeeklyStatistic(saleRepository);
    }
    
    @RequestMapping(value="/month", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get monthly Sale Statistic", notes = "")
    public Result getMonthlySaleStatistic() {
	return statisticsService.getMonthlyStatistic(saleRepository);
    }
    
    @RequestMapping(value="/year", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get yearly Sale Statistic", notes = "")
    public Result getYearlySaleStatistic() {
	return statisticsService.getYearlyStatistic(saleRepository);
    }
    
    @RequestMapping(value="/all", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get all Sale Statistic", notes = "")
    public Result getAllSaleStatistic() {
	return statisticsService.getAllStatistic(saleRepository);
    }	
}
