package dash.processmanagement.sale.customer;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Optional;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api/rest/processes/sales/customers")
@Api(value = "Prospects API")
public class CustomerResource {

    @Autowired
    private CustomerRepository customerRepository;

    @RequestMapping(method = RequestMethod.GET,
                    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get all Customers", notes = "")
    public Iterable<Customer> get() {
            return customerRepository.findAll();
    }

    @RequestMapping(value="/{id}",
                    method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get a single customer.", notes = "You have to provide a valid customer ID.")
    public Customer findById(@ApiParam(required=true) @PathVariable Long id) {
            return customerRepository.findOne(id);
    }

    @RequestMapping(value="/{id}",
	    	    method=RequestMethod.PUT,                    
                    consumes = {MediaType.APPLICATION_JSON_VALUE},
                    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Update a single customer.", notes = "You have to provide a valid customer ID.")
    public Customer update(@ApiParam(required=true) @PathVariable Long id, @ApiParam(required=true) @RequestBody @Valid Customer updateCustomer) {
        Customer customer = customerRepository.findOne(id);
            if(Optional.fromNullable(customer).isPresent()) {
        	customer.setName(updateCustomer.getName());
        	customer.setPhone(updateCustomer.getPhone());
        	customer.setAddress(updateCustomer.getAddress());
            }  
        return customer;
    }

    @RequestMapping(value="/{id}",
                    method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete a single customer.", notes = "You have to provide a valid customer ID.")
    public void delete( @ApiParam(required=true) @PathVariable Long id) {
	customerRepository.delete(id);
    }
    
}