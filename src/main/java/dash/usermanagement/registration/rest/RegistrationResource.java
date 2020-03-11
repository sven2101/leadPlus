
package dash.usermanagement.registration.rest;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;
import dash.usermanagement.registration.domain.Registration;
import dash.usermanagement.registration.domain.Validation;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/registrations", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
public class RegistrationResource {

	private static final Logger logger = Logger.getLogger(RegistrationResource.class);

	private UserService userService;

	@Autowired
	public RegistrationResource(UserService userService) {
		this.userService = userService;
	}

	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "Post a User. ", notes = "")
	public ResponseEntity<Object> register(@RequestBody @Valid final Registration registration) {
		try {
			final User user = this.userService.register(registration);
			user.setPassword(null);
			return new ResponseEntity<>(user, HttpStatus.CREATED);
		} catch (Exception ex) {
			logger.error(RegistrationResource.class.getSimpleName(), ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@RequestMapping(value = "/unique/email", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public Validation emailAlreadyExists(@RequestBody final Registration registration) {
		return userService.emailAlreadyExists(registration.getEmail());
	}

}
