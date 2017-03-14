package dash.usermanagement.password.forgot.rest;

import static dash.Constants.RESET_ID_NOT_FOUND;

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

import dash.smtpmanagement.business.SmtpService;
import dash.smtpmanagement.domain.Smtp;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;
import dash.usermanagement.password.forgot.business.PasswordForgotService;
import dash.usermanagement.password.forgot.domain.PasswordForgot;
import dash.usermanagement.settings.password.PasswordChange;
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
	private UserService userService;
	private SmtpService smtpService;

	@Autowired
	public PasswordForgotResource(PasswordForgotService passwordForgotService, UserService userService,
			SmtpService smtpService) {
		this.passwordForgotService = passwordForgotService;
		this.userService = userService;
		this.smtpService = smtpService;
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

	@RequestMapping(value = "/reset", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get password forgot. ", notes = "")
	public ResponseEntity<?> getById(
			@ApiParam(required = true) @RequestParam(value = "ID", required = true) final String id,
			@RequestBody(required = true) final TextNode password) {
		PasswordForgot passwordForgot = this.passwordForgotService.getById(id);
		if (passwordForgot == null)
			return new ResponseEntity<>(RESET_ID_NOT_FOUND, HttpStatus.CONFLICT);

		User user = this.userService.getUserByEmail(passwordForgot.getEmail());
		PasswordChange passwordChange = new PasswordChange();
		passwordChange.setNewPassword(password.asText());
		passwordForgotService.getById(id);

		return new ResponseEntity<>("Success", HttpStatus.OK);
	}

	@RequestMapping(value = "/smtp/reset", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get password forgot. ", notes = "")
	public ResponseEntity<?> checkForSmtp(
			@ApiParam(required = true) @RequestParam(value = "ID", required = true) final String id) {
		final PasswordForgot passwordForgot;
		final Smtp smtp;
		boolean exists = false;
		passwordForgot = this.passwordForgotService.getById(id);

		if (passwordForgot == null)
			return new ResponseEntity<>(RESET_ID_NOT_FOUND, HttpStatus.CONFLICT);

		smtp = this.smtpService.findByUserUsername(passwordForgot.getEmail());

		if (smtp != null)
			exists = true;

		return new ResponseEntity<>(exists, HttpStatus.OK);
	}

}
