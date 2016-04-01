package dash.usermanagement.registration;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.notificationmanagement.INotificationService;
import dash.notificationmanagement.message.RegistrationMessage;
import dash.usermanagement.Role;
import dash.usermanagement.User;
import dash.usermanagement.UserRepository;
import dash.usermanagement.settings.language.Language;

@RestController
@RequestMapping("/api/rest/registrations")
public class RegistrationResource {

    @Autowired
    private INotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @RequestMapping(method = RequestMethod.POST,
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE},
	    	    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> add(@RequestBody @Valid Registration registration) {

        final User user = new User();
        
        user.setUsername(registration.getUsername());
        user.setEmail(registration.getEmail());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setRole(Role.USER);
        user.setEnabled(false);
        user.setLanguage(Language.DE);
        
        if(!Optional.ofNullable(userRepository.findByUsernameIgnoreCase(user.getUsername())).isPresent() &&
           !Optional.ofNullable(userRepository.findByEmailIgnoreCase(user.getEmail())).isPresent()) {
            userRepository.save(user);
            notificationService.sendNotification(new RegistrationMessage(user));
            return new ResponseEntity<Void>(HttpStatus.CREATED);
        }
        
        return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @RequestMapping(value="/unique/email", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Boolean> uniqueEmail(@RequestBody String email) {

	boolean found = false;
	if (Optional.ofNullable(userRepository.findByEmailIgnoreCase(email)).isPresent())
	    found = true;
	    
        return new ResponseEntity<Boolean>(found, HttpStatus.OK);
    }
    
    @RequestMapping(value="/unique/username", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Boolean> uniqueUsername(@RequestBody String username) {

	boolean found = false;
	if (Optional.ofNullable(userRepository.findByUsernameIgnoreCase(username)).isPresent())
	    found = true;
	    
        return new ResponseEntity<Boolean>(found, HttpStatus.OK);
    }
    
}
