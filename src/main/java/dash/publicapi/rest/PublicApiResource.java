
package dash.publicapi.rest;

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

import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.leadmanagement.domain.Lead;
import dash.productmanagement.domain.Product;
import dash.publicapi.business.IPublicApiService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.Authorization;

@RestController(value = "Public Api")
@RequestMapping(value = "/api/rest/public", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })

@Api(value = "Public API")
public class PublicApiResource {

	@Autowired
	private IPublicApiService publicApiService;

	@ApiOperation(value = "Create a single lead. (Valid values for 'customer.title' are ['UNKNOWN', 'MR', 'MS'])", notes = "")
	@Authorization(value = "API")
	@RequestMapping(value = "/lead", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Lead save(@ApiParam(required = true) @RequestBody @Valid final Lead lead)
			throws SaveFailedException, NotFoundException, ConsistencyFailedException {
		return publicApiService.saveLead(lead);
	}

	@ApiOperation(value = "Get all active products.", notes = "")
	@Authorization(value = "API")
	@RequestMapping(value = "/products", consumes = { MediaType.ALL_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE }, method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Product> getAllProducts() {
		return publicApiService.findByDeactivated(false);
	}

}
