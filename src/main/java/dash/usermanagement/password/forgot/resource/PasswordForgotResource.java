package dash.usermanagement.password.forgot.resource;

import static dash.Constants.RESET_ID_NOT_FOUND;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.TextNode;

import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;
import dash.usermanagement.password.forgot.business.PasswordForgotService;
import dash.usermanagement.password.forgot.domain.PasswordForgot;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Password Forgot Resource")
@RequestMapping(value = "password/forgot/requests", consumes = { MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Password Forgot API")
public class PasswordForgotResource {

	private static final Logger logger = Logger.getLogger(PasswordForgotResource.class);
	private PasswordForgotService passwordForgotService;
	private UserService userService;

	@Autowired
	public PasswordForgotResource(PasswordForgotService passwordForgotService, UserService userService) {
		this.passwordForgotService = passwordForgotService;
		this.userService = userService;
	}

	@RequestMapping(value = "/{randomKey}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ApiOperation(value = "Get password forgot request. ", notes = "")
	public ResponseEntity<?> getById(@ApiParam(required = true) @PathVariable final String randomKey) {
		try {
			if (passwordForgotService.getByRandomKey(randomKey) != null)
				return new ResponseEntity<>(JSONObject.quote(""), HttpStatus.OK);
			else
				return new ResponseEntity<>(JSONObject.quote(""), HttpStatus.NOT_FOUND);
		} catch (Exception ex) {
			logger.error(PasswordForgotResource.class.getSimpleName(), ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "Save password forgot request. ", notes = "")
	public ResponseEntity<?> save(@ApiParam(required = true) @RequestBody final TextNode email) {
		try {
			return new ResponseEntity<>(passwordForgotService.save(email.asText()), HttpStatus.CREATED);
		} catch (Exception ex) {
			logger.error(PasswordForgotResource.class.getSimpleName(), ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@RequestMapping(value = "/reset", method = RequestMethod.POST)
	@ApiOperation(value = "Create a new Password for a password forgot request. ", notes = "")
	public ResponseEntity<?> getById(
			@ApiParam(required = true) @RequestParam(value = "ID", required = true) final String id,
			@RequestBody(required = true) final String payload) {
		JSONObject json = null;
		String email = null;
		String password = null;
		try {
			json = new JSONObject(payload);
			email = json.get("email").toString();
			password = json.get("password").toString();
		} catch (JSONException e1) {
			logger.error(PasswordForgotResource.class.getSimpleName(), e1);
			return new ResponseEntity<>(e1.getMessage(), HttpStatus.CONFLICT);
		}

		PasswordForgot passwordForgot = this.passwordForgotService.getByRandomKey(id);
		if (passwordForgot == null || !passwordForgot.getEmail().equals(email) || password == null)
			return new ResponseEntity<>(RESET_ID_NOT_FOUND, HttpStatus.CONFLICT);

		User user = this.userService.getUserByEmail(passwordForgot.getEmail());

		try {
			this.userService.resetPassword(user.getId(), password);
			this.passwordForgotService.delete(passwordForgot);
		} catch (Exception e) {
			logger.error(PasswordForgotResource.class.getSimpleName(), e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>("Your password was successfully reset. ", HttpStatus.OK);
	}

}
