package dash.usermanagement;

import javax.management.relation.RoleNotFoundException;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    USER("user"), 
    ADMIN("admin"),
    SUPERADMIN("superadmin");
    
    private String role;

    Role (String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return role;
    }
    
    public static Role getRole(String value) throws RoleNotFoundException {
	
	 switch(value){ 
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