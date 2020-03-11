
package dash.usermanagement.domain;

public enum Role {
	API, USER, ADMIN, SUPERADMIN;

	public String authority() {
		return "ROLE_" + this.name();
	}
}