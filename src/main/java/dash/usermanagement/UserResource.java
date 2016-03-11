package dash.usermanagement;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import dash.notificationmanagement.INotificationService;
import dash.notificationmanagement.message.RegistrationMessage;

/**
 * Created by Andreas on 09.10.2015.
 */
@RestController
@RequestMapping("/users")
public class UserResource {

    @Autowired
    private INotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<User> get() {
        return userRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET,
                    value="{id}")
    @ResponseStatus(HttpStatus.OK)
    public User findById(@PathVariable Long id) {
        return userRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> add(@RequestBody User userDto) {

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(Role.ADMIN);

        if(userRepository.findByUsername(user.getUsername()) == null && userRepository.findByEmail(user.getEmail())  == null)
            userRepository.save(user);

        List<User> users = new ArrayList<User>();
        users.add(user);

        notificationService.sendNotification(new RegistrationMessage(user));

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @RequestMapping(method=RequestMethod.PUT,
            value="{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public User update(@PathVariable Long id, @RequestBody User updateUser) {
        User user = userRepository.findOne(id);
        user.setUsername(updateUser.getUsername());
        user.setEmail(updateUser.getEmail());
        return user;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete a single user.", notes = "You have to provide a valid user ID.")
    public void delete(@PathVariable Long id) {
        userRepository.delete(id);
    }
}
