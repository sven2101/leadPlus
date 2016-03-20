package dash.processmanagement.statistic;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.processmanagement.lead.Lead;
import dash.processmanagement.offer.Offer;
import dash.processmanagement.request.RequestRepository;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.statistic.service.IStatisticService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api/rest/processes/statistics")
@Api(value = "Statistic Conversion API")
public class StatisticResource {
	
    @Autowired
    private IStatisticService 			statisticsService;
    
    @Autowired
    private RequestRepository<Lead, Long> 	leadRepository;
    
    @Autowired
    private RequestRepository<Offer, Long> 	offerRepository;
    
    @Autowired
    private RequestRepository<Sale, Long> 	saleRepository;
       
    @RequestMapping(value="/leads",
	    	    method = RequestMethod.POST,
	            produces = {MediaType.APPLICATION_JSON_VALUE},
		    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Lead Statistic", notes = "")
    public List<Integer> getLeadStatistic(@ApiParam(required=true) @RequestBody @Valid Statistic statistic) {
	return statisticsService.getStatistic(statistic, leadRepository);
    }
    
    @RequestMapping(value="/offers",
    	    method = RequestMethod.POST,
            produces = {MediaType.APPLICATION_JSON_VALUE},
	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Offer Statistic", notes = "")
    public List<Integer> getOfferStatistic(@ApiParam(required=true) @RequestBody @Valid Statistic statistic) {
	return statisticsService.getStatistic(statistic, offerRepository);
    }
    
    @RequestMapping(value="/sales",
    	    method = RequestMethod.POST,
            produces = {MediaType.APPLICATION_JSON_VALUE},
	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get Sale Statistic", notes = "")
    public List<Integer> getSaleStatistic(@ApiParam(required=true) @RequestBody @Valid Statistic statistic) {
	return statisticsService.getStatistic(statistic, saleRepository);
    }
	
}
