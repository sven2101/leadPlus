package dash.usermanagement.principle;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value ={ "/user", "/me" })
public class PrincipleResource {

    	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Map<String, String>> getUser(Principal user) {
		
		Map<String, String> map = new LinkedHashMap();
		
		if(user == null)
			return new ResponseEntity<Map<String, String>>(map, HttpStatus.UNAUTHORIZED);
		
		for (GrantedAuthority authority : SecurityContextHolder.getContext().getAuthentication().getAuthorities()){
			map.put("role", authority.getAuthority());
		}
		
		map.put("username", user.getName());
		
		return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
	}		
	
}