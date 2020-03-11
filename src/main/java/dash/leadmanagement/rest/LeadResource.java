
package dash.leadmanagement.rest;

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
import dash.leadmanagement.business.ILeadService;
import dash.leadmanagement.domain.Lead;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping(value = "/api/rest/leads", produces = { MediaType.APPLICATION_JSON_VALUE })
@ResponseStatus(HttpStatus.CREATED)
@Api(value = "leads")
public class LeadResource {

	@Autowired
	private ILeadService leadService;

	@ApiOperation(value = "Returns all leads.")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Lead> getAll() {
		return leadService.getAll();
	}

	@ApiOperation(value = "Return a single lead.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Lead getLeadById(@ApiParam(required = true) @PathVariable final Long id) throws NotFoundException {
		return leadService.getLeadById(id);
	}

	@ApiOperation(value = "Delete a single Lead.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable final Long id) throws DeleteFailedException {
		leadService.delete(id);
	}

	@ApiOperation(value = "Return customers leads.", notes = "")
	@RequestMapping(value = "/customer/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Lead> getByCustomer(@ApiParam(required = true) @PathVariable final Long id) {
		return leadService.getByCustomer(id);
	}
}
