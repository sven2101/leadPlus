
package dash.usermanagement.principle;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import dash.exceptions.NotFoundException;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;

// @RestController
// @RequestMapping(value = { "/user", "/me" })
public class PrincipleResource {

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<User> getUser(Principal user) throws NotFoundException {

		if (user == null)
			new ResponseEntity<User>((User) null, HttpStatus.UNAUTHORIZED);

		User internalUser = userService.getUserByEmail(user.getName());

		return new ResponseEntity<User>(internalUser, HttpStatus.OK);
	}

}