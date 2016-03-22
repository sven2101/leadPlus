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

import dash.exceptions.RoleNotFoundException;
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

    @RequestMapping(value="/{username}", 
	    	    method=RequestMethod.POST,
                    consumes = {MediaType.APPLICATION_JSON_VALUE},
                    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public User updateUser(@PathVariable String username, @RequestBody @Valid User updateUser) {
        User user = userRepository.findByUsername(username);
        
        if(Optional.fromNullable(user).isPresent()){
            
            user.setEmail(updateUser.getEmail());
            user.setLanguage(updateUser.getLanguage());
            
            userRepository.save(user);
            
            return user;
        } else {
            throw new UsernameNotFoundException("No User found.");
        }
    }
    
    @RequestMapping(value="/{username}/pw", method=RequestMethod.PUT )
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public User updatePw(@PathVariable String username, @RequestBody @Valid User updateUser) {
        final User user = userRepository.findByUsername(username);
        
        if(Optional.fromNullable(user).isPresent()){
            
            user.setEmail(updateUser.getEmail());
            user.setLanguage(updateUser.getLanguage());
            
            userRepository.save(user);
            
            return user;
        } else {
            throw new UsernameNotFoundException("No User found.");
        }
    }
    
    @RequestMapping(value="/{username}/activate", method=RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void activeUser(@PathVariable String username) throws UsernameNotFoundException {
        final User user = userRepository.findByUsername(username);
        if(Optional.fromNullable(user).isPresent()){
            user.setEnabled(true);
            userRepository.save(user);
        } else {
            throw new UsernameNotFoundException("User not found.");
        }        
    }
    
    @RequestMapping(value="/{username}/role", 
	    	    method=RequestMethod.POST,
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    public void setRoleForUser(@PathVariable String username, @RequestBody String role) throws Exception {
        final User user = userRepository.findByUsername(username);
        if(Optional.fromNullable(user).isPresent()){ 
            user.setRole(Role.getRole(role));
            userRepository.save(user);
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
