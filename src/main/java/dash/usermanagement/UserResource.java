package dash.usermanagement;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.google.common.base.Optional;

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

    @RequestMapping(value="{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public User findById(@PathVariable Long id) {
        return userRepository.findOne(id);
    }

    @RequestMapping(value="{id}", 
	    	    method=RequestMethod.PUT,
                    consumes = {MediaType.APPLICATION_JSON_VALUE},
                    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public User update(@PathVariable Long id, @RequestBody User updateUser) {
        final User user = userRepository.findByUsername(updateUser.getUsername());
        
        if(Optional.fromNullable(user).isPresent()){
            
            user.setUsername(updateUser.getUsername());
            user.setEmail(updateUser.getEmail());
            user.setPassword(passwordEncoder.encode(updateUser.getPassword()));
            user.setProfilPictureURL(updateUser.getProfilPictureURL());
            user.setDefaultLanguage(updateUser.getDefaultLanguage());
            
            userRepository.save(user);
        }
        
        return user;
    }
    
    @RequestMapping(value="{id}/activate",
	    	    method=RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public User activeUser(@PathVariable Long id, String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(Optional.fromNullable(user).isPresent()){
            user.setEnabled(true);
            userRepository.save(user);
        } else {
            throw new UsernameNotFoundException("User not found.");
        }        
        
        return user;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete a single user.", notes = "You have to provide a valid user ID.")
    public void delete(@PathVariable Long id) {
        userRepository.delete(id);
    }
}
