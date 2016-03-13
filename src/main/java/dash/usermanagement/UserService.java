package dash.usermanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by Andreas on 28.11.2015.
 */
@Service
@Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User details not found with this email: " + email);
        }

        String username = user.getUsername();
        String password = user.getPassword();
        Role role = user.getRole();
        
        List<GrantedAuthority> auth = getAuthorities(role);

        if (username.equals(Role.ADMIN)) {
            auth = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_ADMIN");
        }

        return new org.springframework.security.core.userdetails.User(username, passwordEncoder.encode(password), auth);
    }

    private List<GrantedAuthority> getAuthorities(Role role) {
        
    	List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
    	
    	if (role.equals("SUPERADMIN"))
    		authList.add(new SimpleGrantedAuthority("SUPERADMIN"));
    	
    	if (role.equals("ADMIN"))
    		authList.add(new SimpleGrantedAuthority("ADMIN"));
    	
    	if (role.equals("USER"))
    		authList.add(new SimpleGrantedAuthority("USER"));

        return authList;
    }

}
