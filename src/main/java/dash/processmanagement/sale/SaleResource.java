package dash.processmanagement.sale;

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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * Created by Andreas on 08.03.2016.
 */
@RestController
@RequestMapping("/api/rest/processes/sales")
@Api(value = "Sale API")
public class SaleResource {
    
    @Autowired
    private SaleRepository saleRepository;

    @ApiOperation(value = "Return a single sale.", notes = "")
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Sale getSaleById(@PathVariable Long id) {
        return saleRepository.findOne(id);
    }

    @ApiOperation(value = "Update a single sale.", notes = "")
    @RequestMapping(method=RequestMethod.PUT,
                    value="/{id}",
                    consumes = {MediaType.APPLICATION_JSON_VALUE},
                    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Sale update(@ApiParam(required=true) @PathVariable Long id, @ApiParam(required=true) @RequestBody @Valid Sale updateSale) {
        Sale sale = saleRepository.findOne(id);
               
        sale.setCustomer(updateSale.getCustomer());
        sale.setContainerAmount(updateSale.getContainerAmount());
        sale.setTransport(updateSale.getTransport());
        sale.setSaleReturn(updateSale.getSaleReturn());
        sale.setSaleProfit(updateSale.getSaleProfit());
        sale.setTimestamp(updateSale.getTimestamp());
        
        saleRepository.save(sale);
        
        return sale;
    }

    @ApiOperation(value = "Delete a single sale.", notes = "")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@ApiParam(required=true) @PathVariable Long id) {
        saleRepository.delete(id);
    }

}
