package dash.security.business;

import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;

@Service
public interface ISecurityService {

	public String getAuthenticatedUser() throws NotFoundException;

}
