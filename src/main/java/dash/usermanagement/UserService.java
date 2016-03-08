package dash.usermanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by Andreas on 28.11.2015.
 */
@Component
@Service
@Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        //check if this user with this username exist, if not, throw an exception
        // and stop the login process
        if (user == null) {
            throw new UsernameNotFoundException("User details not found with this username: " + email);
        }

        String username = user.getUsername();
        String password = user.getPassword();

        List<GrantedAuthority> auth = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");
        if (username.equals("admin")) {
            auth = AuthorityUtils
                    .commaSeparatedStringToAuthorityList("ROLE_ADMIN");
        }
        //get the encoded password
        String encodedPassword = passwordEncoder.encode(password);

        return new org.springframework.security.core.userdetails.User(username, password, auth);
    }

    private List getAuthorities(String role) {
        List authList = new ArrayList();
        authList.add(new SimpleGrantedAuthority("ROLE_USER"));

        //you can also add different roles here
        //for example, the user is also an admin of the site, then you can add ROLE_ADMIN
        //so that he can view pages that are ROLE_ADMIN specific
        if (role != null && role.trim().length() > 0) {
            if (role.equals("admin")) {
                authList.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            }
        }

        return authList;
    }

}
