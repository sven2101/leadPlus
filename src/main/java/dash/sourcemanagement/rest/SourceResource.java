
package dash.sourcemanagement.rest;

import java.util.List;

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

import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.security.jwt.domain.ApiJwtToken;
import dash.sourcemanagement.business.ISourceService;
import dash.sourcemanagement.domain.Source;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Source Resource")
@RequestMapping(value = "/api/rest/source", consumes = { MediaType.ALL_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Source API")
public class SourceResource {

	@Autowired
	private ISourceService sourceService;

	@ApiOperation(value = "Get all Sources.", notes = "")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Source> getAll() {
		return sourceService.getAll();
	}

	@ApiOperation(value = "Get a single source.", notes = "You have to provide a valid source ID.")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Source getById(@ApiParam(required = true) @PathVariable final Long id) throws NotFoundException {
		return sourceService.getById(id);
	}

	@ApiOperation(value = "Add a single source.", notes = "You have to provide a valid source Object")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Source save(@ApiParam(required = true) @RequestBody @Valid final Source source)
			throws SaveFailedException, ConsistencyFailedException {
		return sourceService.save(source);
	}

	@ApiOperation(value = "Update a single source.", notes = "")
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Source update(@ApiParam(required = true) @RequestBody @Valid final Source source)
			throws UpdateFailedException, ConsistencyFailedException {
		return sourceService.save(source);
	}

	@ApiOperation(value = "Delete a single source.", notes = "")
	@RequestMapping(method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable final Long id) throws DeleteFailedException {
		sourceService.delete(id);
	}

	@ApiOperation(value = "Generate Apitoken", notes = "You have to provide a valid source ID.")
	@RequestMapping(value = "/apitoken/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public ApiJwtToken generateApiTokenBySourceId(@ApiParam(required = true) @PathVariable final Long id)
			throws NotFoundException, ConsistencyFailedException {
		return sourceService.generateApiTokenBySourceId(id);
	}
}
