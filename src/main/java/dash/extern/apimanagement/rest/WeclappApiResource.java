package dash.extern.apimanagement.rest;

import java.io.UnsupportedEncodingException;
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

import dash.common.FailedToDecryptCipherTextException;
import dash.exceptions.APIIntegrationException;
import dash.extern.apimanagement.business.ApiService;
import dash.extern.apimanagement.business.IExternApiService;
import dash.extern.apimanagement.domain.Api;
import dash.extern.apimanagement.domain.ApiVendor;
import dash.processmanagement.domain.Process;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/rest/apis/extern/weclapp", produces = { MediaType.APPLICATION_JSON_VALUE })
public class WeclappApiResource {

	private IExternApiService weclappApiService;
	private ApiService apiService;

	@Autowired
	public WeclappApiResource(IExternApiService weclappApiService, ApiService apiService) {
		this.weclappApiService = weclappApiService;
		this.apiService = apiService;
	}

	@ApiOperation(value = "Test Connection to Weclapp API.")
	@RequestMapping(method = RequestMethod.POST, value = "/test")
	public ResponseEntity<String> testWeclappApi(@RequestBody @Valid final Api api)
			throws UnsupportedEncodingException, FailedToDecryptCipherTextException {
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
		final List<Api> apis = this.apiService.getByApiVendor(ApiVendor.WECLAPP);
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
