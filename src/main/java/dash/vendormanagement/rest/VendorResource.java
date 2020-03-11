
package dash.vendormanagement.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.vendormanagement.business.IVendorService;
import dash.vendormanagement.domain.Vendor;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "vendors")
@RestController
@RequestMapping(value = "/api/rest/vendors", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
public class VendorResource {

	@Autowired
	private IVendorService vendorService;

	@ApiOperation(value = "Returns all vendors.")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Vendor> getAll() {
		return vendorService.getAll();
	}

	@ApiOperation(value = "Returns a specific vendor.")
	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Vendor getById(@ApiParam(required = true) @PathVariable Long id) throws NotFoundException {
		return vendorService.getById(id);
	}

	@ApiOperation(value = "Adds Vendor.")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Vendor save(@ApiParam(required = true) @RequestBody final Vendor vendor) throws SaveFailedException {
		return vendorService.save(vendor);
	}

	@ApiOperation(value = "Update Vendor.")
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Vendor update(@ApiParam(required = true) @RequestBody final Vendor vendor) throws UpdateFailedException {
		return vendorService.update(vendor);
	}

	@ApiOperation(value = "Delete a single vendor.", notes = "You have to provide a valid vendor ID.")
	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void deleteById(@ApiParam(required = true) @PathVariable Long id) throws DeleteFailedException {
		vendorService.delete(id);
	}
}
