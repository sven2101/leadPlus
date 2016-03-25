package dash.usermanagement.registration;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Registration {

    @NotNull
    @Size(min=2, max=30)
    private String username;
    
    @NotNull
    @Size(min=2, max=30)
    private String password;
    
    @NotNull
    @Size(min=2, max=50)
    private String email;
    
    public Registration(){
	
    }
    
    public Registration (String username, String password, String email){
	this.username = username;
	this.password = password;
	this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
}