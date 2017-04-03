package dash.extern.apimanagement.rest;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.customermanagement.domain.Customer;
import dash.extern.apimanagement.business.IExternApiService;
import dash.salemanagement.domain.Sale;
import dash.smtpmanagement.rest.SmtpResource;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/rest/externs/weclapp", produces = { MediaType.APPLICATION_JSON_VALUE })
@ResponseStatus(HttpStatus.CREATED)
@Api(value = "weclapp")
public class WeclappApiResource {

	private static final Logger logger = Logger.getLogger(WeclappApiResource.class);

	private IExternApiService weclappApiService;

	@Autowired
	public WeclappApiResource(IExternApiService weclappApiService) {
		this.weclappApiService = weclappApiService;
	}

	@ApiOperation(value = "Create Customer in Weclapp.")
	@RequestMapping(method = RequestMethod.POST, value = "/customer")
	public ResponseEntity<Object> weclappCreateCustomer(@RequestBody @Valid final Customer customer) {
		try {
			return new ResponseEntity<>(weclappApiService.createCustomer(customer), HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(SmtpResource.class.getSimpleName() + e.getMessage(), e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Create SalesOrder in Weclapp.")
	@RequestMapping(method = RequestMethod.POST, value = "/salesOrder")
	public ResponseEntity<Object> weclappCreateSalesOrder(@RequestBody @Valid final Sale sale) {
		try {
			return new ResponseEntity<>(weclappApiService.createSalesOrder(sale), HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(SmtpResource.class.getSimpleName() + e.getMessage(), e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

}
