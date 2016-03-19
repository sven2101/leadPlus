package dash.processmanagement.sale.customer;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/api/rest/processes/sales/customers")
@Api(value = "prospects", description = "Prospects API")
public class CustomerResource {

}
