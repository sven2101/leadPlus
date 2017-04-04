package dash.extern.apimanagement.rest;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.extern.apimanagement.business.ApiRepository;
import dash.extern.apimanagement.domain.Api;
import dash.smtpmanagement.rest.SmtpResource;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/rest/apis/extern", produces = { MediaType.APPLICATION_JSON_VALUE })
@ResponseStatus(HttpStatus.CREATED)
public class ApiResource {

	private static final Logger logger = Logger.getLogger(ApiResource.class);

	private ApiRepository apiRepository;

	@Autowired
	public ApiResource(ApiRepository apiRepository) {
		this.apiRepository = apiRepository;
	}

	@ApiOperation(value = "Create and store details for an Api.")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Object> createApi(@RequestBody @Valid final Api api) {
		try {
			return new ResponseEntity<>(apiRepository.save(api), HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(ApiResource.class.getSimpleName() + e.getMessage(), e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Get details for an Api.")
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Api>> getAll() {
		try {
			return new ResponseEntity<>(this.apiRepository.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(SmtpResource.class.getSimpleName() + e.getMessage(), e);
			return new ResponseEntity<>(new ArrayList<Api>(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Get details for an Api.")
	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	public ResponseEntity<Object> getApiById(@RequestBody @PathVariable final Long id) {
		try {
			return new ResponseEntity<>(apiRepository.findOne(id), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(SmtpResource.class.getSimpleName() + e.getMessage(), e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Get details for an Api.")
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Object> deleteApiById(@RequestBody @PathVariable final Long id) {
		try {
			apiRepository.delete(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			logger.error(SmtpResource.class.getSimpleName() + e.getMessage(), e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

}
