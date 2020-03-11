
package dash.offermanagement.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.offermanagement.business.IOfferService;
import dash.offermanagement.domain.Offer;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Offer Resource")
@RequestMapping(value = "/api/rest/offers", consumes = { MediaType.ALL_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Offers API")
public class OfferResource {

	@Autowired
	private IOfferService offerService;

	@ApiOperation(value = "Returns all offers.")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Offer> getAll() {
		return offerService.getAll();
	}

	@ApiOperation(value = "Return a single offer.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Offer getOfferById(@PathVariable final long id) throws NotFoundException {
		return offerService.getOfferById(id);
	}

	@ApiOperation(value = "Delete a single offer.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable final long id) throws DeleteFailedException {
		offerService.delete(id);
	}

	@ApiOperation(value = "Return customers offers.", notes = "")
	@RequestMapping(value = "/customer/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Offer> getByCustomer(@ApiParam(required = true) @PathVariable final long id) {
		return offerService.getByCustomer(id);
	}

}
