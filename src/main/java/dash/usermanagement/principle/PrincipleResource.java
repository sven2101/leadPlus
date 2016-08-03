/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

package dash.usermanagement.principle;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.NotFoundException;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;

@RestController
@RequestMapping(value = { "/user", "/me" })
public class PrincipleResource {

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Map<String, String>> getUser(Principal user) throws NotFoundException {

		User internalUser = userService.getUserByName(user.getName());

		Map<String, String> map = new LinkedHashMap<String, String>();

		if (!Optional.ofNullable(user).isPresent())
			return new ResponseEntity<Map<String, String>>(map, HttpStatus.UNAUTHORIZED);

		for (GrantedAuthority authority : SecurityContextHolder.getContext().getAuthentication().getAuthorities()) {
			map.put("role", authority.getAuthority());
		}

		map.put("username", user.getName());
		map.put("id", String.valueOf(internalUser.getId()));

		return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
	}

}