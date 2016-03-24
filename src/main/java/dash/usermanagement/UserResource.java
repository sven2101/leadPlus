package dash.usermanagement;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Optional;

import dash.usermanagement.settings.password.PasswordChange;
import io.swagger.annotations.ApiOperation;

/**
 * Created by Andreas on 09.10.2015.
 */
@RestController
@RequestMapping("/users")
public class UserResource {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<User> get() {
        return userRepository.findAll();
    }
    
    @RequestMapping(value="/{username}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public User findById(@PathVariable String username) {
        return userRepository.findByUsername(username);
    }

    @RequestMapping(value="/{username}/update", method=RequestMethod.PUT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public User updateUser(@PathVariable String username, @RequestBody @Valid User updateUser) {
        User User = userRepository.findByUsername(username);
        
        if(Optional.fromNullable(User).isPresent()){
            
            User.setEmail(updateUser.getEmail());
            User.setLanguage(updateUser.getLanguage());
            
            userRepository.save(User);
            
            return User;
        } else {
            throw new UsernameNotFoundException("No User found.");
        }
    }
    
    @RequestMapping(value="/{username}/pw", method=RequestMethod.PUT )
    @ResponseStatus(HttpStatus.OK)
    public void updatePassword(@PathVariable String username, @RequestBody PasswordChange passwordChange) throws Exception {
        final User User = userRepository.findByUsername(username);
        
        if(Optional.fromNullable(User).isPresent()){
            if(passwordEncoder.encode(passwordChange.getOldPassword()) == User.getPassword()){
                User.setPassword(passwordEncoder.encode(passwordChange.getOldPassword()));
                userRepository.save(User);
            } else {
                throw new Exception("Password does not match.");
            }
        } else {
            throw new UsernameNotFoundException("No User found.");
        }
    }
    
    @RequestMapping(value="/{username}/activate", method=RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void activeUser(@PathVariable String username) throws UsernameNotFoundException {
        final User User = userRepository.findByUsername(username);
        if(Optional.fromNullable(User).isPresent()){
            User.setEnabled(true);
            userRepository.save(User);
        } else {
            throw new UsernameNotFoundException("User not found.");
        }        
    }
    
    @RequestMapping(value="/{username}/role", 
	    	    method=RequestMethod.POST,
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    public void setRoleForUser(@PathVariable String username, @RequestBody String role) throws Exception {
        final User User = userRepository.findByUsername(username);
        if(Optional.fromNullable(User).isPresent()){
            User.setRole(Role.getRole(role));
            userRepository.save(User);
        } else {
            throw new UsernameNotFoundException("User not found.");
        }        
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete a single user.", notes = "You have to provide a valid user ID.")
    public void delete(@PathVariable Long id) {
        userRepository.delete(id);
    }
}
