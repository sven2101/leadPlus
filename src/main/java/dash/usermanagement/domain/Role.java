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

package dash.usermanagement.domain;

import javax.management.relation.RoleNotFoundException;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
	USER("user"), ADMIN("admin"), SUPERADMIN("superadmin");

	private String role;

	Role(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return role;
	}

	public static Role getRole(String value) throws RoleNotFoundException {

		switch (value) {
		case "user":
			return Role.USER;
		case "admin":
			return Role.ADMIN;
		case "superadmin":
			return Role.SUPERADMIN;
		default:
			throw new RoleNotFoundException("Role not found.");
		}
	}

	@JsonValue
	public String getRole() {
		return role;
	}
}