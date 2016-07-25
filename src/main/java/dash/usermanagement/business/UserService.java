package dash.usermanagement.business;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dash.usermanagement.domain.User;

/**
 * Created by Andreas on 28.11.2015.
 */
@Service
@Transactional
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User User = userRepository.findByUsernameIgnoreCase(username);

		if (!Optional.ofNullable(User).isPresent() || !User.getEnabled())
			throw new UsernameNotFoundException("User details not found with this username: " + username);

		return new org.springframework.security.core.userdetails.User(User.getUsername(), User.getPassword(),
				AuthorityUtils.createAuthorityList(User.getRole().toString()));
	}
}
