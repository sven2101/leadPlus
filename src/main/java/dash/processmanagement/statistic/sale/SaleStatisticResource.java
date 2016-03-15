package dash.processmanagement.statistic.sale;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController(value = "SaleStatisticResource")
@Api(value = "saleStatistic", description = "Sale Statistic API")
@RequestMapping(value="/api/rest/statistic")
public class SaleStatisticResource {
	
	@RequestMapping(value="/sale",
            method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE})
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Sale Statistic", notes = "")
	public Iterable<SaleStatistic> get() {
	    return null;
	}
	
}
