package dash.usermanagement.password.forgot.rest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.TextNode;

import dash.usermanagement.password.forgot.business.PasswordForgotService;
import dash.usermanagement.password.forgot.domain.PasswordForgot;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Password Forgot Resource")
@RequestMapping(value = "/api/rest/password/forgot", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Password Forgot API")
public class PasswordForgotResource {

	private static final Logger logger = Logger.getLogger(PasswordForgotResource.class);
	private PasswordForgotService passwordForgotService;

	@Autowired
	public PasswordForgotResource(PasswordForgotService passwordForgotService) {
		this.passwordForgotService = passwordForgotService;
	}

	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "Post password forgot. ", notes = "")
	public ResponseEntity<?> save(@ApiParam(required = true) @RequestBody final TextNode email) {
		try {
			return new ResponseEntity<>(passwordForgotService.save(email.asText()), HttpStatus.CREATED);
		} catch (Exception ex) {
			logger.error(PasswordForgotResource.class.getSimpleName(), ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get password forgot. ", notes = "")
	public PasswordForgot getById(
			@ApiParam(required = true) @RequestParam(value = "ID", required = true) final String id) {
		return passwordForgotService.getById(id);
	}

}
