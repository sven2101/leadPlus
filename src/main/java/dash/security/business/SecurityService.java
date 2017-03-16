package dash.security.business;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;

@Service
public class SecurityService implements ISecurityService {

	@Override
	public String getAuthenticatedUser() throws NotFoundException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			return authentication.getName();
		}
		return null;
	}
}
