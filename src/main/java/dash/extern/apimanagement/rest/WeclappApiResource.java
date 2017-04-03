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
import org.springframework.web.bind.annotation.RestController;

import dash.extern.apimanagement.business.IExternApiService;
import dash.extern.apimanagement.domain.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/rest/apis/extern/weclapp", produces = { MediaType.APPLICATION_JSON_VALUE })
public class WeclappApiResource {

	private static final Logger logger = Logger.getLogger(WeclappApiResource.class);

	private IExternApiService weclappApiService;

	@Autowired
	public WeclappApiResource(IExternApiService weclappApiService) {
		this.weclappApiService = weclappApiService;
	}

	@ApiOperation(value = "Test Connection to Weclapp API.")
	@RequestMapping(method = RequestMethod.POST, value = "/test")
	public ResponseEntity<Object> testWeclappApi(@RequestBody @Valid final Api api) {
		try {
			return new ResponseEntity<>(this.weclappApiService.test(api), HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(WeclappApiResource.class.getSimpleName() + e.getMessage(), e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
