package dash.extern.apimanagement.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.APIIntegrationException;
import dash.extern.apimanagement.business.ApiRepository;
import dash.extern.apimanagement.business.IExternApiService;
import dash.extern.apimanagement.domain.Api;
import dash.extern.apimanagement.domain.ApiVendor;
import dash.processmanagement.domain.Process;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/rest/apis/extern/weclapp", produces = { MediaType.APPLICATION_JSON_VALUE })
public class WeclappApiResource {

	private IExternApiService weclappApiService;
	private ApiRepository apiRepository;

	@Autowired
	public WeclappApiResource(IExternApiService weclappApiService, ApiRepository apiRepository) {
		this.weclappApiService = weclappApiService;
		this.apiRepository = apiRepository;
	}

	@ApiOperation(value = "Test Connection to Weclapp API.")
	@RequestMapping(method = RequestMethod.POST, value = "/test")
	public ResponseEntity<String> testWeclappApi(@RequestBody @Valid final Api api) {
		try {
			this.weclappApiService.test(api);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (APIIntegrationException e) {
			return new ResponseEntity<>(e.getError().toJSONString(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Create Customer in Weclapp.")
	@RequestMapping(method = RequestMethod.POST, value = "/customer")
	public ResponseEntity<String> testWeclappApi(@RequestBody @Valid final Process process) {
		final List<Api> apis = this.apiRepository
				.findByIsDeactivatedFalseAndIsVerifiedTrueAndApiVendor(ApiVendor.WECLAPP);
		for (Api api : apis) {
			try {
				this.weclappApiService.createCustomer(api, process.getSale().getCustomer());
			} catch (Exception e) {
				return new ResponseEntity<>("Error connecting to API.", HttpStatus.BAD_REQUEST);
			}
		}
		return new ResponseEntity<>(HttpStatus.OK);

	}
}
